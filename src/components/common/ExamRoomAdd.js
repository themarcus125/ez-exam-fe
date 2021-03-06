import React, { useEffect, useState } from "react";
import {
  getAPIWithToken,
  postAPIWithToken,
  putAPIWithToken,
} from "../../utils/api";
import { getToken, getUser } from "../../utils/auth";
import { ToastContainer, toast } from "react-toastify";
import DatePicker from "react-datepicker";
import moment from "moment";
import LoadingOverlay from "./LoadingOverlay";
const token = getUser()?.tk ?? "";

const ExamRoomAdd = ({ roomId }) => {
  const role = getUser()?.role ?? "";
  const [loading, setLoading] = useState(true);
  const [roomName, setRoomName] = useState("");
  const [dateExam, setDateExam] = useState(new Date());
  const [hourExamRoom, setHourExamRoom] = useState("");
  const [hourStartExam, setHourStartExam] = useState("");
  const [lstSubject, setLstSubject] = useState(null);
  const [subject, setSubject] = useState("");
  const [lstCodeExam, setLstCodeExam] = useState(null);
  const [codeExam, setCodeExam] = useState("");
  const [lstStudent, setLstStudent] = useState(null);
  const [isUpdated, setIsUpdated] = useState(false);
  let _lstSubject = [];

  const getSubject = async () => {
    const tmp_lstSubject = await getAPIWithToken(
      "/chuyende/monhocnguoidung",
      token,
    );
    setLstSubject(tmp_lstSubject.data);
    _lstSubject = tmp_lstSubject.data;
  };

  const getCodeExam = async (tmp_subject) => {
    if (tmp_subject) {
      const tmp_lstCodeExam = await getAPIWithToken(
        `/dethi/layDanhSachBoDeThi?maChuyenDe=${tmp_subject}`,
        token,
      );
      setLstCodeExam(tmp_lstCodeExam.data.dsDeThi);
    }
  };

  useEffect(() => {
    setLoading(true);
    getSubject();
    // getCodeExam();
    //load update
    if (roomId) {
      getExamRoom();
    }
    setLoading(false);
  }, []);

  const getExamRoom = async () => {
    setLoading(true);
    if (token) {
      const tmp_lstExamRoom = await getAPIWithToken(
        `/phongthi?id=${roomId}`,
        token,
      );
      const objExamRoom = tmp_lstExamRoom?.data[0] ?? {};
      if (objExamRoom) {
        setRoomName(objExamRoom.maPhong);
        setDateExam(new Date(objExamRoom.ngayThi));
        setSubject(objExamRoom.maMonHoc);
        setHourExamRoom(objExamRoom.thoiGianBatDauPhong);
        setHourStartExam(objExamRoom.thoiGianBatDauThi);
        getCodeExam(objExamRoom.maMonHoc);
        setCodeExam(objExamRoom.maBoDe);
        if (objExamRoom.trangThai !== 0 ||
          Date.parse(
            moment(moment(objExamRoom.ngayThi).format("DD/MM/YYYY") + " " +
              objExamRoom.thoiGianBatDauPhong, "DD/MM/YYYY hh:mm"),
          ) <= Date.parse(new Date(objExamRoom.gioHeThong))) {
          setIsUpdated(true);
        }
        setTimeout(() => {
          let objSubject = _lstSubject.find(element => element.id == objExamRoom.maMonHoc);
          setLstStudent(objSubject?.nguoi_dung);
        }, 1000);
      }
    }
    setLoading(false);
  };

  const handleChangeSubject = (e) => {
    let objSubject = lstSubject.find(element => element.id == e.target.value);
    setLstStudent(objSubject?.nguoi_dung);
    setSubject(e.target.value);
    getCodeExam(e.target.value);
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
        if ((res.status === 200) & (data !== undefined && data !== null)) {
          toast.success("C???p nh???t ph??ng th??nh c??ng !!!");
        } else {
          toast.error("C???p nh???t ph??ng th???t b???i !!!");
        }
      } catch (err) {
        toast.error("???? c?? l???i x???y ra khi l??u !!!");
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
          toast.success("T???o ph??ng th??nh c??ng !!!");
        } else {
          toast.error("T???o ph??ng th???t b???i !!!");
        }
      } catch (err) {
        toast.error("???? c?? l???i x???y ra khi l??u !!!");
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
          {roomId ? "Chi ti???t ph??ng thi" : "T???o ph??ng thi"}
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
                    T??n ph??ng thi
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
                    Ch???n ng??y
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
                    Th???i gian b???t ?????u ph??ng
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
                    Th???i gian b???t ?????u thi
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
                    M??n h???c
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
                    M?? b??? ?????
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
            {role !== "admin" ? (
              <div className="uk-flex uk-flex-center">
                <div className="uk-card-body">
                  <button
                    className={`uk-button`}
                    style={{ backgroundColor: "#32d296", color: "#FFF" }}
                    disabled={isUpdated}
                  >
                    L??u
                  </button>
                </div>
              </div>
            ) : null}
          </fieldset>
        </form>
        {/* {loading && <div className="uk-flex uk-flex-center" uk-spinner=""></div>} */}
        <div className="uk-margin-top uk-overflow-auto">
          <table className="uk-table uk-table-striped uk-table-middle">
            <thead>
              <tr>
                <th className="uk-width-medium">M?? sinh vi??n</th>
                <th className="uk-width-large">T??n sinh vi??n</th>
                <th className="uk-width-large">Email</th>
              </tr>
            </thead>
            <tbody>
              {!loading &&
                lstStudent?.map((item) => {
                  return (
                    <tr key={item.id}>
                      <td data-label="M?? sinh vi??n" value={item.tenDangNhap}>
                        {item.tenDangNhap}
                      </td>
                      <td data-label="T??n sinh vi??n" value={item.tenNguoiDung}>
                        {item.tenNguoiDung}
                      </td>
                      <td data-label="Email" value={item.email}>
                        {item.email}
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </div>
      <LoadingOverlay isLoading={loading} />
    </>
  );
};

export default ExamRoomAdd;
