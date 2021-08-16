import React, { useState, useEffect } from "react";
import { Link } from "gatsby";
import {
  getAPIWithToken,
  postAPIWithToken,
  deleteAPIWithToken,
} from "../../utils/api";
import { getToken, getUser } from "../../utils/auth";
import moment from "moment";
import Config from "../../utils/config";

const limit = 10;

const Exam = () => {
  const [monHocs, setMonhocs] = useState([]);
  const [deThis, setdeThis] = useState([]);
  const [meta, setMeta] = useState(null);
  const [maMonHoc, setMaMonHoc] = useState("");
  const [tuNgay, setTuNgay] = useState("");
  const [denNgay, setDenNgay] = useState("");
  const [key, setKey] = useState("");
  const [loading, setLoading] = useState(false);
  let lstPage = [];

  const role = getUser()?.role ?? "";
  const url = Config.urlPath[role]?.url;

  const getMonHoc = async () => {
    const token = await getToken();
    const lstMonHoc = await getAPIWithToken("/chuyende/monhocnguoidung", token);
    setMonhocs(lstMonHoc.data);
  };

  const getDeThi = async (crPage) => {
    setLoading(true);
    const token = await getToken();
    const lstDeThi = await getAPIWithToken(
      `/dethi/layDanhSachBoDeThi?limit=${limit}&page=${crPage}&maChuyenDe=${
        maMonHoc && maMonHoc
      }&tuNgay=${tuNgay && tuNgay}&denNgay=${
        denNgay && denNgay
      }&keywork=${key}`,
      token,
    );

    setdeThis(lstDeThi.data?.dsDeThi);
    setMeta(lstDeThi.data?.meta);
    setLoading(false);
  };

  const taoBanSao = async (id) => {
    const token = await getToken();

    const deThi = await getAPIWithToken(
      `/dethi/layChiTietDeThi?id=${id}`,
      token,
    );

    const data = deThi?.data;

    const dsCauHoi = [];
    for (const ch of data.dsCauhoi) {
      const cauHoi = {
        maCauHoi: ch.id,
        loaiCauHoi: ch.loaiCauHoi,
        dsDapAn: [],
      };

      if (ch.dsDapAn.length > 0) {
        for (const da of ch.dsDapAn) {
          cauHoi.dsDapAn.push({
            maDapAn: da.id,
            loaiDapAn: da.loaiDapAn,
          });
        }
      }

      dsCauHoi.push(cauHoi);
    }

    const response = await postAPIWithToken(
      "/dethi/themDeThi",
      {
        tenDeThi: data.tieuDe,
        maChuyenDe: 1,
        thoiGianLam: data.thoiGianLam,
        moTaDeThi: data.moTaDeThi,
        soLuongTracNghiem: data.soLuongTracNghiem,
        soLuongTuLuan: data.soLuongTuLuan,
        diemTracNghiem: data.diemTracNghiem,
        diemTuLuan: data.diemTuLuan,
        diemTungCauTracNghiem: data.diemTungCauTracNghiem,
        diemTungCauTuLuan: data.diemTungCauTuLuan,
        coTaoBoDe: false,
        soDe: 0,
        danhSachCauHoi: dsCauHoi,
      },
      token,
    );

    if (response?.status === 200) {
      alert("Tạo bản sao thành công.");
    } else {
      alert("Đã xảy ra lỗi. Tạo bản sao thất bại.");
    }
  };

  const xoaBoDe = async (maBoDe) => {
    const token = await getToken();

    const response = await deleteAPIWithToken(
      `/dethi/xoaBoDeThi?maBoDe=${maBoDe}`,
      token,
    );

    if (response?.status === 200) {
      alert("Xóa đề thi thành công.");
      await getDeThi(meta?.currentPage);
    } else {
      alert("Đã xảy ra lỗi. Xóa đề thi thất bại.");
    }
  };

  useEffect(() => {
    getMonHoc();
    getDeThi(1);
  }, []);

  for (let i = 1; i <= meta?.lastPage; i++) {
    lstPage.push(i);
  }

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
              value={maMonHoc}
              onChange={(e) => {
                setMaMonHoc(e.target.value);
              }}
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

        <div className="uk-width-1-4@s uk-display-inline-block">
          <span className="uk-display-inline-block uk-width-1-5">Từ ngày</span>
          <div className="uk-display-inline-block uk-width-3-5">
            <input
              className="uk-input uk-width-1-1"
              type="date"
              format="YYYY-MM-DD"
              onChange={(e) => {
                setTuNgay(e.target.value);
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
                setDenNgay(e.target.value);
              }}
            />
          </div>
        </div>
      </div>

      <div className="uk-flex uk-flex-row uk-flex-between uk-margin-bottom">
        <div className="uk-width-3-5 uk-flex uk-flex-between">
          <input
            className="uk-search-input uk-width-4-5"
            type="search"
            placeholder="Tìm kiếm"
            style={{
              border: "solid 0.5px #666",
            }}
            onChange={(e) => {
              setKey(e.target.value);
            }}
          />

          <button
            className={`uk-button ${loading ? "uk-disabled" : ""}`}
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
              <th className="uk-width-medium">Mã bộ đề</th>
              <th className="uk-width-large">Mã đề</th>
              <th className="uk-width-large">Tên đề thi</th>
              <th className="uk-width-large">Môn học</th>
              <th className="uk-width-large">Ngày tạo</th>
              <th className="uk-width-medium"></th>
            </tr>
          </thead>
          <tbody>
            {!loading &&
              deThis &&
              deThis.length > 0 &&
              deThis.map((item, index) => (
                <tr key={index}>
                  <td>{item.maBoDe}</td>
                  <td>{item.maDe}</td>
                  <td>{item.tieuDe}</td>
                  <td>{item.tenChuyenDe}</td>
                  <td>{moment(item.ngayTao).format("DD/MM/YYYY")}</td>
                  <td>
                    <ul class="uk-subnav-pill">
                      <a
                        style={{
                          color: "#FFF",
                        }}
                      >
                        <span uk-icon="table"></span>
                      </a>
                      <div uk-dropdown="mode: click">
                        <ul class="uk-nav uk-dropdown-nav">
                          <li>
                            <a
                              onClick={() => {
                                taoBanSao(item.id);
                              }}
                            >
                              Tạo bản sao
                            </a>
                          </li>
                          <li>
                            <Link to={`${url}/exam/${item.id}`}>
                              Xem chi tiết
                            </Link>
                          </li>
                          <li>
                            <a
                              onClick={() => {
                                xoaBoDe(item.maBoDe);
                              }}
                            >
                              Xóa đề thi
                            </a>
                          </li>
                        </ul>
                      </div>
                    </ul>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
        {loading && (
          <div className="uk-flex uk-flex-center" uk-spinner=""></div>
        )}
      </div>

      <ul className="uk-pagination uk-flex-center" uk-margin>
        <li
          className={meta?.currentPage === 1 ? "uk-disabled" : ""}
          onClick={() => {
            const page = meta?.currentPage - 1;
            getDeThi(page);
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
              getDeThi(item);
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
            getDeThi(page);
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

export default Exam;
