import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import { Link } from "gatsby";
import DatePicker from "react-datepicker";
import {
  getAPIWithToken,
  postAPIWithToken,
  deleteAPIWithToken,
} from "../../utils/api";
import { getToken, getUser } from "../../utils/auth";
import moment from "moment";
import Config from "../../utils/config";
import ControlBar from "./ControlBar";

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
  const lstPage = [];

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
      }&tuNgay=${tuNgay && moment(tuNgay).format("YYYY-MM-DD")}&denNgay=${
        denNgay && moment(denNgay).format("YYYY-MM-DD")
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
      toast.success("T???o b???n sao th??nh c??ng.");
      await getDeThi(meta?.currentPage);
    } else {
      toast.error("???? x???y ra l???i. T???o b???n sao th???t b???i.");
    }
  };

  const xoaBoDe = async (maBoDe) => {
    const token = await getToken();

    const response = await deleteAPIWithToken(
      `/dethi/xoaBoDeThi?maBoDe=${maBoDe}`,
      token,
    );

    if (response?.status === 200) {
      toast.success("X??a ????? thi th??nh c??ng.");
      await getDeThi(meta?.currentPage);
    } else {
      toast.error("???? x???y ra l???i. X??a ????? thi th???t b???i.");
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
      <ToastContainer autoClose={3000} position={toast.POSITION.TOP_RIGHT} />

      <ControlBar
        title="Danh s??ch ????? thi"
        controlRow={() => (
          <>
            <div className="uk-width-1-4@l uk-display-inline-block">
              <span className="uk-display-inline-block uk-width-1-4">
                M??n h???c
              </span>
              <div className="uk-display-inline-block uk-width-3-4">
                <select
                  className="uk-select uk-width-1-1 black-border"
                  value={maMonHoc}
                  onChange={(e) => {
                    setMaMonHoc(e.target.value);
                  }}
                >
                  <option value="">T???t c??? m??n h???c</option>
                  {monHocs &&
                    monHocs.map((item, index) => (
                      <option value={item.id} key={index}>
                        {item.tenChuyenDe}
                      </option>
                    ))}
                </select>
              </div>
            </div>

            <div className="uk-width-1-4@l uk-display-inline-block">
              <span className="uk-display-inline-block uk-width-1-4">
                T??? ng??y
              </span>
              <div className="uk-display-inline-block uk-width-3-4">
                <DatePicker
                  className="uk-select uk-width-1-1 black-border"
                  style={{
                    border: "solid 0.5px #666",
                  }}
                  selected={tuNgay}
                  onChange={(date) => {
                    setTuNgay(date);
                  }}
                  dateFormat="dd/MM/yyyy"
                />
              </div>
            </div>

            <div className="uk-width-1-4@l uk-display-inline-block">
              <span className="uk-display-inline-block uk-width-1-4">
                ?????n ng??y
              </span>
              <div className="uk-display-inline-block uk-width-3-4">
                <DatePicker
                  className="uk-select uk-width-1-1 black-border"
                  style={{
                    border: "solid 0.5px #666",
                  }}
                  selected={denNgay}
                  onChange={(date) => {
                    setDenNgay(date);
                  }}
                  dateFormat="dd/MM/yyyy"
                />
              </div>
            </div>
            <div className="uk-width-1-4@l uk-text-right">
              <Link
                to="./add"
                style={{ color: "#FFFFFF", textDecoration: "none" }}
              >
                <button
                  className="uk-button"
                  style={{
                    backgroundColor: "#32d296",
                    color: "#FFF",
                    width: "150px",
                  }}
                >
                  Th??m m???i
                </button>
              </Link>
            </div>
          </>
        )}
        isSearchEnabled={true}
        searchString={key}
        onSearchStringChanged={(e) => {
          setKey(e.target.value);
        }}
        onSearchButtonClicked={async () => {
          await getDeThi();
        }}
      />

      {loading && <div className="uk-flex uk-flex-center" uk-spinner=""></div>}
      <div className="uk-margin-top uk-overflow-auto">
        <table className="uk-table uk-table-striped uk-table-middle">
          <thead>
            <tr>
              <th className="uk-width-medium">M?? b??? ?????</th>
              <th className="uk-width-large">M?? ?????</th>
              <th className="uk-width-large">T??n ????? thi</th>
              <th className="uk-width-large">M??n h???c</th>
              <th className="uk-width-large">Ng??y t???o</th>
              <th className="uk-width-medium"></th>
            </tr>
          </thead>
          <tbody>
            {!loading &&
              deThis &&
              deThis.length > 0 &&
              deThis.map((item, index) => (
                <tr key={index}>
                  <td data-label="M?? b??? ?????">{item.maBoDe}</td>
                  <td data-label="M?? ?????">{item.maDe}</td>
                  <td data-label="T??n ????? thi">{item.tieuDe}</td>
                  <td data-label="M??n h???c">{item.tenChuyenDe}</td>
                  <td data-label="Ng??y t???o">
                    {moment(item.ngayTao).format("DD/MM/YYYY")}
                  </td>
                  <td data-label="T??y ch???nh">
                    <ul className="uk-subnav-pill">
                      <a
                        style={{
                          color: "#FFF",
                        }}
                      >
                        <span uk-icon="table"></span>
                      </a>
                      <div uk-dropdown="mode: click">
                        <ul className="uk-nav uk-dropdown-nav">
                          <li>
                            <a
                              onClick={() => {
                                taoBanSao(item.id);
                              }}
                            >
                              T???o b???n sao
                            </a>
                          </li>
                          <li>
                            <Link to={`${url}/exam/${item.id}`}>
                              Xem chi ti???t
                            </Link>
                          </li>
                          <li>
                            <a
                              onClick={() => {
                                xoaBoDe(item.maBoDe);
                              }}
                            >
                              X??a ????? thi
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
