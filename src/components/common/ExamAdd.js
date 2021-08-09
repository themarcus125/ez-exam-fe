import React, { useState, useEffect } from "react";
import { getAPIWithToken, postAPIWithToken } from "../../utils/api";
import { getToken } from "../../utils/auth";

let tenDeThi = "";
let maChuyenDe = 0;
let maDeThi = "ma de thi";
let thoiGianLam = 0;
let moTaDeThi = "";
let doKho = 1;
let tenBoDe = "";
let soDe = 1;
let danhSachCauHoi = [];
let maCauHoi = 1;
let maDapAn = 0;

const ExamAdd = () => {
  const [monHocs, setMonhocs] = useState([]);
  const [doKhos, setdoKhos] = useState([]);
  const [taoBoDe, setTaoBoDe] = useState(false);

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
    const cauHois = document.getElementById("cauHois");
    cauHois.insertAdjacentHTML(
      "beforeend",
      `<tr>
        <td>${maCauHoi}</td>
        <td><input
        className="uk-input"
        type="text"
      /></td>
        <td></td>
      </tr>
      <tr>
        <td>A</td>
        <td><input
        className="uk-input"
        type="text"
      /></td>
        <td><input class="uk-checkbox" type="checkbox"/>Đáp án</td>
      </tr>
      <tr>
        <td>B</td>
        <td><input
        className="uk-input"
        type="text"
      /></td>
        <td><input class="uk-checkbox" type="checkbox"/>Đáp án</td>
      </tr>
      <tr>
        <td>C</td>
        <td><input
        className="uk-input"
        type="text"
      /></td>
        <td><input class="uk-checkbox" type="checkbox"/>Đáp án</td>
      </tr>
      <tr>
        <td>D</td>
        <td><input
        className="uk-input"
        type="text"
      /></td>
        <td><input class="uk-checkbox" type="checkbox"/>Đáp án</td>
      </tr>`,
    );

    danhSachCauHoi.push({
      maCauHoi: maCauHoi++,
      dsDapAn: [
        {
          maDapAn: ++maDapAn,
          loaiDapAn: 0,
        },
        {
          maDapAn: ++maDapAn,
          loaiDapAn: 0,
        },
        {
          maDapAn: ++maDapAn,
          loaiDapAn: 0,
        },
        {
          maDapAn: ++maDapAn,
          loaiDapAn: 0,
        },
      ],
    });
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

      <form class="uk-form-horizontal uk-margin-large">
        <fieldset className="uk-fieldset">
          <div className="uk-margin">
            <label className="uk-form-label" for="form-horizontal-text">
              Tên đề thi
            </label>
            <div className="uk-form-controls">
              <input
                className="uk-input"
                type="text"
                onChange={(e) => {
                  tenDeThi = e.target.value;
                }}
              />
            </div>
          </div>

          <div className="uk-margin">
            <label className="uk-form-label" for="form-horizontal-text">
              Môn học
            </label>
            <div className="uk-form-controls">
              <select
                className="uk-select"
                onChange={(e) => {
                  maChuyenDe = e.target.value;
                }}
              >
                <option></option>
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
            <label className="uk-form-label" for="form-horizontal-text">
              Mức độ
            </label>
            <div className="uk-form-controls">
              <select
                className="uk-select"
                onChange={(e) => {
                  doKho = e.target.value;
                }}
              >
                {doKhos.map((item, index) => (
                  <option value={item.id} key={index}>
                    {item.ten}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="uk-margin">
            <label className="uk-form-label" for="form-horizontal-text">
              Thời gian làm bài
            </label>
            <div className="uk-form-controls">
              <input
                className="uk-input uk-form-width-small"
                type="number"
                min="1"
                onChange={(e) => {
                  thoiGianLam = e.target.value;
                }}
              />
              <span>phút</span>
            </div>
          </div>

          <div className="uk-margin">
            <label className="uk-form-label" for="form-horizontal-text">
              Ghi chú
            </label>
            <textarea
              className="uk-textarea"
              rows="5"
              placeholder="Textarea"
              onChange={(e) => {
                moTaDeThi = e.target.value;
              }}
            ></textarea>
          </div>

          <div className="uk-margin-top">
            <table className="uk-table uk-table-middle">
              <thead>
                <tr>
                  <th className="uk-table-shrink"></th>
                  <th className="uk-table-expand"></th>
                  <th className="uk-width-small"></th>
                </tr>
              </thead>
              <tbody id="cauHois"></tbody>
            </table>
          </div>

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
            <label className="uk-form-label" for="form-horizontal-text">
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
                  soDe = e.target.value;
                }}
              />
            </div>
          </div>

          <div className="uk-flex uk-flex-center">
            <div className="uk-card-body">
              <button
                className="uk-button"
                style={{ backgroundColor: "#32d296", color: "#FFF" }}
                onClick={(e) => {
                  e.preventDefault();
                  taoDeThi();
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
