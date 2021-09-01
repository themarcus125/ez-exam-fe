import React, { useEffect, useState, useRef } from "react";
import { Link } from "gatsby";
import DatePicker from "react-datepicker";
import moment from "moment";
import { getAPIWithToken } from "../../utils/api";
import { getToken, getUser } from "../../utils/auth";
import Config from "../../utils/config";
import ControlBar from "./ControlBar";
import { ToastContainer, toast } from "react-toastify";

const USER_PER_PAGE = 10;
const ExamRoom = () => {
  const [lstExamRoom, setLstExamRoom] = useState([]);
  const [startDate, setStartDate] = useState(
    new Date(moment().startOf("month")),
  );
  const [endDate, setEndDate] = useState(new Date());
  const [lstSubject, setLstSubject] = useState(null);
  const [subject, setSubject] = useState("");
  const [lstTeacher, setLstTeacher] = useState(null);
  const [teacher, setTeacher] = useState("");
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const numOfPage = useRef(1);
  const role = getUser()?.role ?? "";
  const url = Config.urlPath[role]?.url;

  const getData = async () => {
    try {
      setLoading(true);
      const token = await getToken();
      if (token) {
        const response = await getAPIWithToken(
          `/phongthi?timkiem=${search}&mamonhoc=${subject}
          &tungay=${moment(startDate).format("YYYY-MM-DD")}
          &denngay=${moment(endDate).format("YYYY-MM-DD")}
          &giaovien=${teacher}`,
          token,
        );
        numOfPage.current =
          Math.ceil(response.data.length / USER_PER_PAGE) || 1;
        const chunks = Array(numOfPage.current)
          .fill()
          .map((_, index) => index * USER_PER_PAGE)
          .map((begin) => response.data.slice(begin, begin + USER_PER_PAGE));
        setLstExamRoom(chunks);
        setCurrentPage(1);
        setLoading(false);
      }
    } catch (error) {
      toast.error("Lấy danh sách phòng thi thất bại !!!");
    }
  };

  const getSubject = async () => {
    const token = await getToken();
    const tmp_lstSubject = await getAPIWithToken(
      "/chuyende/monhocnguoidung",
      token,
    );
    setLstSubject(tmp_lstSubject.data);
  };

  const getTeacher = async () => {
    const token = await getToken();
    const tmp_lstTeacher = await getAPIWithToken(
      "/users?quyen=giaovien&trangthai=0",
      token,
    );
    setLstTeacher(tmp_lstTeacher.data);
  };

  useEffect(() => {
    getSubject();
    getTeacher();
    getData();
  }, []);

  const onChangePage = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const onNext = () => {
    if (currentPage < numOfPage.current) {
      setCurrentPage(currentPage + 1);
    }
  };

  const onPrev = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };
  const handleChangeSubject = (e) => {
    setSubject(e.target.value);
  };
  const handleChangeTeacher = (e) => {
    setTeacher(e.target.value);
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
  const handleChangeSearch = (e) => {
    setSearch(e.target.value);
  };
  const onSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    getData();
  };

  return (
    <div
      className="uk-padding uk-padding-remove-top uk-padding-remove-bottom uk-height-1-1"
      style={{ overflowY: "auto" }}
    >
      <ToastContainer
        autoClose={3000}
        position={toast.POSITION.TOP_RIGHT}
      />
      <ControlBar
        title="Danh sách phòng thi"
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
            {role === "admin" ? (
              <div className="uk-width-1-4@l uk-display-inline-block">
                <span className="uk-display-inline-block uk-width-1-4">
                  Giáo viên
                </span>
                <div className="uk-display-inline-block uk-width-3-4">
                  <select
                    className="uk-select uk-width-1-1"
                    style={{
                      border: "solid 0.5px #666",
                    }}
                    onChange={handleChangeTeacher}
                    value={teacher}
                    onBlur={() => { }}
                  >
                    <option disabled></option>
                    {lstTeacher
                      ? lstTeacher.map((item, key) => (
                        <option key={key} value={item.id}>
                          {item.tenNguoiDung}
                        </option>
                      ))
                      : null}
                  </select>
                </div>
              </div>
            ) : null}
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

            {role !== "admin" ? (
              <div className="uk-width-1-4@l uk-display-inline-block uk-text-right">
                <Link
                  className="uk-button"
                  to={`${url}/examroom/add`}
                  style={{ ...myButton, ...activeText }}
                >
                  Tạo phòng thi
                </Link>
              </div>
            ) : null}
          </>
        )}
        isSearchEnabled
        searchString={search}
        onSearchStringChanged={handleChangeSearch}
        onSearchButtonClicked={onSearch}
      />
      {loading && <div className="uk-flex uk-flex-center" uk-spinner=""></div>}
      <div className="uk-margin-top uk-overflow-auto">
        <table className="uk-table uk-table-striped uk-table-middle">
          <thead>
            <tr>
              <th className="uk-width-small">Mã phòng</th>
              <th className="uk-width-large">Môn học</th>
              <th className="uk-width-small">Mã bộ đề</th>
              <th className="uk-width-small">Số lượng</th>
              <th className="uk-width-medium">Ngày thi</th>
              <th className="uk-width-medium">Thời gian bắt đầu phòng</th>
              <th className="uk-width-medium">Thời gian bắt đầu thi</th>
              <th className="uk-width-small"></th>
            </tr>
          </thead>
          <tbody>
            {!loading &&
              lstExamRoom[currentPage - 1]?.map((item) => {
                return (
                  <tr key={item.id}>
                    <td data-label="Mã phòng" value={item.maPhong}>
                      {item.tenPhong}
                    </td>
                    <td data-label="Môn học" value={item.maMonHoc}>
                      {item.tenMonHoc}
                    </td>
                    <td data-label="Mã bộ đề" value={item.maBoDe}>
                      {item.maBoDe}
                    </td>
                    <td data-label="Số lượng">{item.siSo}</td>
                    <td data-label="Ngày thi">
                      {moment(item.ngayThi).format("DD/MM/YYYY")}
                    </td>
                    <td data-label="Thời gian bắt đầu phòng">
                      {item.thoiGianBatDauPhong}
                    </td>
                    <td data-label="Thời gian bắt đầu thi">
                      {item.thoiGianBatDauThi}
                    </td>
                    <td data-label="Tùy chỉnh">
                      <ul className="uk-subnav-pill">
                        <a style={{ activeText }}>
                          <span uk-icon="table"></span>
                        </a>
                        <div uk-dropdown="mode: click">
                          <ul className="uk-nav uk-dropdown-nav">
                            <li>
                              <a>Báo cáo tổng hợp</a>
                            </li>
                            <li>
                              <Link to={`${item.id}/records`}>
                                Xem danh sách bài thi
                              </Link>
                            </li>
                            <li>
                              <Link to={`${url}/examroom/${item.id}`}>
                                Chi tiết phòng thi
                              </Link>
                            </li>
                            {/* {role !== "admin" &&
                              Date.parse(
                                moment(
                                  moment(item.ngayThi).format("DD/MM/YYYY") +
                                  " " +
                                  item.thoiGianBatDauThi,
                                  "DD/MM/YYYY hh:mm"
                                ),
                              ) > Date.parse(new Date()) ? (
                              <li>
                                <Link to={`${url}/examroom/${item.id}`}>
                                  Chi tiết phòng thi
                                </Link>
                              </li>
                            ) : (
                              ""
                            )} */}
                          </ul>
                        </div>
                      </ul>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
      <ul className="uk-pagination uk-flex-center" uk-margin="">
        <li className={`${currentPage === 1 ? "uk-disabled" : ""}`}>
          <button
            className="uk-button uk-button-default uk-button-small"
            onClick={onPrev}
          >
            <span className="uk-icon" uk-icon="icon: chevron-left"></span>
          </button>
        </li>
        {Array.from({ length: numOfPage.current }, (_, i) => i + 1).map(
          (num) => {
            const isActiveButton = currentPage === num;
            return (
              <li
                key={num}
                className={`${isActiveButton ? "uk-disabled" : ""}`}
              >
                <button
                  className="uk-button uk-button-default uk-button-small"
                  style={{
                    ...paginationButton,
                    ...(isActiveButton && activeButton),
                  }}
                  onClick={() => onChangePage(num)}
                >
                  {num}
                </button>
              </li>
            );
          },
        )}
        <li
          className={`${currentPage === numOfPage.current ? "uk-disabled" : ""
            }`}
        >
          <button
            className="uk-button uk-button-default uk-button-small"
            onClick={onNext}
          >
            <span className="uk-icon" uk-icon="icon: chevron-right"></span>
          </button>
        </li>
      </ul>
    </div>
  );
};

export default ExamRoom;

const paginationButton = {
  width: 40,
};

const activeText = {
  color: "#FFF",
};

const myButton = {
  backgroundColor: "#32d296",
};

const activeButton = {
  color: "#FFF",
  backgroundColor: "#32d296",
};
