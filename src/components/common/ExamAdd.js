import React, { useState, useEffect, useRef } from "react";
import {
  getAPIWithToken,
  postAPIWithToken,
  putAPIWithToken,
} from "../../utils/api";
import { getToken } from "../../utils/auth";
import { questionType } from "../../utils/constants";
import {
  ResponsiveButtonsWrapper,
  ResponsiveGradingQuestionsWrapper,
} from "../../utils/ui";
import EssayQuestionBlock from "./EssayQuestionBlock";
import LoadingOverlay from "./LoadingOverlay";
import MultipleChoiceQuestionBlock from "./MultipleChoiceQuestionBlock";
import QuestionSelectModal, { showSelectModal } from "./QuestionSelectModal";

const _questionTemplate = {
  noiDung: "",
  maCauHoi: -1,
  dsDapAn: [],
  loaiCauHoi: questionType.MULTIPLE_CHOICE,
  themMoi: false,
};

const ExamAdd = ({ examId }) => {
  const doKho = 1;
  const [monHocs, setMonhocs] = useState([]);

  const [tenDeThi, setTenDeThi] = useState("");
  const [maChuyenDe, setMaChuyenDe] = useState("");
  const [thoiGianLam, setThoiGianLam] = useState(0);
  const [moTaDeThi, setMoTaDeThi] = useState("");

  const [soLuongTracNghiem, setSoLuongTracNghiem] = useState(0);
  const [diemTracNghiem, setDiemTracNghiem] = useState(0);
  const [diemTungCauTracNghiem, setDiemTungCauTracNghiem] = useState(0);
  const [soLuongTuLuan, setSoLuongTuLuan] = useState(0);
  const [diemTuLuan, setDiemTuLuan] = useState(0);
  const [diemTungCauTuLuan, setDiemTungCauTuLuan] = useState(0);

  const [questionList, setQuestionList] = useState([]);
  const questionRefs = useRef([]);
  const hasError = useRef(false);

  const [taoBoDe, setTaoBoDe] = useState(false);
  const [soDe, setSoDe] = useState(1);

  const [token, settoken] = useState(null);
  const [loading, setloading] = useState(true);

  const onRemoveQuestion = (question) => {
    setQuestionList(
      questionList.filter((currentQuestion) => currentQuestion !== question),
    );
  };

  const onAddQuestion = () => {
    const id = questionList.length + 1;
    setQuestionList([
      ...questionList,
      { ..._questionTemplate, id, themMoi: true },
    ]);
  };

  const onQuestionTypeChange = (question, loaiCauHoi) => {
    setQuestionList(
      questionList.map((currentQuestion) => {
        if (currentQuestion === question) {
          return { ...currentQuestion, loaiCauHoi: +loaiCauHoi };
        }
        return currentQuestion;
      }),
    );
  };

  const getQuestionDataFromDOM = (e) => {
    e.preventDefault();
    hasError.current = false;
    const questionDataList = [];
    let refs = [];
    refs = questionRefs.current;
    refs.forEach((ref, index) => {
      if (ref !== null) {
        const data = ref.getData();
        if (data?.error) {
          hasError.current = true;
          alert(data.error);
          return null;
        }
        data
          ? questionDataList.push({ ...questionList[index], ...data })
          : questionDataList.push(questionList[index]);
      }
    });

    if (hasError.current) {
      return null;
    }
    return questionDataList;
  };

  const appendAdditionalPropsToQuestionList = (
    respondPostNewQuestions,
    questionDataList,
  ) => {
    if (respondPostNewQuestions) {
      const { dataTN = [], dataTL = [] } = respondPostNewQuestions;
      const updatedQuestionList = questionDataList.map((question) => {
        const { loaiCauHoi, themMoi, dsDapAn } = question;
        let targetQuestion = null;
        if (themMoi) {
          if (loaiCauHoi === questionType.MULTIPLE_CHOICE) {
            targetQuestion = dataTN.find(
              (ques) => ques.noiDung === question.noiDung,
            );
          }
          if (loaiCauHoi === questionType.ESSAY) {
            targetQuestion = dataTL.find(
              (ques) => ques.noiDung === question.noiDung,
            );
          }
        }
        if (targetQuestion) {
          return {
            ...question,
            maCauHoi: targetQuestion.id,
            dsDapAn:
              targetQuestion?.dsDapAn?.length > 0
                ? dsDapAn.map((dapAn, index) => ({
                    ...dapAn,
                    maDapAn: targetQuestion.dsDapAn[index].id,
                  }))
                : [],
          };
        }
        return question;
      });
      return updatedQuestionList;
    }
    return questionDataList;
  };

  const eliminateQuestionsProps = (questionDataList) => {
    return questionDataList.map((question) => {
      const { maCauHoi, loaiCauHoi, dsDapAn } = question;
      const updatedDsDapAn = dsDapAn.map((dapAn) => {
        const { maDapAn, loaiDapAn } = dapAn;
        return { maDapAn, loaiDapAn };
      });
      return { maCauHoi, loaiCauHoi, dsDapAn: updatedDsDapAn };
    });
  };

  const setMaValueFromIDValue = (targetQuestionList) => {
    return targetQuestionList?.map((question) => {
      const { id, dsDapAn } = question;
      if (id) {
        const updatedDsDapAn = dsDapAn?.map((dapAn) => {
          const { id } = dapAn;
          return id ? { ...dapAn, maDapAn: id } : dapAn;
        });
        return { ...question, maCauHoi: id, dsDapAn: updatedDsDapAn };
      }
      return question;
    });
  };

  const onAddQuestionByBatch = (questionBatch) => {
    if (questionBatch?.length > 0) {
      const filteredNewQuestionsFromBatch = questionBatch.filter(
        (q) => questionList.indexOf(q) < 0,
      );

      if (filteredNewQuestionsFromBatch.length > 0) {
        setQuestionList([
          ...questionList,
          ...setMaValueFromIDValue(filteredNewQuestionsFromBatch),
        ]);
        return alert("Đã thêm các câu hỏi được chọn vào đề thi");
      }
    }
    alert(
      "Không có câu hỏi nào được thêm vào đề thi. Vui lòng kiểm tra lại câu hỏi bạn chọn đã có trong đề thi hay chưa.",
    );
  };

  const onSaveQuestionsFromQuestionaire = (questionBatch) => {
    onAddQuestionByBatch(questionBatch);
  };

  useEffect(() => {
    if (questionList?.length > 0) {
      const questionCounter = questionList.reduce(
        (counter, question) => {
          return {
            multiple:
              counter.multiple +
              (question.loaiCauHoi === questionType.MULTIPLE_CHOICE ? 1 : 0),
            essay:
              counter.essay +
              (question.loaiCauHoi === questionType.ESSAY ? 1 : 0),
          };
        },
        { multiple: 0, essay: 0 },
      );
      setSoLuongTracNghiem(questionCounter.multiple);
      setSoLuongTuLuan(questionCounter.essay);
    }
  }, [questionList]);

  useEffect(() => {
    if (soLuongTracNghiem > 0 && diemTracNghiem > 0) {
      setDiemTungCauTracNghiem(diemTracNghiem / soLuongTracNghiem);
    }
  }, [soLuongTracNghiem, diemTracNghiem]);

  useEffect(() => {
    if (soLuongTuLuan > 0 && diemTuLuan > 0) {
      setDiemTungCauTuLuan(diemTuLuan / soLuongTuLuan);
    }
  }, [soLuongTuLuan, diemTuLuan]);

  // api related effects / functions
  const onPostNewQuestions = async (questionDataList) => {
    const result = {};
    setloading(true);
    if (questionDataList === null) {
      return result;
    }
    const multipleQuestionList = questionDataList.filter(
      (question) =>
        question.loaiCauHoi === questionType.MULTIPLE_CHOICE &&
        question.themMoi,
    );

    if (multipleQuestionList?.length > 0) {
      try {
        const responseThemCauTN = await postAPIWithToken(
          "/cauhoi/themDanhSachCauHoi",
          {
            maChuyenDe: maChuyenDe,
            loaiCauHoi: 1,
            doKho: doKho,
            dsCauHoi: multipleQuestionList,
          },
          token,
        );
        const responseContent = await responseThemCauTN.json();
        result.dataTN = responseContent.data;
      } catch (error) {
        alert("Đã có lỗi xảy ra trong quá trình thêm câu hỏi trắc nghiệm mới.");
      }
    }

    const essayQuestionList = questionDataList.filter(
      (question) =>
        question.loaiCauHoi === questionType.ESSAY && question.themMoi,
    );

    if (essayQuestionList?.length > 0) {
      try {
        const responseThemCauTL = await postAPIWithToken(
          "/cauhoi/themDanhSachCauHoi",
          {
            maChuyenDe: maChuyenDe,
            loaiCauHoi: 2,
            doKho: doKho,
            dsCauHoi: essayQuestionList,
          },
          token,
        );
        const dataTL = await responseThemCauTL.json();
        result.dataTL = dataTL.data;
      } catch (error) {
        alert("Đã có lỗi xảy ra trong quá trình thêm câu hỏi tự luận mới.");
      }
    }

    setloading(false);
    return result;
  };

  const validateForm = () => {
    if (tenDeThi === "") {
      alert("Tên đề thi không được để trống");
      return false;
    }
    if (maChuyenDe === "") {
      alert("Môn học không được để trống");
      return false;
    }
    if (thoiGianLam === "") {
      alert("Thời gian làm bài không được để trống");
      return false;
    }
    if (questionList?.length === 0) {
      alert("Đề thi phải có ít nhất một câu hỏi");
      return false;
    }
    if (soLuongTracNghiem !== 0 && diemTracNghiem === 0) {
      alert("Điểm trắc nghiệm không được để trống");
      return false;
    }
    if (soLuongTuLuan !== 0 && diemTuLuan === 0) {
      alert("Điểm tự luận không được để trống");
      return false;
    }
    return true;
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }
    const questionDataList = getQuestionDataFromDOM(e);
    const respondPostNewQuestions = await onPostNewQuestions(questionDataList);
    const updatedQuestionList = appendAdditionalPropsToQuestionList(
      respondPostNewQuestions,
      questionDataList,
    );
    const danhSachCauHoi = eliminateQuestionsProps(updatedQuestionList);
    if (examId) {
      const responseCapNhat = await putAPIWithToken(
        `/dethi/suaDeThi`,
        {
          id: examId,
          tenDeThi: tenDeThi,
          maChuyenDe: maChuyenDe,
          maDeThi: "Ma de thi",
          thoiGianLam: thoiGianLam,
          moTaDeThi: moTaDeThi,
          doKho: doKho,
          soLuongTracNghiem: soLuongTracNghiem,
          soLuongTuLuan: soLuongTuLuan,
          diemTracNghiem: diemTracNghiem,
          diemTuLuan: diemTuLuan,
          diemTungCauTracNghiem: diemTungCauTracNghiem,
          diemTungCauTuLuan: diemTungCauTuLuan,
          coTaoBoDe: taoBoDe,
          coDoiCauHoi: true,
          soDe: soDe,
          danhSachCauHoi: danhSachCauHoi,
        },
        token,
      );

      if (responseCapNhat?.status === 200) {
        alert("Cập nhật đề thi thành công.");
      } else {
        alert("Đã xảy ra lỗi. Cập nhật đề thi thất bại.");
      }
    } else {
      const responseTaoDeThi = await postAPIWithToken(
        "/dethi/themDeThi",
        {
          tenDeThi: tenDeThi,
          maChuyenDe: maChuyenDe,
          maDeThi: "Ma de thi",
          thoiGianLam: thoiGianLam,
          moTaDeThi: moTaDeThi,
          doKho: doKho,
          soLuongTracNghiem: soLuongTracNghiem,
          soLuongTuLuan: soLuongTuLuan,
          diemTracNghiem: diemTracNghiem,
          diemTuLuan: diemTuLuan,
          diemTungCauTracNghiem: diemTungCauTracNghiem,
          diemTungCauTuLuan: diemTungCauTuLuan,
          taoBoDe: taoBoDe,
          soDe: soDe,
          danhSachCauHoi: danhSachCauHoi,
        },
        token,
      );

      if (responseTaoDeThi?.status === 200) {
        alert("Tạo đề thi thành công.");
      } else {
        alert("Đã xảy ra lỗi. Tạo đề thi thất bại.");
      }
    }
  };

  useEffect(async () => {
    const token = await getToken();
    if (token) {
      settoken(token);
    }
  }, []);

  useEffect(async () => {
    if (token) {
      const lstMonHoc = await getAPIWithToken(
        "/chuyende/monhocnguoidung",
        token,
      );
      setMonhocs(lstMonHoc.data);
      if (examId) {
        const deThi = await getAPIWithToken(
          `/dethi/layChiTietDeThi?id=${examId}`,
          token,
        );
        const data = deThi.data;
        setTenDeThi(data.tieuDe);
        setThoiGianLam(data.thoiGianLam);
        setMoTaDeThi(data.moTaDeThi);
        setDiemTracNghiem(data.diemTracNghiem);
        setDiemTuLuan(data.diemTuLuan);
        setQuestionList(setMaValueFromIDValue(data.dsCauhoi || []));
        setMaChuyenDe(data.dsCauhoi?.[0]?.maChuyenDe || "");
      }
      setloading(false);
    }
  }, [token]);

  const renderQuestionaire = () => {
    return (
      <div id="cauhoi" className="uk-margin">
        <h4>Danh sách câu hỏi</h4>
        {questionList.map((question, index) => {
          const { loaiCauHoi, id, themMoi, noiDung, dsDapAn } = question;
          const renderQuestionIndividually = () => {
            switch (loaiCauHoi) {
              case questionType.MULTIPLE_CHOICE:
                return (
                  <MultipleChoiceQuestionBlock
                    ref={(element) => (questionRefs.current[index] = element)}
                    onRemove={() => onRemoveQuestion(question)}
                    publicButtonDisabled
                    readOnly={!themMoi}
                    defaultQuestionProp={noiDung}
                    defaultAnswerListProp={dsDapAn}
                  />
                );
              case questionType.ESSAY:
                return (
                  <EssayQuestionBlock
                    ref={(element) => (questionRefs.current[index] = element)}
                    onRemove={() => onRemoveQuestion(question)}
                    publicButtonDisabled
                    readOnly={!themMoi}
                  />
                );
              default:
                return null;
            }
          };
          return (
            <div key={id}>
              <div className="uk-margin">
                <label className="uk-form-label" htmlFor="form-horizontal-text">
                  Loại câu hỏi
                </label>
                <div className="uk-form-controls">
                  <select
                    className="uk-select"
                    value={loaiCauHoi}
                    onChange={(e) => {
                      onQuestionTypeChange(question, e.target.value);
                    }}
                    onBlur={() => {}}
                    disabled={!themMoi}
                  >
                    <option value={questionType.MULTIPLE_CHOICE}>
                      Trắc nghiệm
                    </option>
                    <option value={questionType.ESSAY}>Tự luận</option>
                  </select>
                </div>
              </div>
              {renderQuestionIndividually()}
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <>
      <div className="uk-padding uk-padding-remove-top uk-padding-remove-bottom uk-height-1-1">
        {/* label */}
        <p className="uk-text-large uk-text-center uk-text-bold uk-text-success text-uppercase">
          {examId ? "Cập nhật đề thi" : "Tạo đề thi"}
        </p>

        {/* content */}
        <div className="uk-form-horizontal">
          <fieldset className="uk-fieldset">
            {/* exam details */}
            <div className="uk-margin">
              <label className="uk-form-label" htmlFor="form-horizontal-text">
                Tên đề thi
              </label>
              <div className="uk-form-controls">
                <input
                  className="uk-input"
                  type="text"
                  value={tenDeThi}
                  onChange={(e) => {
                    setTenDeThi(e.target.value);
                  }}
                />
              </div>
            </div>
            <div className="uk-margin">
              <label className="uk-form-label" htmlFor="form-horizontal-text">
                Môn học
              </label>
              <div className="uk-form-controls">
                <select
                  className="uk-select"
                  value={maChuyenDe}
                  onChange={(e) => {
                    setMaChuyenDe(e.target.value);
                  }}
                  onBlur={() => {}}
                >
                  <option disabled></option>
                  {monHocs &&
                    monHocs.map((item, index) => (
                      <option value={item.id} key={index}>
                        {item.tenChuyenDe}
                      </option>
                    ))}
                </select>
              </div>
            </div>
            <div className="uk-margin">
              <label className="uk-form-label" htmlFor="form-horizontal-text">
                Thời gian làm bài
              </label>
              <div className="uk-form-controls">
                <input
                  className="uk-input uk-form-width-small uk-margin-right"
                  type="number"
                  value={thoiGianLam}
                  onChange={(e) => {
                    setThoiGianLam(e.target.value);
                  }}
                />
                <span>phút</span>
              </div>
            </div>
            <div className="uk-margin">
              <label className="uk-form-label" htmlFor="form-horizontal-text">
                Ghi chú
              </label>
              <textarea
                className="uk-textarea"
                rows="5"
                value={moTaDeThi}
                onChange={(e) => {
                  setMoTaDeThi(e.target.value);
                }}
              ></textarea>
            </div>

            {/* exam questionaire */}
            {renderQuestionaire()}
            <ResponsiveButtonsWrapper className="uk-flex-center">
              <div className="uk-padding">
                <button
                  className="uk-button full-width-small-screen"
                  style={{ backgroundColor: "#32d296", color: "#FFF" }}
                  onClick={() => {
                    onAddQuestion();
                  }}
                >
                  Thêm mới câu hỏi
                </button>
              </div>

              <div className="uk-padding">
                <button
                  className="uk-button full-width-small-screen"
                  style={{ backgroundColor: "#32d296", color: "#FFF" }}
                  onClick={() => showSelectModal()}
                >
                  Chọn câu hỏi có sẵn
                </button>
              </div>
            </ResponsiveButtonsWrapper>

            {/* exam grading */}
            <ResponsiveGradingQuestionsWrapper className="uk-flex-row uk-flex-between uk-margin-bottom">
              <div className="uk-width-1-3@s uk-flex">
                <span className="uk-width-3-4">Số câu hỏi trắc nghiệm</span>
                <span className="uk-width-1-4">{soLuongTracNghiem}</span>
              </div>

              <div className="uk-width-1-3@s uk-flex">
                <span className="uk-width-3-4">Nhập điểm</span>
                <div className="uk-width-1-4">
                  <input
                    id="diemtracnghiem"
                    className="uk-input uk-form-width-small"
                    type="number"
                    min="0"
                    disabled={!(soLuongTracNghiem != 0)}
                    value={diemTracNghiem}
                    onChange={(e) => {
                      setDiemTracNghiem(e.target.value);
                    }}
                  />
                </div>
              </div>

              <div className="uk-width-1-3@s uk-flex extended-margin-left">
                <span className="uk-width-3-4">Điểm từng câu</span>
                <span className="uk-display-inline-block ">
                  {diemTungCauTracNghiem}
                </span>
              </div>
            </ResponsiveGradingQuestionsWrapper>

            <ResponsiveGradingQuestionsWrapper className="uk-flex-row uk-flex-between uk-margin-bottom">
              <div className="uk-width-1-3@s uk-flex">
                <span className="uk-width-3-4">Số câu hỏi tự luận</span>
                <span className="uk-width-1-4">{soLuongTuLuan}</span>
              </div>

              <div className="uk-width-1-3@s uk-flex">
                <span className="uk-width-3-4">Nhập điểm</span>
                <div className="uk-width-1-4">
                  <input
                    id="diemtuluan"
                    className="uk-input uk-form-width-small"
                    type="number"
                    min="0"
                    disabled={!(soLuongTuLuan != 0)}
                    value={diemTuLuan}
                    onChange={(e) => {
                      setDiemTuLuan(e.target.value);
                    }}
                  />
                </div>
              </div>

              <div className="uk-width-1-3@s uk-flex extended-margin-left">
                <span className="uk-width-3-4">Điểm từng câu</span>
                <span className="uk-display-inline-block ">
                  {diemTungCauTuLuan}
                </span>
              </div>
            </ResponsiveGradingQuestionsWrapper>

            {/* exam list creation */}
            <div className="uk-margin uk-grid-small uk-child-width-auto uk-grid">
              <label>
                <input
                  className="uk-checkbox"
                  type="checkbox"
                  value={taoBoDe}
                  onChange={(e) => setTaoBoDe(e.target.checked)}
                />{" "}
                Có tạo bộ đề không?
              </label>
            </div>

            <div className="uk-margin">
              <label className="uk-form-label" htmlFor="form-horizontal-text">
                Số lượng
              </label>
              <div className="uk-form-controls">
                <input
                  className="uk-input uk-form-width-small"
                  type="number"
                  min="1"
                  disabled={!taoBoDe}
                  value={soDe}
                  onChange={(e) => {
                    setSoDe(e.target.value);
                  }}
                />
              </div>
            </div>

            {/* submit button */}
            <div className="uk-flex uk-flex-center">
              <div className="uk-card-body">
                <button
                  className="uk-button"
                  style={{ backgroundColor: "#32d296", color: "#FFF" }}
                  onClick={onSubmit}
                >
                  {examId ? "Cập nhật" : "Lưu"}
                </button>
              </div>
            </div>
          </fieldset>
        </div>
      </div>
      <LoadingOverlay isLoading={loading} />
      <QuestionSelectModal
        type={maChuyenDe || 1}
        level={doKho || 1}
        onSave={onSaveQuestionsFromQuestionaire}
      />
    </>
  );
};

export default ExamAdd;
