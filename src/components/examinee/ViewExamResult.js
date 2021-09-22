import React, { useEffect, useState, useRef } from "react";
import { Link } from "gatsby";
import DatePicker from "react-datepicker";
import moment from "moment";
import { getAPIWithToken } from "../../utils/api";
import { getToken, getUser } from "../../utils/auth";
import Config from "../../utils/config";
import ControlBar from "../common/ControlBar";
import { ToastContainer, toast } from "react-toastify";

const USER_PER_PAGE = 10;
const ViewExamResult = () => {
  const [lstExamResult, setLstExamResult] = useState([]);
  const [meta, setMeta] = useState(null);
  const [startDate, setStartDate] = useState(
    new Date(moment().startOf("month")),
  );
  const [endDate, setEndDate] = useState(new Date());
  const [lstSubject, setLstSubject] = useState(null);
  const [subject, setSubject] = useState("");
  const [loading, setLoading] = useState(true);
  const lstPage = [];
  const token = getUser()?.tk ?? "";

  const getData = async (crPage,tmpSub) => {
    try {
      setLoading(true);
      if (token) {
        const response = await getAPIWithToken(
          // eslint-disable-next-line prettier/prettier
          `/sinhvien/traCuuKetQua?limit=${USER_PER_PAGE}&page=${crPage}&idChuyenDe=${subject === "" ? tmpSub : subject}&tuNgay=${moment(startDate).format("YYYY-MM-DD")}&denNgay=${moment(endDate).format("YYYY-MM-DD")}`,
          token,
        );
        setLstExamResult(response.data?.dsKetQua);
        setMeta(response.data?.meta);
        setLoading(false);
      }
    } catch (error) {
      toast.error("Lấy danh sách kết quả thất bại !!!");
    }
  };

  const getSubject = async () => {
    const tmp_lstSubject = await getAPIWithToken(
      "/chuyende/monhocnguoidung",
      token,
    );
    setLstSubject(tmp_lstSubject?.data);
    setSubject(tmp_lstSubject?.data[0].id);
    getData(1,tmp_lstSubject?.data[0].id);
  };

  useEffect(async () => {
    getSubject();
  }, []);

  const handleChangeSubject = (e) => {
    setSubject(e.target.value);
  };
  const handleChangeStartDate = (date) => {
    setStartDate(date);
    const dateDiff = moment(date).diff(moment(endDate));
    if (dateDiff > 0) {
      setEndDate(date);
    }
  };
  const handleChangeEndDate = (date) => {
    setEndDate(date);
  };
  const onSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    getData(1,"");
  };

  for (let i = 1; i <= meta?.lastPage; i++) {
    lstPage.push(i);
  }

  return (
    <div
      className="uk-padding uk-padding-remove-top uk-padding-remove-bottom uk-height-1-1"
      style={{ overflowY: "auto" }}
    >
      <ToastContainer autoClose={3000} position={toast.POSITION.TOP_RIGHT} />
      <ControlBar
        title="Tra cứu kết quả kiểm tra"
        controlRow={() => (
          <>
            <div className="uk-width-1-4@l uk-display-inline-block">
              <span className="uk-display-inline-block uk-width-1-4">
                Môn học
              </span>
              <div className="uk-display-inline-block uk-width-3-4">
                <select
                  className="uk-select uk-width-1-1"
                  style={{
                    border: "solid 0.5px #666",
                  }}
                  onChange={handleChangeSubject}
                  value={subject}
                  onBlur={() => { }}
                >
                  {/* <option disabled></option> */}
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
            <div className="uk-width-1-4@l uk-display-inline-block">
              <span className="uk-display-inline-block uk-width-1-4">
                Từ ngày
              </span>
              <div className="uk-display-inline-block uk-width-3-4">
                <DatePicker
                  className="uk-select uk-width-1-1 black-border"
                  style={{
                    border: "solid 0.5px #666",
                  }}
                  selected={startDate}
                  onChange={handleChangeStartDate}
                  selectsStart
                  startDate={startDate}
                  endDate={endDate}
                  dateFormat="dd/MM/yyyy"
                />
              </div>
            </div>
            <div className="uk-width-1-4@l uk-display-inline-block">
              <span className="uk-display-inline-block uk-width-1-4">
                Đến ngày
              </span>
              <div className="uk-display-inline-block uk-width-3-4">
                <DatePicker
                  className="uk-select uk-width-1-1 black-border"
                  style={{
                    border: "solid 0.5px #666",
                  }}
                  selected={endDate}
                  onChange={handleChangeEndDate}
                  selectsEnd
                  startDate={startDate}
                  endDate={endDate}
                  minDate={startDate}
                  dateFormat="dd/MM/yyyy"
                />
              </div>
            </div>
            <div className="uk-width-1-4@l uk-display-inline-block uk-text-right">
              <button
                className="search-button uk-button"
                onClick={onSearch}
                style={{ ...myButton, ...activeText }}
              >
                Xem kết quả
              </button>
            </div>
          </>
        )}
      />
      {loading && <div className="uk-flex uk-flex-center" uk-spinner=""></div>}
      <div className="uk-margin-top uk-overflow-auto">
        <table className="uk-table uk-table-striped uk-table-middle">
          <thead>
            <tr>
              <th className="uk-width-small">Mã phòng thi</th>
              {/* <th className="uk-width-medium">Môn thi</th> */}
              <th className="uk-width-small">Mã đề thi</th>
              <th className="uk-width-medium">Ngày thi</th>
              <th className="uk-width-small">Giờ thi</th>
              <th className="uk-width-small">Điểm</th>
            </tr>
          </thead>
          <tbody>
            {!loading &&
              lstExamResult?.map((item) => {
                return (
                  <tr key={item.id}>
                    <td data-label="Mã phòng thi" value={item.maPhong}>
                      {item.maPhong}
                    </td>
                    {/* <td data-label="Môn thi" value={item.tenPhong}>
                      {item.tenPhong}
                    </td> */}
                    <td data-label="Mã đề thi" value={item.maDe}>
                      {item.maDe}
                    </td>
                    <td data-label="Ngày thi">
                      {moment(item.ngayThi).format("DD/MM/YYYY")}
                    </td>
                    <td data-label="Giờ thi">{item.thoiGianBatDauThi}</td>
                    <td data-label="Điểm">{item.diem}</td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
      <ul className="uk-pagination uk-flex-center uk-margin">
        <li
          className={meta?.currentPage === 1 ? "uk-disabled" : ""}
          onClick={() => {
            const page = meta?.currentPage - 1;
            getData(page,"");
          }}
        >
          <button className="uk-button uk-button-default uk-button-small">
            <span className="uk-icon" uk-icon="icon: chevron-left"></span>
          </button>
        </li>
        {lstPage.map((item, index) => (
          <li
            key={index}
            className={item === meta?.currentPage ? "uk-disabled" : ""}
            onClick={() => {
              getData(item,"");
            }}
          >
            <button
              className="uk-button uk-button-default uk-button-small"
              style={
                item === meta?.currentPage
                  ? {
                    width: 40,
                    color: "#FFF",
                    backgroundColor: "#32d296",
                  }
                  : { width: 40 }
              }
            >
              {item}
            </button>
          </li>
        ))}
        <li
          className={meta?.currentPage === meta?.lastPage ? "uk-disabled" : ""}
          onClick={() => {
            const page = meta?.currentPage + 1;
            getData(page,"");
          }}
        >
          <button className="uk-button uk-button-default uk-button-small">
            <span className="uk-icon" uk-icon="icon: chevron-right"></span>
          </button>
        </li>
      </ul>
    </div>
  );
};

export default ViewExamResult;

const activeText = {
  color: "#FFF",
};

const myButton = {
  backgroundColor: "#32d296",
};
