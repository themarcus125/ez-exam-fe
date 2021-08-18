import React, { useEffect, useState } from "react";
import {
  getAPIWithToken,
  postAPIWithToken,
  putAPIWithToken,
} from "../../utils/api";
import { getToken } from "../../utils/auth";
import { ToastContainer, toast } from "react-toastify";
import DatePicker from "react-datepicker";
import moment from "moment";
import LoadingOverlay from "./LoadingOverlay";

const ExamRoomAdd = ({ roomId }) => {
  const [loading, setLoading] = useState(true);
  const [roomName, setRoomName] = useState("");
  const [dateExam, setDateExam] = useState(new Date());
  const [hourExamRoom, setHourExamRoom] = useState("");
  const [hourStartExam, setHourStartExam] = useState("");
  const [lstSubject, setLstSubject] = useState(null);
  const [subject, setSubject] = useState("");
  const [lstCodeExam, setLstCodeExam] = useState(null);
  const [codeExam, setCodeExam] = useState("");

  const getSubject = async () => {
    const token = await getToken();
    const tmp_lstSubject = await getAPIWithToken(
      "/chuyende/monhocnguoidung",
      token,
    );
    setLstSubject(tmp_lstSubject.data);
  };

  const getCodeExam = async () => {
    const token = await getToken();
    const tmp_lstCodeExam = await getAPIWithToken(
      "/dethi/layDanhSachBoDeThi",
      token,
    );
    setLstCodeExam(tmp_lstCodeExam.data.dsDeThi);
  };

  useEffect(() => {
    setLoading(true);
    getSubject();
    getCodeExam();
    //load update
    if (roomId) {
      getExamRoom();
    }
    setLoading(false);
  }, []);

  const getExamRoom = async () => {
    setLoading(true);
    const token = await getToken();
    if (token) {
      const tmp_lstExamRoom = await getAPIWithToken(
        `/phongthi?id=${roomId}`,
        token,
      );
      const lstExamRoom = tmp_lstExamRoom?.data[0] ?? {};
      if (lstExamRoom) {
        setRoomName(lstExamRoom.maPhong);
        setDateExam(new Date(lstExamRoom.ngayThi));
        setSubject(lstExamRoom.maMonHoc);
        setHourExamRoom(lstExamRoom.thoiGianBatDauPhong);
        setHourStartExam(lstExamRoom.thoiGianBatDauThi);
        setCodeExam(lstExamRoom.maBoDe);
      }
    }
    setLoading(false);
  };

  const handleChangeSubject = (e) => {
    setSubject(e.target.value);
  };

  const handleChangeRoomName = (e) => {
    setRoomName(e.target.value);
  };
  const handleChangeDateExam = (date) => {
    setDateExam(date);
  };
  const handleChangeHourExamRoom = (e) => {
    setHourExamRoom(e.target.value);
  };
  const handleChangeHourStartExam = (e) => {
    setHourStartExam(e.target.value);
  };
  const handleChangeCodeExam = (e) => {
    setCodeExam(e.target.value);
  };

  const clearData = () => {
    setRoomName("");
    setDateExam(new Date());
    setSubject("");
    setHourExamRoom("");
    setHourStartExam("");
    setCodeExam("");
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const token = await getToken();
    if (roomId) {
      try {
        const res = await putAPIWithToken(
          `/phongthi/${roomId}`,
          {
            tenPhong: roomName,
            ngayThi: moment(dateExam).format("YYYY-MM-DD"),
            thoiGianBatDauPhong: hourExamRoom,
            thoiGianBatDauThi: hourStartExam,
            maBoDe: codeExam,
            maMonHoc: subject,
          },
          token,
        );
        const { data } = await res.json();
        if ((res.status === 200) & (data !== undefined)) {
          toast.success("Cập nhật phòng thành công !!!");
        } else {
          toast.error("Cập nhật phòng thất bại !!!");
        }
      } catch (err) {
        toast.error("Đã có lỗi xảy ra khi lưu !!!");
      }
    } else {
      try {
        const res = await postAPIWithToken(
          "/phongthi",
          {
            tenPhong: roomName,
            ngayThi: moment(dateExam).format("YYYY-MM-DD"),
            thoiGianBatDauPhong: hourExamRoom,
            thoiGianBatDauThi: hourStartExam,
            maBoDe: codeExam,
            maMonHoc: subject,
          },
          token,
        );
        const { data } = await res.json();
        if ((res.status === 200) & (data !== undefined)) {
          clearData();
          toast.success("Tạo phòng thành công !!!");
        } else {
          toast.error("Tạo phòng thất bại !!!");
        }
      } catch (err) {
        toast.error("Đã có lỗi xảy ra khi lưu !!!");
      }
    }
  };
  return (
    <>
      <div
        className="uk-padding uk-padding-remove-top uk-padding-remove-bottom uk-height-1-1"
        style={{ overflowY: "auto" }}
      >
        <p className="uk-text-large uk-text-center uk-text-bold uk-text-success">
          {roomId ? "Chỉnh sửa phòng thi" : "Tạo phòng thi"}
        </p>

        <ToastContainer autoClose={3000} position={toast.POSITION.TOP_RIGHT} />

        <form
          className="uk-form-horizontal uk-margin-small"
          onSubmit={onSubmit}
        >
          <fieldset className="uk-fieldset">
            <div className="uk-grid">
              <div className="uk-width-1-2 uk-margin-bottom">
                <div className="uk-margin">
                  <label
                    className="uk-form-label"
                    htmlFor="form-horizontal-text"
                  >
                    Tên phòng thi
                  </label>
                  <div className="uk-form-controls">
                    <input
                      className="uk-input"
                      type="text"
                      value={roomName}
                      onChange={handleChangeRoomName}
                      required
                    />
                  </div>
                </div>
              </div>
              <div className="uk-width-1-2 uk-margin-bottom">
                <div className="uk-margin">
                  <label
                    className="uk-form-label"
                    htmlFor="form-horizontal-text"
                  >
                    Chọn ngày
                  </label>
                  <div className="uk-form-controls">
                    <DatePicker
                      wrapperClassName="uk-input"
                      className="uk-input"
                      selected={dateExam}
                      onChange={handleChangeDateExam}
                      closeOnScroll={true}
                      dateFormat="dd/MM/yyyy"
                      required
                    />
                  </div>
                </div>
              </div>
              <div className="uk-width-1-2 uk-margin-bottom">
                <div className="uk-margin">
                  <label
                    className="uk-form-label"
                    htmlFor="form-horizontal-text"
                  >
                    Thời gian bắt đầu phòng
                  </label>
                  <div className="uk-form-controls">
                    <input
                      className="uk-input uk-form-width-small"
                      type="time"
                      value={hourExamRoom}
                      onChange={handleChangeHourExamRoom}
                      required
                    />
                  </div>
                </div>
              </div>
              <div className="uk-width-1-2 uk-margin-bottom">
                <div className="uk-margin">
                  <label
                    className="uk-form-label"
                    htmlFor="form-horizontal-text"
                  >
                    Thời gian bắt đầu thi
                  </label>
                  <div className="uk-form-controls">
                    <input
                      className="uk-input uk-form-width-small"
                      type="time"
                      value={hourStartExam}
                      onChange={handleChangeHourStartExam}
                      required
                    />
                  </div>
                </div>
              </div>
              <div className="uk-width-1-2 uk-margin-bottom">
                <div className="uk-margin">
                  <label
                    className="uk-form-label"
                    htmlFor="form-horizontal-text"
                  >
                    Môn học
                  </label>
                  <div className="uk-form-controls">
                    <select
                      className="uk-select"
                      onChange={handleChangeSubject}
                      value={subject}
                      required
                      onBlur={() => { }}
                    >
                      <option disabled></option>
                      {lstSubject
                        ? lstSubject.map((item, key) => (
                          <option key={key} value={item.id}>
                            {item.tenChuyenDe}
                          </option>
                        ))
                        : null}
                    </select>
                  </div>
                </div>
              </div>
              <div className="uk-width-1-2 uk-margin-bottom">
                <div className="uk-margin">
                  <label
                    className="uk-form-label"
                    htmlFor="form-horizontal-text"
                  >
                    Mã bộ đề
                  </label>
                  <div className="uk-form-controls">
                    <select
                      className="uk-select"
                      onChange={handleChangeCodeExam}
                      value={codeExam}
                      required
                      onBlur={() => { }}
                    >
                      <option disabled></option>
                      {lstCodeExam
                        ? lstCodeExam.map((item, key) => (
                          <option key={key} value={item.maBoDe}>
                            {item.maDe}
                          </option>
                        ))
                        : null}
                    </select>
                  </div>
                </div>
              </div>
            </div>
            <div className="uk-flex uk-flex-center">
              <div className="uk-card-body">
                <button
                  className={`uk-button`}
                  style={{ backgroundColor: "#32d296", color: "#FFF" }}
                >
                  Lưu
                </button>
              </div>
            </div>
          </fieldset>
        </form>
      </div>
      <LoadingOverlay isLoading={loading} />
    </>
  );
};

export default ExamRoomAdd;
