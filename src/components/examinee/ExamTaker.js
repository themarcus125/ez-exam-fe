import React, { useEffect, useState } from "react";
import loadable from "@loadable/component";
import { navigate } from "../../utils/common";
import Countdown from "react-countdown";
import useWebcamRecorder from "../../hooks/useWebcamRecorder";
import useScreenRecorder from "../../hooks/useScreenRecorder";
import { getAPIWithToken, postAPIWithToken } from "../../utils/api";
import { getUser } from "../../utils/auth";
import { ToastContainer, toast } from "react-toastify";
const token = getUser()?.tk ?? "";
const dateCountDown = Date.now();

const LoadableEditor = loadable(() => import("../../components/common/Editor"));

const ExamTakerPage = ({ roomId }) => {
  const [isPermissionApproved, setIsPermissionApproved] = useState(false);
  const { isPermissionApproved: webcamApproved, webcamRecorderObject } =
    useWebcamRecorder();
  const { isPermissionApproved: screenRecApproved, screenRecorderObject } =
    useScreenRecorder();
  const [objInfoRoom, setObjInfoRoom] = useState({});
  const [lstQuestion, setLstQuestion] = useState([]);
  const [lstAnswer, setLstAnswer] = useState([]);
  const [notes, setNotes] = useState("");
  const [isDisabled, setIsDisabled] = useState(true);
  let timeExam = 0;

  useEffect(() => {
    if (webcamApproved && screenRecApproved) {
      setIsPermissionApproved(true);
    }
  }, [webcamApproved, screenRecApproved]);

  useEffect(() => {
    if (isPermissionApproved) {
      if (roomId) {
        // Set data by requesting questionaire with current test id from server
        getQuestion();
      }
      if (!roomId) {
        navigate(`/examinee/exam-room`);
      }
    }
  }, [isPermissionApproved]);

  const getQuestion = async () => {
    if (token && roomId) {
      const tmp_objInfo = await getAPIWithToken(
        `/sinhvien/layBaiThi?idPhongThi=${roomId}`,
        token,
      );
      setObjInfoRoom(tmp_objInfo?.data);
      setLstQuestion(tmp_objInfo?.data?.dsCauhoi);
    }
  };

  const changeClassCSS = (idTag) => {
    const tagButton = document.getElementById(idTag);
    tagButton.classList.add("uk-button-primary");
  };

  const handleChangeAnswer = (e) => {
    if (e.target.checked) {
      const objAnswer = {
        maCauHoi: e.target.title,
        maDapAn: e.target.value,
        dapAnTL: null,
      };
      const indexAnswer = lstAnswer.findIndex(
        (el) => el.maCauHoi === objAnswer.maCauHoi,
      );
      if (indexAnswer !== -1) {
        lstAnswer[indexAnswer].maDapAn = objAnswer.maDapAn;
      } else {
        lstAnswer.push(objAnswer);
      }
      changeClassCSS("btn" + objAnswer.maCauHoi);
    }
  };

  const handleChangeNotes = (e) => {
    setNotes(e.target.value);
  };

  const onSendExam = async () => {
    if (token && roomId) {
      //stop webcam, screen
      webcamRecorderObject.stop();
      screenRecorderObject.stop();
      try {
        const res = await postAPIWithToken(
          "/sinhvien/nopbai",
          {
            maCTPhong: objInfoRoom.maCTPhong,
            ghiChu: notes,
            baiThi: lstAnswer,
          },
          token,
        );
        const { data } = await res.json();
        if ((res.status === 200) & (data !== undefined)) {
          toast.success("Nộp bài thành công !!!");
          navigate(`/examinee`);
        } else {
          toast.error("Nộp bài thất bại !!!");
        }
      } catch (err) {
        toast.error("Đã có lỗi xảy ra khi nộp bài !!!");
      }
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (confirm("Bạn chắc chắn nộp bài ?")) {
      if (parseInt(timeExam) <= parseInt(objInfoRoom.thoiGianLam / 2)) {
        onSendExam();
      } else {
        toast.warning("Chưa đến thời gian nộp bài !!!");
      }
    }
  };

  // Renderer callback with condition
  const renderer = ({ hours, minutes, seconds, completed }) => {
    if (completed) {
      onSendExam();
      setIsDisabled(true);
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

  const onTick = ({ hours, minutes, seconds, completed }) => {
    //check time
    timeExam = parseInt(hours * 60 + minutes);
    if (timeExam < parseInt(objInfoRoom.thoiGianLam / 2)) {
      setIsDisabled(false);
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
          <ToastContainer
            autoClose={3000}
            position={toast.POSITION.TOP_RIGHT}
          />
          <div
            className="uk-height-1-1 uk-card uk-card-default uk-card-body uk-width-3-4@m uk-scroll"
            style={{
              overflowY: "scroll",
              height: window.screen.height,
              behavior: "smooth",
              position: "relative",
            }}
          >
            <div className="uk-flex uk-flex-row">
              <h3 className="uk-card-title uk-width-1-1 uk-text-center uk-margin-medium-top">
                <b>BÀI THI SINH VIÊN</b>
              </h3>
            </div>
            {lstQuestion
              ? lstQuestion.map((element) => {
                  return (
                    <div key={element.id} id={element.id}>
                      <div>
                        <div className="uk-card-body uk-padding-remove-bottom">
                          <div className="uk-form-label uk-card-title">
                            <b>
                              {element.viTri}. {element.noiDung}
                            </b>
                          </div>
                          <div className="uk-form-controls uk-margin-small-top uk-margin-small-left">
                            {element.loaiCauHoi === 1 ? (
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
                                    {" " + item.noiDung}
                                  </label>
                                </div>
                              ))
                            ) : (
                              <div style={{ border: "1px solid black" }}>
                                <LoadableEditor
                                  id={element.id}
                                  onChangeTitle={(event, editor) => {
                                    const objAnswer = {
                                      maCauHoi: element.id,
                                      maDapAn: null,
                                      dapAnTL: editor.getData(),
                                    };
                                    const indexAnswer = lstAnswer.findIndex(
                                      (el) =>
                                        el.maCauHoi === objAnswer.maCauHoi,
                                    );
                                    if (indexAnswer !== -1) {
                                      lstAnswer[indexAnswer].dapAnTL =
                                        objAnswer.dapAnTL;
                                    } else {
                                      lstAnswer.push(objAnswer);
                                    }
                                    changeClassCSS("btn" + objAnswer.maCauHoi);
                                  }}
                                />
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })
              : ""}
            <p className="uk-card-title uk-width-1-1 uk-text-center uk-margin-medium-bottom">
              <button
                id="btnSendExam"
                className="uk-button uk-button-primary"
                onClick={onSubmit}
                disabled={isDisabled}
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
                    {objInfoRoom?.thoiGianLam ? (
                      <Countdown
                        date={
                          dateCountDown + parseInt(objInfoRoom.thoiGianLam) * 60000
                        }
                        intervalDelay={1000}
                        precision={3}
                        renderer={renderer}
                        onTick={onTick}
                      />
                    ) : (
                      ""
                    )}
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
                    <label className="uk-form-label">
                      {objInfoRoom?.tenNguoiDung}
                    </label>
                  </div>
                  <div className="">
                    <label className="uk-form-label uk-margin-small-right">
                      <b>Tên đề thi: </b>
                    </label>
                    <label className="uk-form-label">
                      {objInfoRoom?.tieuDe}
                    </label>
                  </div>
                  <div className="">
                    <label className="uk-form-label uk-margin-small-right">
                      <b>Môn học: </b>
                    </label>
                    <label className="uk-form-label">
                      {objInfoRoom?.tenChuyenDe}
                    </label>
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
                    <label className="uk-form-label">
                      {lstQuestion?.length} câu
                    </label>
                  </div>
                  <div className="">
                    <label className="uk-form-label uk-margin-small-right">
                      <b>Thời gian làm bài: </b>
                    </label>
                    <label className="uk-form-label">
                      {objInfoRoom?.thoiGianLam} phút
                    </label>
                  </div>
                  <div className="">
                    <label className="uk-form-label uk-margin-small-right">
                      <b>Ngày thi: </b>
                    </label>
                    <label className="uk-form-label">
                      {objInfoRoom?.ngayThi}
                    </label>
                  </div>
                  <div className="">
                    <label className="uk-form-label uk-margin-small-right">
                      <b>Thời gian bắt đầu thi: </b>
                    </label>
                    <label className="uk-form-label">
                      {objInfoRoom?.thoiGianBatDauThi}
                    </label>
                  </div>
                </div>
                <hr className="uk-divider-icon" />
                <div className="uk-margin-small">
                  <div className="uk-width-1-1 uk-flex uk-flex-row uk-flex-between">
                    {lstQuestion
                      ? lstQuestion.map((element) => {
                          return (
                            <div
                              key={element.id}
                              className="uk-width-1-5 uk-margin-small-bottom uk-scroll"
                            >
                              <a
                                id={"btn" + element.id}
                                style={{ width: 40, height: 28 }}
                                className="uk-flex uk-flex-center uk-button uk-button-default uk-button-small uk-scroll"
                                href={"#" + element.id}
                              >
                                {element.viTri}
                              </a>
                            </div>
                          );
                        })
                      : ""}
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
                      onChange={handleChangeNotes}
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
      {objInfoRoom ? renderExamTaker() : <span uk-spinner="ratio: 4.5"></span>}
    </div>
  );
};

export default ExamTakerPage;