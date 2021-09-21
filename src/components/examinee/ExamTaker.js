import React, { useEffect, useRef, useState } from "react";
import loadable from "@loadable/component";
import { navigate } from "../../utils/common";
import moment from "moment";
import Countdown from "react-countdown";
import useWebcamRecorder from "../../hooks/useWebcamRecorder";
import useScreenRecorder from "../../hooks/useScreenRecorder";
import {
  getAPIWithToken,
  postAPIWithToken,
  uploadVideoFile,
} from "../../utils/api";
import { getUser, getToken } from "../../utils/auth";
import { ToastContainer, toast } from "react-toastify";
const dateCountDown = Date.now();
const LoadableEditor = loadable(() => import("../../components/common/Editor"));

// Data
// import mockData from "../../mockData/examtest.json";

const ExamTakerPage = ({ roomId }) => {
  const countdownRef = useRef(null);
  const [loading, setLoading] = useState(true);
  const [isPermissionApproved, setIsPermissionApproved] = useState(false);
  const [objInfoRoom, setObjInfoRoom] = useState({});
  const [lstQuestion, setLstQuestion] = useState([]);
  const [lstAnswer, setLstAnswer] = useState([]);
  const [notes, setNotes] = useState("");
  const [isDisabled, setIsDisabled] = useState(true);
  const [isDisabledStartExam, setIsDisabledStartExam] = useState(true);
  const [flag, setFlag] = useState(false);
  const [roomName, setRoomName] = useState("");
  const [ngayThi, setNgayThi] = useState("");
  const [gioThi, setGioThi] = useState("");
  const [webcamBlob, setWebcamBlob] = useState(null);
  const [screenRecBlob, setScreenRecBlob] = useState(null);
  const onGetStreamingBlobWebcam = (blob) => {
    setWebcamBlob(blob);
  };
  const onGetStreamingBlobScreenRec = (blob) => {
    setScreenRecBlob(blob);
  };
  const { isPermissionApproved: webcamApproved, webcamRecorderObject } =
    useWebcamRecorder(onGetStreamingBlobWebcam);
  const { isPermissionApproved: screenRecApproved, screenRecorderObject } =
    useScreenRecorder(onGetStreamingBlobScreenRec);
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
        setIsDisabledStartExam(false);
      }
      if (!roomId) {
        navigate(`/examinee/exam-room`);
      }
    } else {
      getExamRoom();
    }
  }, [isPermissionApproved]);

  const getQuestion = async () => {
    const token = await getToken();
    if (token && roomId) {
      const tmp_objInfo = await getAPIWithToken(
        `/sinhvien/layBaiThi?idPhongThi=${roomId}`,
        token,
      );
      setObjInfoRoom(tmp_objInfo?.data);
      setLstQuestion(tmp_objInfo?.data?.dsCauhoi);
    }
    // setObjInfoRoom(mockData["data"]);
    // setLstQuestion(mockData["data"].dsCauhoi);
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
    const token = await getToken();
    if (token && roomId) {
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

  useEffect(async () => {
    const token = await getToken();
    if (webcamBlob && screenRecBlob) {
      toast.info("Đang nộp bài...");
      if (countdownRef.current) {
        countdownRef.current.pause();
      }
      const maCTPhong = objInfoRoom.maCTPhong;
      await uploadVideoFile(
        webcamBlob,
        `${maCTPhong}_webcam-rec.webm`,
        maCTPhong,
        0,
        token,
      );
      await uploadVideoFile(
        screenRecBlob,
        `${maCTPhong}_screen-rec.webm`,
        maCTPhong,
        1,
        token,
      );
      await onSendExam();
    }
  }, [webcamBlob, screenRecBlob]);

  const onSubmit = async (e) => {
    e.preventDefault();
    if (confirm("Bạn chắc chắn nộp bài ?")) {
      if (parseInt(timeExam) <= parseInt(objInfoRoom.thoiGianLam / 2)) {
        // stop webcam, screen rec
        webcamRecorderObject.stop();
        screenRecorderObject.stop();
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
          {hours < 10 ? "0" + hours : hours}:
          {minutes < 10 ? "0" + minutes : minutes}:
          {seconds < 10 ? "0" + seconds : seconds}
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

  //check permit
  const getExamRoom = async () => {
    setLoading(true);
    const token = await getToken();
    if (token) {
      const tmp_lstExamRoom = await getAPIWithToken(
        `/phongthi?id=${roomId}`,
        token,
      );
      const objExamRoom = tmp_lstExamRoom?.data[0] ?? {};
      if (objExamRoom) {
        setRoomName(objExamRoom.maPhong);
        setNgayThi(objExamRoom.ngayThi);
        setGioThi(objExamRoom.thoiGianBatDauThi);
      }
    }
    setLoading(false);
  };
  const onClickStartExam = async () => {
    const token = await getToken();
    const timeSystem = await getAPIWithToken("/hethong/thoigian", token);
    if (Date.parse(new Date(timeSystem?.data?.ngayGio)) >=
      Date.parse(
        moment(moment(ngayThi).format("DD/MM/YYYY") + " " +
          gioThi, "DD/MM/YYYY hh:mm"),
      )) {
      setFlag(true);
    }
    else {
      toast.warning("Chưa đến thời gian làm bài !!!");
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
                        ref={countdownRef}
                        date={
                          dateCountDown +
                          parseInt(objInfoRoom.thoiGianLam) * 60000
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

  const renderCheckPermit = () => {
    return (
      <div
        className="uk-padding uk-padding-remove-top uk-padding-remove-bottom uk-height-1-1"
        style={{ overflowY: "auto" }}
      >
        <ToastContainer autoClose={3000} position={toast.POSITION.TOP_RIGHT} />
        {!loading && (
          <div>
            <p className="uk-text-large uk-text-center uk-text-bold uk-text-success">
              Phòng thi: {roomName}
            </p>
            <div
              className="uk-margin-bottom uk-flex uk-flex-row uk-flex-center"
              style={{ marginLeft: 150, marginRight: 150 }}
            >
              <div
                className="uk-grid uk-margin-small uk-width-1-1 uk-flex uk-flex-row uk-flex-center"
                uk-grid="true"
              >
                <div className="uk-width-1-1 uk-text-left">
                  <label
                    className="uk-form-label"
                    style={{ fontSize: "large" }}
                  >
                    Để đảm bảo chất lượng thi và tránh các vấn đề gian lận thi
                    cử. Các sinh viên vui lòng mở Micro và Camera để giảng viên
                    kiểm tra trước khi thi, phải chuẩn bị thẻ sinh viên hoặc
                    CMND/CCCD. Các sinh viên tuân thử đúng quy tắc thì mới có
                    thể làm bài thi.
                  </label>
                  <br />
                  <label
                    className="uk-form-label"
                    style={{ fontSize: "large" }}
                  >
                    Trong quá trình thi các thí sinh:
                  </label>
                  <br />
                  <label
                    className="uk-form-label uk-margin-left"
                    style={{ fontSize: "large" }}
                  >
                    <b>Bắt buộc:</b>
                  </label>
                  <br />
                  <label
                    className="uk-form-label"
                    style={{ fontSize: "large" }}
                  >
                    <b>+</b> Mở Micro vs Webcam trong suốt quá trinh làm bài
                    thi, Webcam phải chiếu õ toàn bộ khuôn mặt, không gian rộng.
                  </label>
                  <br />
                  <label
                    className="uk-form-label"
                    style={{ fontSize: "large" }}
                  >
                    <b>+</b> Yêu cầu sinh viên nghiêm túc làm bài, không gian
                    lận.
                  </label>
                  <br />
                  <label
                    className="uk-form-label uk-margin-left"
                    style={{ fontSize: "large" }}
                  >
                    <b>Được phép:</b>
                  </label>
                  <br />
                  <label
                    className="uk-form-label"
                    style={{ fontSize: "large" }}
                  >
                    <b>+</b> Sử dụng tài liệu giảng viên cho phép.
                  </label>
                  <br />
                  <label
                    className="uk-form-label"
                    style={{ fontSize: "large" }}
                  >
                    <b>+</b> Sử dụng các thiết bị như máy tính bỏ túi,... nếu
                    giảng vien cho phép.
                  </label>
                  <br />
                  <label
                    className="uk-form-label uk-margin-left"
                    style={{ fontSize: "large" }}
                  >
                    <b>Không được phép:</b>
                  </label>
                  <br />
                  <label
                    className="uk-form-label"
                    style={{ fontSize: "large" }}
                  >
                    <b>+</b> Chụp hình, sao chép, hoặc gửi đề thi ra bên ngoài.
                  </label>
                  <br />
                  <label
                    className="uk-form-label"
                    style={{ fontSize: "large" }}
                  >
                    <b>+</b> Không được tra cứu trên internet.
                  </label>
                  <br />
                  <label
                    className="uk-form-label"
                    style={{ fontSize: "large" }}
                  >
                    <b>+</b> Không được thoả luận trao đổi.
                  </label>
                  <br />
                  <br />
                  <br />
                  <label
                    className="uk-form-label"
                    style={{
                      fontSize: "large",
                      color: "#0f6ecd",
                      "textDecoration": "underline",
                    }}
                  >
                    Hướng dẫn địa chỉ liên lạc khi gặp sự cố:
                  </label>
                  <br />
                  <label
                    className="uk-form-label"
                    style={{ fontSize: "large" }}
                  >
                    Trong đợt thi online, không ít các bạn đã gặp phải những sự
                    cố không mong muốn làm ảnh hưởng đến quá trình làm bài thi
                    và kết quả thi. Khi gặp sự cố các bạn hãy bình tĩnh, chụp
                    màn hình ngày khi các bạn gặp sự cố và soạn mail gửi về địa
                    chỉ{" "}
                    <label
                      style={{
                        fontSize: "large",
                        color: "#0f6ecd",
                        "textDecoration": "underline",
                      }}
                    >
                      qlqtpm.20hcb@gmail.com
                    </label>
                    . Trường hợp các bạn sẽ được xem xét và giải quyết sau khi
                    kỳ thi kết thúc.
                  </label>
                  <br />
                </div>
                <div className="uk-flex uk-flex-center examroom_permiss">
                  <span
                    className="icon uk-margin-right uk-width-1-3@m"
                    uk-icon="microphone"
                  ></span>
                  <span
                    className="icon uk-width-1-3@m"
                    uk-icon="video-camera"
                  ></span>
                </div>
                <div className="uk-flex uk-flex-center uk-width-1-1">
                  <button
                    className={`uk-button`}
                    style={{ backgroundColor: "#32d296", color: "#FFF" }}
                    onClick={onClickStartExam}
                    disabled={isDisabledStartExam}
                  >
                    Bắt đầu làm bài
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
        {loading && (
          <div className="uk-flex uk-flex-center" uk-spinner=""></div>
        )}
      </div>
    );
  };

  return (
    <div className="uk-height-1-1 uk-background-muted">
      {isPermissionApproved && flag ? (
        objInfoRoom ? (
          renderExamTaker()
        ) : (
          <span uk-spinner="ratio: 4.5"></span>
        )
      ) : (
        renderCheckPermit()
      )}
    </div>
  );
};

export default ExamTakerPage;
