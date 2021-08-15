import React, { useState, useEffect } from "react";
import {
  getAPIWithToken,
  postAPIWithToken,
  putAPIWithToken,
} from "../../utils/api";
import { getToken } from "../../utils/auth";
import LoadingOverlay from "./LoadingOverlay";

const ExamAdd = ({ examId }) => {
  const [loading, setLoading] = useState(true);
  const [monHocs, setMonhocs] = useState([]);
  const [tenDeThi, setTenDeThi] = useState("");
  const [maChuyenDe, setMaChuyenDe] = useState("");
  const [thoiGianLam, setThoiGianLam] = useState(0);
  const [moTaDeThi, setMoTaDeThi] = useState("");
  const [soLuongTracNghiem, setSoLuongTracNghiem] = useState(0);
  const [soLuongTuLuan, setSoLuongTuLuan] = useState(0);
  const [diemTracNghiem, setDiemTracNghiem] = useState(0);
  const [diemTuLuan, setDiemTuLuan] = useState(0);
  const [diemTungCauTracNghiem, setDiemTungCauTracNghiem] = useState(0);
  const [diemTungCauTuLuan, setDiemTungCauTuLuan] = useState(0);
  const [taoBoDe, setTaoBoDe] = useState(false);
  const [soDe, setSoDe] = useState(1);
  const [maCauHoi, setMaCauHoi] = useState(1);

  const [danhSachCauHoi, setDanhSachCauHoi] = useState([]);
  const [dsCauHoiTN, setDsCauHoiTN] = useState([]);
  const [dsCauHoiTL, setDsCauHoiTL] = useState([]);

  const [dsCauhoiDaLuu, setDsCauhoiDaLuu] = useState([]);
  const [coDoiCauHoi, setCoDoiCauHoi] = useState(false);

  const getMonHoc = async () => {
    const token = await getToken();
    const lstMonHoc = await getAPIWithToken("/chuyende/monhocnguoidung", token);
    setMonhocs(lstMonHoc.data);
  };

  const taoDeThi = async () => {
    const token = await getToken();

    const responseThemCauTN = await postAPIWithToken(
      "/cauhoi/themDanhSachCauHoi",
      {
        maChuyenDe: maChuyenDe,
        loaiCauHoi: 1,
        doKho: 1,
        dsCauHoi: dsCauHoiTN,
      },
      token,
    );

    const responseThemCauTL = await postAPIWithToken(
      "/cauhoi/themDanhSachCauHoi",
      {
        maChuyenDe: maChuyenDe,
        loaiCauHoi: 2,
        doKho: 1,
        dsCauHoi: dsCauHoiTL,
      },
      token,
    );

    const dataTN = await responseThemCauTN.json();
    const dataTL = await responseThemCauTL.json();

    for (const ch of dataTN.data) {
      const cauHoi = {
        maCauHoi: ch.id,
        loaiCauHoi: ch.loaiCauHoi,
        dsDapAn: [],
      };
      for (const da of ch.dsDapAn) {
        cauHoi.dsDapAn.push({
          maDapAn: da.id,
          loaiDapAn: da.loaiDapAn,
        });
      }
      danhSachCauHoi.push(cauHoi);
    }
    for (const ch of dataTL.data) {
      const cauHoi = {
        maCauHoi: ch.id,
        loaiCauHoi: ch.loaiCauHoi,
        dsDapAn: [],
      };
      danhSachCauHoi.push(cauHoi);
    }

    if (examId) {
      const responseCapNhat = await putAPIWithToken(
        `/dethi/suaDeThi`,
        {
          id: examId,
          tenDeThi: tenDeThi,
          maChuyenDe: maChuyenDe,
          thoiGianLam: thoiGianLam,
          moTaDeThi: moTaDeThi,
          soLuongTracNghiem: soLuongTracNghiem,
          soLuongTuLuan: soLuongTuLuan,
          diemTracNghiem: diemTracNghiem,
          diemTuLuan: diemTuLuan,
          diemTungCauTracNghiem: diemTungCauTracNghiem,
          diemTungCauTuLuan: diemTungCauTuLuan,
          coTaoBoDe: taoBoDe,
          coDoiCauHoi: coDoiCauHoi,
          soDe: soDe,
          danhSachCauHoi: danhSachCauHoi,
        },
        token,
      );
      if (responseCapNhat?.status === 200) {
        alert("Cập nhật đề thi thành công.");
      } else {
        alert("Đã xảy ra lỗi. Cập nhật đề thi thất bại.");
      }
    } else {
      const responseTaoDeThi = await postAPIWithToken(
        "/dethi/themDeThi",
        {
          tenDeThi: tenDeThi,
          maChuyenDe: maChuyenDe,
          thoiGianLam: thoiGianLam,
          moTaDeThi: moTaDeThi,
          soLuongTracNghiem: soLuongTracNghiem,
          soLuongTuLuan: soLuongTuLuan,
          diemTracNghiem: diemTracNghiem,
          diemTuLuan: diemTuLuan,
          diemTungCauTracNghiem: diemTungCauTracNghiem,
          diemTungCauTuLuan: diemTungCauTuLuan,
          coTaoBoDe: taoBoDe,
          soDe: soDe,
          danhSachCauHoi: danhSachCauHoi,
        },
        token,
      );
      if (responseTaoDeThi?.status === 200) {
        alert("Tạo đề thi thành công.");
      } else {
        alert("Đã xảy ra lỗi. Tạo đề thi thất bại.");
      }
    }
  };

  const setDsCauHoi = () => {
    setDsCauHoiTN([]);
    setDsCauHoiTL([]);
    const els = document.getElementById("cauhoi").children;

    for (const el of els) {
      if (el.getAttribute("name") != null) {
        const cauHoi = dsCauhoiDaLuu.find(
          (x) => x.maCauHoi === Number(el.getAttribute("name")),
        );
        danhSachCauHoi.push(cauHoi);
      } else {
        const cauHoi = {
          noiDung: el.children[0].children[1].value,
        };
        if (el.children[0].children[2].children[1].value === "1") {
          cauHoi.dsDapAn = [];
          for (const child of el.children[1].children) {
            const da = {
              noiDung: child.children[1].value,
              loaiDapAn: Number(child.children[0].checked),
            };
            cauHoi.dsDapAn.push(da);
          }
          dsCauHoiTN.push(cauHoi);
        } else {
          dsCauHoiTL.push(cauHoi);
        }
      }
    }
  };

  const themDapAn = (e) => {
    const ma = e.target.id.split("_")[1];

    const dsDapAn = document.getElementById(`dsdapan_${ma}`);

    dsDapAn.insertAdjacentHTML(
      "beforeend",
      `<div className="uk-width-1-1 uk-margin-small-bottom">          
          <input class="uk-radio" type="radio" name="${ma}" style="margin-left: 40px;"/>
          <input className="uk-input" type="text" style="width: 65%;"/>
      </div>`,
    );
  };

  const themCauHoi = (e) => {
    e.preventDefault();
    const el = document.getElementById("cauhoi");
    el.insertAdjacentHTML(
      "beforeend",
      `<div id="cauhoi_${maCauHoi}" style="margin-bottom: inherit;">
        <div className="uk-width-1-1 uk-margin-small-bottom">          
            <span style="width: 5%;text-align: right;"></span>
            <input className="uk-input" type="text" style="width: 70%;"/>
            <div style="display: inline;padding-left: 100px;">
              <span>Loại câu hỏi</span>
              <select id="loaicauhoi_${maCauHoi}" className="uk-select">
                <option value="1">Trắc nghiệm</option>
                <option value="2">Tự luận</option>
              </select>
              <span id="xoacauhoi_${maCauHoi}" style="margin-left: 35px;color: red;cursor: pointer;"><span uk-icon="trash" style="pointer-events: none;"></span></span>
            </div>
        </div>
        <div id="dsdapan_${maCauHoi}">
          <div className="uk-width-1-1 uk-margin-small-bottom">          
              <input class="uk-radio" type="radio" name="${maCauHoi}" style="margin-left: 40px;"/>
              <input className="uk-input" type="text" style="width: 65%;"/>
          </div>
          <div className="uk-width-1-1 uk-margin-small-bottom">          
              <input class="uk-radio" type="radio" name="${maCauHoi}" style="margin-left: 40px;"/>
              <input className="uk-input" type="text" style="width: 65%;"/>
          </div>
        </div>
        <button id="themdapan_${maCauHoi}" type="button" style="margin-left: 60px;cursor: pointer;">
          Thêm đáp án
        </button>
      </div>`,
    );

    const btnThem = document.getElementById(`themdapan_${maCauHoi}`);
    btnThem.addEventListener("click", themDapAn);

    const btnXoa = document.getElementById(`xoacauhoi_${maCauHoi}`);
    btnXoa.addEventListener("click", xoaCauHoi);

    const ddlLoai = document.getElementById(`loaicauhoi_${maCauHoi}`);
    ddlLoai.addEventListener("change", thayDoiLoaiCauHoi);

    thayDoiSoLuong();

    setMaCauHoi(maCauHoi + 1);
    if (coDoiCauHoi === false) {
      setCoDoiCauHoi(true);
    }
  };

  const xoaCauHoi = (e) => {
    const ma = e.target.id.split("_")[1];
    document.getElementById(`cauhoi_${ma}`).remove();
    thayDoiSoLuong();

    if (coDoiCauHoi === false) {
      setCoDoiCauHoi(true);
    }
  };

  const thayDoiLoaiCauHoi = (e) => {
    const ma = e.target.id.split("_")[1];
    const dsDapAn = document.getElementById(`dsdapan_${ma}`);
    const btnThem = document.getElementById(`themdapan_${ma}`);

    if (e.target.value === "1") {
      dsDapAn.style.display = "";
      btnThem.style.display = "";
    } else {
      dsDapAn.style.display = "none";
      btnThem.style.display = "none";
    }

    thayDoiSoLuong();
  };

  const thayDoiSoLuong = () => {
    let label = 1;
    let slTracNghiem = 0;
    let slTuLuan = 0;

    const els = document.getElementById("cauhoi").children;
    for (const el of els) {
      const ch = el.children[0];
      ch.children[0].textContent = label;
      if (ch.children[2].children[1].value === "1") {
        slTracNghiem++;
      } else {
        slTuLuan++;
      }
      label++;
    }

    const diemTN = document.getElementById("diemtracnghiem").value;
    const diemTL = document.getElementById("diemtuluan").value;
    setSoLuongTracNghiem(slTracNghiem);
    setSoLuongTuLuan(slTuLuan);
    setDiemTungCauTracNghiem(slTracNghiem != 0 ? diemTN / slTracNghiem : 0);
    setDiemTungCauTuLuan(slTuLuan != 0 ? diemTL / slTuLuan : 0);
  };

  const getChiTietDeThi = async () => {
    const token = await getToken();

    const deThi = await getAPIWithToken(
      `/dethi/layChiTietDeThi?id=${examId}`,
      token,
    );

    const data = deThi?.data;
    setTenDeThi(data.tieuDe);
    setThoiGianLam(data.thoiGianLam);
    setMoTaDeThi(data.moTaDeThi);
    setSoLuongTracNghiem(data.soLuongTracNghiem);
    setSoLuongTuLuan(data.soLuongTuLuan);
    setDiemTracNghiem(data.diemTracNghiem);
    setDiemTuLuan(data.diemTuLuan);
    setDiemTungCauTracNghiem(data.diemTungCauTracNghiem);
    setDiemTungCauTuLuan(data.diemTungCauTuLuan);
    setMaCauHoi(data.dsCauhoi.length + 1);
    hienThiCauHoi(data.dsCauhoi);

    for (const ch of data.dsCauhoi) {
      const cauHoi = {
        maCauHoi: ch.id,
        loaiCauHoi: ch.loaiCauHoi,
        dsDapAn: [],
      };
      if (ch.dsDapAn.length > 0) {
        for (const da of ch.dsDapAn) {
          cauHoi.dsDapAn.push({ maDapAn: da.id, loaiDapAn: da.loaiDapAn });
        }
      }
      dsCauhoiDaLuu.push(cauHoi);
    }
  };

  const hienThiCauHoi = (dsCauHoi) => {
    const el = document.getElementById("cauhoi");
    let maCauHoi = 1;
    for (const ch of dsCauHoi) {
      el.insertAdjacentHTML(
        "beforeend",
        `<div id="cauhoi_${maCauHoi}" style="margin-bottom: inherit;" name="${
          ch.id
        }">
        <div className="uk-width-1-1 uk-margin-small-bottom">
            <span style="width: 5%;text-align: right;">${maCauHoi}</span>
            <input className="uk-input" type="text" style="width: 70%;" value="${
              ch.noiDung
            }" disabled/>
            <div style="display: inline;padding-left: 100px;">
              <span>Loại câu hỏi</span>
              <select className="uk-select" disabled>
                <option value="${ch.loaiCauHoi}">${
          ch.loaiCauHoi === 1 ? "Trắc nghiệm" : "Tự luận"
        }</option>
              </select>
              <span id="xoacauhoi_${maCauHoi}" style="margin-left: 35px;color: red;cursor: pointer;"><span uk-icon="trash" style="pointer-events: none;"></span></span>
            </div>
        </div>
        <div id="dsdapan_${maCauHoi}">
        </div>
      </div>`,
      );

      if (ch.dsDapAn.length > 0) {
        const dsDA = document.getElementById(`dsdapan_${maCauHoi}`);
        for (const da of ch.dsDapAn) {
          dsDA.insertAdjacentHTML(
            "beforeend",
            `<div className="uk-width-1-1 uk-margin-small-bottom">
                <input class="uk-radio" type="radio" style="margin-left: 40px;" disabled ${
                  da.loaiDapAn === 1 ? "checked" : ""
                }/>
                <input className="uk-input" type="text" style="width: 65%;" value="${
                  da.noiDung
                }" disabled/>
            </div>`,
          );
        }
      }

      const btnXoa = document.getElementById(`xoacauhoi_${maCauHoi}`);
      btnXoa.addEventListener("click", xoaCauHoi);

      maCauHoi++;
    }
  };

  useEffect(async () => {
    await getMonHoc();
    if (examId) {
      await getChiTietDeThi();
    }
    setLoading(false);
  }, []);

  return (
    <>
      <div className="uk-padding uk-padding-remove-top uk-padding-remove-bottom uk-height-1-1">
        <p className="uk-text-large uk-text-center uk-text-bold uk-text-success">
          {examId ? "Cập nhật đề thi" : "Tạo đề thi"}
        </p>

        <form className="uk-form-horizontal uk-margin-large">
          <fieldset className="uk-fieldset">
            <div className="uk-margin">
              <label className="uk-form-label" htmlFor="form-horizontal-text">
                Tên đề thi
              </label>
              <div className="uk-form-controls">
                <input
                  className="uk-input"
                  type="text"
                  value={tenDeThi}
                  onChange={(e) => {
                    setTenDeThi(e.target.value);
                  }}
                />
              </div>
            </div>

            <div className="uk-margin">
              <label className="uk-form-label" htmlFor="form-horizontal-text">
                Môn học
              </label>
              <div className="uk-form-controls">
                <select
                  className="uk-select"
                  value={maChuyenDe}
                  onChange={(e) => {
                    setMaChuyenDe(e.target.value);
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

            <div className="uk-margin">
              <label className="uk-form-label" htmlFor="form-horizontal-text">
                Thời gian làm bài
              </label>
              <div className="uk-form-controls">
                <input
                  className="uk-input uk-form-width-small"
                  type="number"
                  min="1"
                  value={thoiGianLam}
                  onChange={(e) => {
                    setThoiGianLam(e.target.value);
                  }}
                />
                <span style={{ marginLeft: "15px" }}>phút</span>
              </div>
            </div>

            <div className="uk-margin">
              <label className="uk-form-label" htmlFor="form-horizontal-text">
                Ghi chú
              </label>
              <textarea
                className="uk-textarea"
                rows="5"
                value={moTaDeThi}
                onChange={(e) => {
                  setMoTaDeThi(e.target.value);
                }}
              ></textarea>
            </div>

            <div id="cauhoi" className="uk-margin"></div>

            <div className="uk-flex uk-flex-center">
              <div className="uk-card-body">
                <button
                  className="uk-button"
                  style={{ backgroundColor: "#32d296", color: "#FFF" }}
                  onClick={(e) => {
                    themCauHoi(e);
                  }}
                >
                  Thêm mới câu hỏi
                </button>
              </div>

              <div className="uk-card-body uk-margin-left">
                <button
                  className="uk-button"
                  style={{ backgroundColor: "#32d296", color: "#FFF" }}
                >
                  Chọn câu hỏi có sẵn
                </button>
              </div>
            </div>

            <div className="uk-flex uk-flex-row uk-flex-between uk-margin-bottom">
              <div className="uk-width-1-4@s uk-display-inline-block">
                <span className="uk-display-inline-block uk-width-3-5">
                  Số câu hỏi trắc nghiệm
                </span>
                <div
                  className="uk-display-inline-block uk-width-1-5"
                  style={{ marginLeft: "10px" }}
                >
                  <span className="uk-display-inline-block uk-width-1-5">
                    {soLuongTracNghiem}
                  </span>
                </div>
              </div>

              <div className="uk-width-1-4@s uk-display-inline-block">
                <span className="uk-display-inline-block uk-width-2-5">
                  Nhập điểm
                </span>
                <div className="uk-display-inline-block uk-width-2-5">
                  <input
                    id="diemtracnghiem"
                    className="uk-input uk-form-width-small"
                    type="number"
                    min="0"
                    disabled={!(soLuongTracNghiem != 0)}
                    value={diemTracNghiem}
                    onChange={(e) => {
                      setDiemTracNghiem(e.target.value);
                      setDiemTungCauTracNghiem(
                        e.target.value / soLuongTracNghiem,
                      );
                    }}
                  />
                </div>
              </div>

              <div className="uk-width-1-4@s uk-display-inline-block">
                <span className="uk-display-inline-block uk-width-3-5">
                  Điểm từng câu
                </span>
                <div
                  className="uk-display-inline-block uk-width-1-5"
                  style={{ marginLeft: "-50px" }}
                >
                  <span className="uk-display-inline-block ">
                    {diemTungCauTracNghiem}
                  </span>
                </div>
              </div>
            </div>

            <div className="uk-flex uk-flex-row uk-flex-between uk-margin-bottom">
              <div className="uk-width-1-4@s uk-display-inline-block">
                <span className="uk-display-inline-block uk-width-3-5">
                  Số câu hỏi tự luận
                </span>
                <div
                  className="uk-display-inline-block uk-width-1-5"
                  style={{ marginLeft: "10px" }}
                >
                  <span className="uk-display-inline-block uk-width-1-5">
                    {soLuongTuLuan}
                  </span>
                </div>
              </div>

              <div className="uk-width-1-4@s uk-display-inline-block">
                <span className="uk-display-inline-block uk-width-2-5">
                  Nhập điểm
                </span>
                <div className="uk-display-inline-block uk-width-2-5">
                  <input
                    id="diemtuluan"
                    className="uk-input uk-form-width-small"
                    type="number"
                    min="0"
                    disabled={!(soLuongTuLuan != 0)}
                    value={diemTuLuan}
                    onChange={(e) => {
                      setDiemTuLuan(e.target.value);
                      setDiemTungCauTuLuan(e.target.value / soLuongTuLuan);
                    }}
                  />
                </div>
              </div>

              <div className="uk-width-1-4@s uk-display-inline-block">
                <span className="uk-display-inline-block uk-width-3-5">
                  Điểm từng câu
                </span>
                <div
                  className="uk-display-inline-block uk-width-1-5"
                  style={{ marginLeft: "-50px" }}
                >
                  <span className="uk-display-inline-block ">
                    {diemTungCauTuLuan}
                  </span>
                </div>
              </div>
            </div>

            <div className="uk-margin uk-grid-small uk-child-width-auto uk-grid">
              <label>
                <input
                  className="uk-checkbox"
                  type="checkbox"
                  value={taoBoDe}
                  onChange={(e) => setTaoBoDe(e.target.checked)}
                />{" "}
                Có tạo bộ đề không?
              </label>
            </div>

            <div className="uk-margin">
              <label className="uk-form-label" htmlFor="form-horizontal-text">
                Số lượng
              </label>
              <div className="uk-form-controls">
                <input
                  className="uk-input uk-form-width-small"
                  type="number"
                  min="1"
                  disabled={!taoBoDe}
                  value={soDe}
                  onChange={(e) => {
                    setSoDe(e.target.value);
                  }}
                />
              </div>
            </div>

            <div className="uk-flex uk-flex-center">
              <div className="uk-card-body">
                <button
                  className="uk-button"
                  style={{ backgroundColor: "#32d296", color: "#FFF" }}
                  onClick={async (e) => {
                    e.preventDefault();
                    setDsCauHoi();
                    await taoDeThi();
                  }}
                >
                  {examId ? "Cập nhật" : "Lưu"}
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

export default ExamAdd;
