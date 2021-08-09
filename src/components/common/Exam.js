import React, { useState, useEffect } from "react";
import { Link } from "gatsby";
import { getAPIWithToken } from "../../utils/api";
import { getToken } from "../../utils/auth";

const Exam = () => {
  const [monHocs, setMonhocs] = useState([]);
  const [deThis, setdeThis] = useState([]);

  const doKho = [
    {
      id: 1,
      ten: "Dễ",
    },
    {
      id: 2,
      ten: "Trung bình",
    },
    {
      id: 3,
      ten: "Khó",
    },
  ];

  const limit = 10;
  let page = 1;
  let maMonHoc = "";
  let tuNgay = "";
  let denNgay = "";
  let key = "";

  const getMonHoc = async () => {
    const token = await getToken();
    const lstMonHoc = await getAPIWithToken("/chuyende/monhocnguoidung", token);
    setMonhocs(lstMonHoc.data);
  };

  const getDeThi = async () => {
    const token = await getToken();
    const lstDeThi = await getAPIWithToken(
      `/dethi/layDanhSachBoDeThi?limit=${limit}&page=${page}&maChuyenDe=${
        maMonHoc && maMonHoc
      }&tuNgay=${tuNgay && tuNgay}&denNgay=${
        denNgay && denNgay
      }&keywork=${key}`,
      token,
    );

    setdeThis(lstDeThi.data?.dsDeThi);
  };

  useEffect(() => {
    getMonHoc();
    getDeThi();
  }, []);

  return (
    <div className="uk-padding uk-padding-remove-top uk-padding-remove-bottom uk-height-1-1">
      <p className="uk-text-large uk-text-center uk-text-bold uk-text-success">
        Danh sách đề thi
      </p>

      <div className="uk-flex uk-flex-row uk-flex-between uk-margin-bottom">
        <div className="uk-width-1-4@s uk-display-inline-block">
          <span className="uk-display-inline-block uk-width-1-5">Môn học</span>
          <div
            className="uk-display-inline-block uk-width-3-5"
            style={{ marginLeft: "10px" }}
          >
            <select
              className="uk-select uk-width-1-1"
              style={{
                border: "solid 0.5px #666",
              }}
              onChange={(e) => {
                maMonHoc = e.target.value;
              }}
            >
              {monHocs &&
                monHocs.map((item, index) => (
                  <option value={item.id} key={index}>
                    {item.tenChuyenDe}
                  </option>
                ))}
            </select>
          </div>
        </div>

        <div className="uk-width-1-4@s uk-display-inline-block">
          <span className="uk-display-inline-block uk-width-1-5">Từ ngày</span>
          <div className="uk-display-inline-block uk-width-3-5">
            <input
              className="uk-input uk-width-1-1"
              type="date"
              format="YYYY-MM-DD"
              onChange={(e) => {
                tuNgay = e.target.value;
              }}
            />
          </div>
        </div>

        <div className="uk-width-1-4@s uk-display-inline-block">
          <span className="uk-display-inline-block uk-width-2-5">Đến ngày</span>
          <div
            className="uk-display-inline-block uk-width-3-5"
            style={{ marginLeft: "-50px" }}
          >
            <input
              className="uk-input uk-width-1-1"
              type="date"
              format="YYYY-MM-DD"
              onChange={(e) => {
                denNgay = e.target.value;
              }}
            />
          </div>
        </div>

        <div className="uk-width-1-4@s uk-display-inline-block">
          <span className="uk-display-inline-block uk-width-1-5">Mức độ</span>
          <div className="uk-display-inline-block uk-width-3-5">
            <select
              className="uk-select uk-width-1-1"
              style={{
                border: "solid 0.5px #666",
              }}
            >
              {doKho.map((item) => (
                <option value={item.id}>{item.ten}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="uk-flex uk-flex-row uk-flex-between uk-margin-bottom">
        <div className="uk-width-3-5 uk-flex uk-flex-between">
          <input
            className="uk-search-input uk-width-4-5"
            type="search"
            placeholder="Search"
            style={{
              border: "solid 0.5px #666",
            }}
            onChange={(e) => {
              key = e.target.value;
            }}
          />

          <button
            className="uk-button"
            style={{ backgroundColor: "#32d296", color: "#FFF" }}
            onClick={async () => {
              await getDeThi();
            }}
          >
            Tìm kiếm
          </button>
        </div>

        <button
          className="uk-button"
          style={{ backgroundColor: "#32d296", color: "#FFF" }}
        >
          <Link to="./add" style={{ color: "#FFFFFF", textDecoration: "none" }}>
            Thêm mới
          </Link>
        </button>
      </div>

      <div className="uk-margin-top uk-overflow-auto" style={{ height: 400 }}>
        <table className="uk-table uk-table-striped uk-table-middle">
          <thead>
            <tr>
              <th className="uk-width-large">Mã bộ đề</th>
              <th className="uk-width-large">Mã đề</th>
              <th className="uk-width-large">Tên đề thi</th>
              <th className="uk-width-large">Môn học</th>
              <th className="uk-width-large">Ngày tạo</th>
              <th className="uk-width-large">Mức độ</th>
              <th className="uk-width-small"></th>
            </tr>
          </thead>
          <tbody>
            {deThis &&
              deThis.length > 0 &&
              deThis.map((item, index) => (
                <tr key={index}>
                  <td>{item.maBoDe}</td>
                  <td>{item.maDe}</td>
                  <td>{item.tieuDe}</td>
                  <td>{item.tenBoDe}</td>
                  <td>Ngay tao</td>
                  <td>{doKho.find((x) => x.id == item.doKho)?.ten}</td>
                  <td>
                    <nav
                      id="navbar"
                      className="uk-navbar-container"
                      style={{ backgroundColor: "#FFFFFF" }}
                      uk-navbar=""
                    >
                      <div className="uk-navbar-left uk-margin-small-left">
                        <ul className="uk-navbar-nav">
                          <li className="uk-flex uk-flex-middle">
                            <a>
                              <span uk-icon="table"></span>
                            </a>
                            <div className="uk-navbar-dropdown">
                              <ul className="uk-nav uk-navbar-dropdown-nav">
                                <li>
                                  <a>Tạo bản sao</a>
                                </li>
                                <li>
                                  <a>Xem chi tiết</a>
                                </li>
                              </ul>
                            </div>
                          </li>
                        </ul>
                      </div>
                    </nav>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      <ul className="uk-pagination uk-flex-center" uk-margin>
        <li>
          <button className="uk-button uk-button-default uk-button-small">
            <span className="uk-icon" uk-icon="icon: chevron-left"></span>
          </button>
        </li>
        <li className="uk-disabled">
          <button
            className="uk-button uk-button-default uk-button-small"
            style={{
              width: 40,
              color: "#FFF",
              backgroundColor: "#32d296",
            }}
          >
            1
          </button>
        </li>
        <li>
          <button
            className="uk-button uk-button-default uk-button-small"
            style={{ width: 40 }}
          >
            2
          </button>
        </li>
        <li>
          <button
            className="uk-button uk-button-default uk-button-small"
            style={{ width: 40 }}
          >
            3
          </button>
        </li>
        <li>
          <button className="uk-button uk-button-default uk-button-small">
            <span className="uk-icon" uk-icon="icon: chevron-right"></span>
          </button>
        </li>
      </ul>
    </div>
  );
};

export default Exam;
