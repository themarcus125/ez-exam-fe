import React, { useState, useEffect } from "react";
import { getAPIWithToken, postAPIWithToken } from "../../utils/api";
import { getToken } from "../../utils/auth";

const ExamAdd = () => {
  const [monHocs, setMonhocs] = useState([]);
  const [doKhos, setdoKhos] = useState([]);
  const [tenDeThi, setTenDeThi] = useState("");
  const [maChuyenDe, setMaChuyenDe] = useState("");
  const [maDeThi, setMaDeThi] = useState("");
  const [thoiGianLam, setThoiGianLam] = useState(0);
  const [moTaDeThi, setMoTaDeThi] = useState("");
  const [doKho, setDoKho] = useState("");
  const [taoBoDe, setTaoBoDe] = useState(false);
  const [tenBoDe, setTenBoDe] = useState("");
  const [soDe, setSoDe] = useState(1);
  const [danhSachCauHoi, setDanhSachCauHoi] = useState([]);
  let maCauHoi = 1;

  const getMonHoc = async () => {
    const token = await getToken();
    const lstMonHoc = await getAPIWithToken("/chuyende/monhocnguoidung", token);
    setMonhocs(lstMonHoc.data);
  };

  const getDoKho = async () => {
    const token = await getToken();
    const lstDoKho = await getAPIWithToken("/dokho/layTatCaDoKho", token);
    setdoKhos(lstDoKho.data);
  };

  const taoDeThi = async () => {
    const els = document.getElementById("cauhoi").children;
    let maDapAn = 1;
    for (const el of els) {
      const cauHoi = {
        maCauHoi: 0,
        dsDapAn: [],
      };
      const el1 = el.children;
      const arr = Array.from(el1);
      const ch = arr.shift();
      cauHoi.maCauHoi = Number(ch.children[0].textContent);
      // console.log(ch.children[1].value);
      for (const da of arr) {
        cauHoi.dsDapAn.push({
          maDapAn: maDapAn,
          loaiDapAn: Number(da.children[0].checked),
        });
        // console.log(da.children[1].value);
        maDapAn++;
      }

      danhSachCauHoi.push(cauHoi);
    }

    const token = await getToken();
    const response = await postAPIWithToken(
      "/dethi/themDeThi",
      {
        tenDeThi: tenDeThi,
        maChuyenDe: maChuyenDe,
        maDeThi: maDeThi,
        thoiGianLam: thoiGianLam,
        moTaDeThi: moTaDeThi,
        doKho: doKho,
        taoBoDe: taoBoDe,
        tenBoDe: tenBoDe,
        soDe: soDe,
        danhSachCauHoi: danhSachCauHoi,
      },
      token,
    );
    if (response?.status === 200) {
      alert("Tạo đề thi thành công.");
    } else {
      alert("Đã xảy ra lỗi. Tạo đề thi thất bại.");
    }
  };

  const themCauHoi = (e) => {
    e.preventDefault();
    const el = document.getElementById("cauhoi");
    el.insertAdjacentHTML(
      "beforeend",
      `<div style="margin-bottom: inherit;">
        <div className="uk-width-1-1 uk-margin-small-bottom">          
            <span style="width: 5%;text-align: right;">${maCauHoi}</span>
            <input className="uk-input" type="text" style="width: 95%;"/>
        </div>
        <div className="uk-width-1-1 uk-margin-small-bottom">          
            <input class="uk-radio" type="radio" name="${maCauHoi}" style="margin-left: 40px;"/>
            <input className="uk-input" type="text" style="width: 85%;"/>
        </div>
        <div className="uk-width-1-1 uk-margin-small-bottom">          
            <input class="uk-radio" type="radio" name="${maCauHoi}" style="margin-left: 40px;"/>
            <input className="uk-input" type="text" style="width: 85%;"/>
        </div>
        <div className="uk-width-1-1 uk-margin-small-bottom">          
            <input class="uk-radio" type="radio" name="${maCauHoi}" style="margin-left: 40px;"/>
            <input className="uk-input" type="text" style="width: 85%;"/>
        </div>
        <div className="uk-width-1-1 uk-margin-small-bottom">          
            <input class="uk-radio" type="radio" name="${maCauHoi}" style="margin-left: 40px;"/>
            <input className="uk-input" type="text" style="width: 85%;"/>
        </div>
      </div>`,
    );
    maCauHoi++;
  };

  useEffect(() => {
    getMonHoc();
    getDoKho();
  }, []);

  return (
    <div className="uk-padding uk-padding-remove-top uk-padding-remove-bottom uk-height-1-1">
      <p className="uk-text-large uk-text-center uk-text-bold uk-text-success">
        Tạo đề thi
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
              Mức độ
            </label>
            <div className="uk-form-controls">
              <select
                className="uk-select"
                value={doKho}
                onChange={(e) => {
                  setDoKho(e.target.value);
                }}
              >
                <option disabled></option>
                {doKhos.map((item, index) => (
                  <option value={item.id} key={index}>
                    {item.ten}
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
                onChange={(e) => {
                  setThoiGianLam(e.target.value);
                }}
              />
              <span>phút</span>
            </div>
          </div>

          <div className="uk-margin">
            <label className="uk-form-label" htmlFor="form-horizontal-text">
              Ghi chú
            </label>
            <textarea
              className="uk-textarea"
              rows="5"
              placeholder="Textarea"
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
                <span className="uk-display-inline-block uk-width-1-5">0</span>
              </div>
            </div>

            <div className="uk-width-1-4@s uk-display-inline-block">
              <span className="uk-display-inline-block uk-width-2-5">
                Nhập điểm
              </span>
              <div className="uk-display-inline-block uk-width-2-5">
                <input
                  className="uk-input uk-form-width-small"
                  type="number"
                  min="0"
                  placeholder="0"
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
                <span className="uk-display-inline-block ">0</span>
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
                <span className="uk-display-inline-block uk-width-1-5">0</span>
              </div>
            </div>

            <div className="uk-width-1-4@s uk-display-inline-block">
              <span className="uk-display-inline-block uk-width-2-5">
                Nhập điểm
              </span>
              <div className="uk-display-inline-block uk-width-2-5">
                <input
                  className="uk-input uk-form-width-small"
                  type="number"
                  min="0"
                  placeholder="0"
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
                <span className="uk-display-inline-block ">0</span>
              </div>
            </div>
          </div>

          <div className="uk-margin uk-grid-small uk-child-width-auto uk-grid">
            <label>
              <input
                className="uk-checkbox"
                type="checkbox"
                onChange={(e) => setTaoBoDe(e.target.checked)}
              />{" "}
              Có tạo bộ đề không?
            </label>
          </div>

          <div className="uk-margin">
            <label className="uk-form-label" htmlFor="form-horizontal-text">
              Nhập mã bộ đề
            </label>
            <div className="uk-form-controls">
              <input
                className="uk-input"
                type="text"
                disabled={!taoBoDe}
                onChange={(e) => {
                  setMaDeThi(e.target.value);
                }}
              />
            </div>
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
                placeholder="1"
                disabled={!taoBoDe}
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
                  await taoDeThi();
                }}
              >
                Lưu
              </button>
            </div>
          </div>
        </fieldset>
      </form>
    </div>
  );
};

export default ExamAdd;
