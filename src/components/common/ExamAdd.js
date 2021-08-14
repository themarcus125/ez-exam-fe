import React, { useState, useEffect, useRef } from "react";
import {
  getAPIWithToken,
  postAPIWithToken,
  putAPIWithToken,
} from "../../utils/api";
import { getToken } from "../../utils/auth";
import { questionType } from "../../utils/constants";
import EssayQuestionBlock from "./EssayQuestionBlock";
import LoadingOverlay from "./LoadingOverlay";
import MultipleChoiceQuestionBlock from "./MultipleChoiceQuestionBlock";
import QuestionSelectModal, { showSelectModal } from "./QuestionSelectModal";

const _questionTemplate = {
  noiDung: "",
  dsDapAn: [],
  type: questionType.MULTIPLE_CHOICE,
  themMoi: false,
};

const ExamAdd = ({ examId }) => {
  const [monHocs, setMonhocs] = useState([]);
  const [doKhos, setdoKhos] = useState([]);

  const [tenDeThi, setTenDeThi] = useState("");
  const [maChuyenDe, setMaChuyenDe] = useState("");
  const [doKho, setDoKho] = useState("");
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

  const onQuestionTypeChange = (question, type) => {
    setQuestionList(
      questionList.map((currentQuestion) => {
        if (currentQuestion === question) {
          return { ...currentQuestion, type: +type };
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
        if (data.error) {
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
        const { type, themMoi, dsDapAn } = question;
        let targetQuestion = null;
        if (themMoi) {
          if (type === questionType.MULTIPLE_CHOICE) {
            targetQuestion = dataTN.find(
              (ques) => ques.noiDung === question.noiDung,
            );
          }
          if (type === questionType.ESSAY) {
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
      const { maCauHoi, type, dsDapAn } = question;
      const updatedDsDapAn = dsDapAn.map((dapAn) => {
        const { maDapAn, loaiDapAn } = dapAn;
        return { maDapAn, loaiDapAn };
      });
      return { maCauHoi, loaiCauHoi: type, dsDapAn: updatedDsDapAn };
    });
  };

  const onAddQuestionByBatch = (questionBatch) => {
    setQuestionList([...questionList, ...questionBatch]);
  };

  useEffect(() => {
    const questionCounter = questionList.reduce(
      (counter, question) => {
        return {
          multiple:
            counter.multiple +
            (question.type === questionType.MULTIPLE_CHOICE ? 1 : 0),
          essay: counter.essay + (question.type === questionType.ESSAY ? 1 : 0),
        };
      },
      { multiple: 0, essay: 0 },
    );
    setSoLuongTracNghiem(questionCounter.multiple);
    setSoLuongTuLuan(questionCounter.essay);
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
        question.type === questionType.MULTIPLE_CHOICE && question.themMoi,
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
      (question) => question.type === questionType.ESSAY && question.themMoi,
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

  const onSubmit = async (e) => {
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
      const lstDoKho = await getAPIWithToken("/dokho/layTatCaDoKho", token);
      setdoKhos(lstDoKho.data);
      setloading(false);
    }
  }, [token]);

  const renderQuestionaire = () => {
    return (
      <div id="cauhoi" className="uk-margin">
        <h4>Danh sách câu hỏi</h4>
        {questionList.map((question, index) => {
          const { type, id } = question;
          const renderQuestionIndividually = () => {
            switch (type) {
              case questionType.MULTIPLE_CHOICE:
                return (
                  <MultipleChoiceQuestionBlock
                    ref={(element) => (questionRefs.current[index] = element)}
                    onRemove={() => onRemoveQuestion(question)}
                    publicButtonDisabled
                  />
                );
              case questionType.ESSAY:
                return (
                  <EssayQuestionBlock
                    ref={(element) => (questionRefs.current[index] = element)}
                    onRemove={() => onRemoveQuestion(question)}
                    publicButtonDisabled
                  />
                );
              default:
                return null;
            }
          };
          return (
            <div key={id}>
              <p>Câu hỏi {id}</p>
              <div className="uk-margin">
                <label className="uk-form-label" htmlFor="form-horizontal-text">
                  Loại câu hỏi
                </label>
                <div className="uk-form-controls">
                  <select
                    className="uk-select"
                    value={type}
                    onChange={(e) => {
                      onQuestionTypeChange(question, e.target.value);
                    }}
                    onBlur={() => {}}
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
        <p className="uk-text-large uk-text-center uk-text-bold uk-text-success">
          {examId ? "Cập nhật đề thi" : "Tạo đề thi"}
        </p>

        {/* content */}
        <form className="uk-form-horizontal">
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
                Mức độ
              </label>
              <div className="uk-form-controls">
                <select
                  className="uk-select"
                  value={doKho}
                  onChange={(e) => {
                    setDoKho(e.target.value);
                  }}
                  onBlur={() => {}}
                >
                  <option disabled></option>
                  {doKhos.map((item, index) => (
                    <option value={item.id} key={index}>
                      {item.ten}
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
                  min="1"
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
                placeholder="Textarea"
                value={moTaDeThi}
                onChange={(e) => {
                  setMoTaDeThi(e.target.value);
                }}
              ></textarea>
            </div>

            {/* exam questionaire */}
            {renderQuestionaire()}
            <div className="uk-flex uk-flex-center">
              <div className="uk-card-body">
                <button
                  className="uk-button"
                  style={{ backgroundColor: "#32d296", color: "#FFF" }}
                  onClick={() => {
                    onAddQuestion();
                  }}
                >
                  Thêm mới câu hỏi
                </button>
              </div>

              <div className="uk-card-body uk-margin-left">
                <button
                  className="uk-button"
                  style={{ backgroundColor: "#32d296", color: "#FFF" }}
                  onClick={() => showSelectModal()}
                >
                  Chọn câu hỏi có sẵn
                </button>
              </div>
            </div>

            {/* exam grading */}
            <div className="uk-flex uk-flex-row uk-flex-between uk-margin-bottom">
              <div className="uk-width-1-4@s uk-display-inline-block">
                <span className="uk-display-inline-block uk-width-3-5">
                  Số câu hỏi trắc nghiệm
                </span>
                <div
                  className="uk-display-inline-block uk-width-1-5"
                  style={{ marginLeft: "10px" }}
                >
                  <span className="uk-display-inline-block uk-width-1-5">
                    {soLuongTracNghiem}
                  </span>
                </div>
              </div>

              <div className="uk-width-1-4@s uk-display-inline-block">
                <span className="uk-display-inline-block uk-width-2-5">
                  Nhập điểm
                </span>
                <div className="uk-display-inline-block uk-width-2-5">
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

              <div className="uk-width-1-4@s uk-display-inline-block">
                <span className="uk-display-inline-block uk-width-3-5">
                  Điểm từng câu
                </span>
                <div
                  className="uk-display-inline-block uk-width-1-5"
                  style={{ marginLeft: "-50px" }}
                >
                  <span className="uk-display-inline-block ">
                    {diemTungCauTracNghiem}
                  </span>
                </div>
              </div>
            </div>

            <div className="uk-flex uk-flex-row uk-flex-between uk-margin-bottom">
              <div className="uk-width-1-4@s uk-display-inline-block">
                <span className="uk-display-inline-block uk-width-3-5">
                  Số câu hỏi tự luận
                </span>
                <div
                  className="uk-display-inline-block uk-width-1-5"
                  style={{ marginLeft: "10px" }}
                >
                  <span className="uk-display-inline-block uk-width-1-5">
                    {soLuongTuLuan}
                  </span>
                </div>
              </div>

              <div className="uk-width-1-4@s uk-display-inline-block">
                <span className="uk-display-inline-block uk-width-2-5">
                  Nhập điểm
                </span>
                <div className="uk-display-inline-block uk-width-2-5">
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

              <div className="uk-width-1-4@s uk-display-inline-block">
                <span className="uk-display-inline-block uk-width-3-5">
                  Điểm từng câu
                </span>
                <div
                  className="uk-display-inline-block uk-width-1-5"
                  style={{ marginLeft: "-50px" }}
                >
                  <span className="uk-display-inline-block ">
                    {diemTungCauTuLuan}
                  </span>
                </div>
              </div>
            </div>

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
        </form>
      </div>
      <LoadingOverlay isLoading={loading} />
      <QuestionSelectModal type={maChuyenDe || 1} level={doKho || 1} />
    </>
  );
};

export default ExamAdd;
