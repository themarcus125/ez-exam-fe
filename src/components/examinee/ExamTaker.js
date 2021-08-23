import React, { useEffect, useState } from "react";
import { useLocation } from "@reach/router";
import queryString from "query-string";
import { navigate } from "../../utils/common";
import { EXAMINEE_ROLE } from "../../utils/roles";
import useWebcamRecorder from "../../hooks/useWebcamRecorder";
import useScreenRecorder from "../../hooks/useScreenRecorder";
import Countdown from "react-countdown";
import moment from "moment";
import { getAPIWithToken, postAPIWithToken } from "../../utils/api";
import { getToken, getUser } from "../../utils/auth";
import Config from "../../utils/config";
import { ToastContainer, toast } from "react-toastify";
import loadable from "@loadable/component";
// const LoadableEditor = loadable(() => import("../common/Editor"));

import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

const ExamTakerPage = ({ roomId }) => {
  // const [isPermissionApproved, setIsPermissionApproved] = useState(false);
  // const [data, setData] = useState(null);
  // const location = useLocation();
  const userLogin = getUser();
  const [objInfoRoom, setObjInfoRoom] = useState({});
  const [lstQuestion, setLstQuestion] = useState([]);
  const [lstAnswer, setLstAnswer] = useState([]);
  const [title, setTitle] = useState(null);


  // const { isPermissionApproved: webcamApproved, webcamRecorderObject } =
  //   useWebcamRecorder();
  // const { isPermissionApproved: screenRecApproved, screenRecorderObject } =
  //   useScreenRecorder();

  // useEffect(() => {
  //   if (webcamApproved && screenRecApproved) {
  //     setIsPermissionApproved(true);
  //   }
  // }, [webcamApproved, screenRecApproved]);

  // useEffect(() => {
  //   if (isPermissionApproved) {
  //     const queriedExamId = roomId; //queryString.parse(location.search)?.id;
  //     if (queriedExamId) {
  //       // Set data by requesting questionaire with current test id from server
  //       setData(mockData["examtest"]);
  //     }
  //     if (!queriedExamId) {
  //       navigate(`/examinee/exam-taker`);
  //     }
  //   }
  // }, [isPermissionApproved]);

  useEffect(() => {
    getQuestion();
  }, []);

  const getQuestion = async () => {
    const token = await getToken();
    const tmp_objInfo = await getAPIWithToken(
      `/sinhvien/layBaiThi?idPhongThi=${roomId}`,
      token,
    );
    setObjInfoRoom(tmp_objInfo?.data);
    setLstQuestion(tmp_objInfo?.data?.dsCauhoi);
  };

  const handleChangeAnswer = (e) => {
    if (e.target.checked) {
      let objAnswer = {
        maCauHoi: e.target.title,
        maDapAn: e.target.value,
        dapAnTL: null
      }
      let indexAnswer = lstAnswer.findIndex(el => el.maCauHoi === objAnswer.maCauHoi);
      if (indexAnswer !== -1) {
        lstAnswer[indexAnswer].maDapAn = objAnswer.maDapAn;
      } else {
        lstAnswer.push(objAnswer);
      }
    }
  };

  const handleChangeTitle = (event, editor) => {
    setTitle(editor.getData());
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const token = await getToken();
    if (roomId) {
      try {
        const res = await postAPIWithToken(
          "/sinhvien/nopbai",
          {
            maCTPhong: objInfoRoom.maCTPhong,
            ghiChu: "",
            baiThi: lstAnswer
          },
          token,
        );
        const { data } = await res.json();
        if ((res.status === 200) & (data !== undefined)) {
          toast.success("Nộp bài thành công !!!");
        } else {
          toast.error("Nộp bài thất bại !!!");
        }
      } catch (err) {
        toast.error("Đã có lỗi xảy ra khi nộp bài !!!");
      }
    }
  }

  // const onSubmit = () => {
  //   webcamRecorderObject.stop();
  //   screenRecorderObject.stop();
  //   navigate(`/examinee/exam-taker`);
  // };

  // Renderer callback with condition
  const renderer = ({ hours, minutes, seconds, completed }) => {
    if (completed) {
      // Render a completed state
      return "";
    } else {
      // Render a countdown
      return (
        <span className="countdown uk-width-1-2@m">
          {hours}:{minutes}:{seconds}
        </span>
      );
    }
  };

  const renderExamTaker = () => {
    return (
      <div
        className="uk-padding-small uk-height-1-1"
        style={{ overflowY: "auto" }}
      >
        <div
          className="uk-card uk-card-default uk-grid-collapse uk-margin-small uk-card-hover"
          uk-grid=""
        >
          <ToastContainer autoClose={3000} position={toast.POSITION.TOP_RIGHT} />
          <div className="uk-card uk-card-default uk-card-body uk-width-3-4@m">
            <div className="uk-flex uk-flex-row">
              <h3 className="uk-card-title uk-width-1-1 uk-text-center uk-margin-medium-top">
                <b>BÀI THI SINH VIÊN</b>
              </h3>
            </div>
            {lstQuestion ? lstQuestion.map((element) => {
              return (
                <div key={element.id}>
                  <div>
                    <div className="uk-card-body uk-padding-remove-bottom">
                      <div className="uk-form-label uk-card-title">
                        <b>
                          {element.viTri}. {element.noiDung}
                        </b>
                      </div>
                      <div className="uk-form-controls uk-margin-small-left">
                        {element.loaiCauHoi === 1 ?
                          element.dsDapAn.map((item, key) => (
                            <div key={item.id}>
                              <label>
                                <input
                                  className="uk-radio"
                                  type="radio"
                                  name={`radio${element.id}`}
                                  value={item.id}
                                  onChange={handleChangeAnswer}
                                  title={element.id}
                                />
                                {" "}{item.noiDung}
                              </label>
                            </div>
                          ))
                          :
                          <div style={{ border: "1px solid black" }}>
                            <CKEditor
                                editor={ClassicEditor}
                                data={title}
                                id={element.id}
                                onChange={handleChangeTitle}
                                config={{
                                  toolbar: [
                                    "heading",
                                    "|",
                                    "bold",
                                    "italic",
                                    "link",
                                    "bulletedList",
                                    "numberedList",
                                    "blockQuote",
                                  ],
                                }}
                                // disabled={readOnly}
                              />
                          </div>
                        }
                      </div>
                    </div>
                  </div>
                </div>
              );
            }): ""}
            <p className="uk-card-title uk-width-1-1 uk-text-center uk-margin-medium-bottom">
              <button
                className="uk-button uk-button-primary"
                onClick={onSubmit}
              >
                Nộp Bài
              </button>
            </p>
          </div>
          <div className="uk-card uk-card-default uk-card-body uk-width-1-4@m">
            <div className="uk-grid uk-padding-small">
              <div className="uk-width-1-1 uk-margin-bottom">
                <div className="uk-margin-medium">
                  <div className="examtaker_timer">
                    <span className="icon" uk-icon="clock"></span>
                    {objInfoRoom?.thoiGianLam ?
                      <Countdown
                        date={Date.now() + parseInt(objInfoRoom.thoiGianLam) * 60000}
                        intervalDelay={0}
                        precision={3}
                        renderer={renderer}
                      />
                      : ""
                    }
                  </div>
                  <div className="">
                    <label className="uk-form-label uk-margin-small-right">
                      <b>MSSV: </b>
                    </label>
                    <label className="uk-form-label">{objInfoRoom?.mssv}</label>
                  </div>
                  <div className="">
                    <label className="uk-form-label uk-margin-small-right">
                      <b>Họ tên: </b>
                    </label>
                    <label className="uk-form-label">{objInfoRoom?.tenNguoiDung}</label>
                  </div>
                  <div className="">
                    <label className="uk-form-label uk-margin-small-right">
                      <b>Tên đề thi: </b>
                    </label>
                    <label className="uk-form-label">{objInfoRoom?.tieuDe}</label>
                  </div>
                  <div className="">
                    <label className="uk-form-label uk-margin-small-right">
                      <b>Môn học: </b>
                    </label>
                    <label className="uk-form-label">{objInfoRoom?.tenChuyenDe}</label>
                  </div>
                  <div className="">
                    <label className="uk-form-label uk-margin-small-right">
                      <b>Mã đề thi: </b>
                    </label>
                    <label className="uk-form-label">{objInfoRoom?.maDe}</label>
                  </div>
                  <div className="">
                    <label className="uk-form-label uk-margin-small-right">
                      <b>Số câu hỏi: </b>
                    </label>
                    <label className="uk-form-label">{lstQuestion?.length} câu</label>
                  </div>
                  <div className="">
                    <label className="uk-form-label uk-margin-small-right">
                      <b>Thời gian làm bài: </b>
                    </label>
                    <label className="uk-form-label">{objInfoRoom?.thoiGianLam} phút</label>
                  </div>
                  <div className="">
                    <label className="uk-form-label uk-margin-small-right">
                      <b>Ngày thi: </b>
                    </label>
                    <label className="uk-form-label">{objInfoRoom?.ngayThi}</label>
                  </div>
                  <div className="">
                    <label className="uk-form-label uk-margin-small-right">
                      <b>Thời gian bắt đầu thi: </b>
                    </label>
                    <label className="uk-form-label">{objInfoRoom?.ngayThi}</label>
                  </div>
                </div>
                <hr className="uk-divider-icon" />
                <div className="uk-margin-medium">
                  <div className="uk-flex uk-flex-between uk-margin-small-bottom">
                    <a
                      className="uk-button uk-button-default uk-button-small"
                      href="#"
                    >
                      01
                    </a>
                    <a
                      className="uk-button uk-button-default uk-button-small"
                      href="#"
                    >
                      02
                    </a>
                    <a
                      className="uk-button uk-button-default uk-button-small"
                      href="#"
                    >
                      03
                    </a>
                    <a
                      className="uk-button uk-button-default uk-button-small"
                      href="#"
                    >
                      04
                    </a>
                    <a
                      className="uk-button uk-button-default uk-button-small"
                      href="#"
                    >
                      05
                    </a>
                  </div>
                  <div className="uk-flex uk-flex-between uk-margin-small-bottom">
                    <a
                      className="uk-button uk-button-default uk-button-small"
                      href="#"
                    >
                      06
                    </a>
                    <a
                      className="uk-button uk-button-default uk-button-small"
                      href="#"
                    >
                      07
                    </a>
                    <a
                      className="uk-button uk-button-default uk-button-small"
                      href="#"
                    >
                      08
                    </a>
                    <a
                      className="uk-button uk-button-default uk-button-small"
                      href="#"
                    >
                      09
                    </a>
                    <a
                      className="uk-button uk-button-default uk-button-small"
                      href="#"
                    >
                      10
                    </a>
                  </div>
                </div>
                <hr className="uk-divider-icon" />
                <div className="uk-margin-small">
                  <div className="uk-flex uk-flex-center">
                    <label className="uk-form-label uk-text-center">
                      <b>Ghi chú</b>
                    </label>
                  </div>
                  <div className="uk-margin">
                    <textarea
                      className="uk-textarea"
                      rows="4"
                      placeholder=""
                    ></textarea>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="uk-height-1-1 uk-background-muted">
      {objInfoRoom ? renderExamTaker() : <span>fail</span>}
      {/* {objInfoRoom ? renderExamTaker() : <span uk-spinner="ratio: 4.5"></span>} */}
    </div>
  );
};

export default ExamTakerPage;

const activeText = {
  color: "#FFF",
};
