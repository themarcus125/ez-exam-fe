import React, { useState, useEffect } from "react";
import { getAPIWithToken, postAPIWithToken } from "../../utils/api";
import { getToken } from "../../utils/auth";

const ExamAdd = () => {
  const [monHocs, setMonhocs] = useState([]);
  const [doKhos, setdoKhos] = useState([]);
  const [taoBoDe, setTaoBoDe] = useState(false);

  let tenDeThi = "";
  let maChuyenDe = null;
  let maDeThi = "";
  let thoiGianLam = null;
  let moTaDeThi = "";
  let doKho = 1;
  let tenBoDe = "";
  let soDe = null;
  let danhSachCauHoi = [];

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
        tenDeThi: "TEN DE THI 5555",
        maChuyenDe: 1,
        maDeThi: "55TT",
        thoiGianLam: 120,
        moTaDeThi: "DAY LA MO TA DE THI 5555",
        doKho: 1,
        taoBoDe: true,
        tenBoDe: "BO DE SO 555",
        soDe: 2,
        danhSachCauHoi: [
          {
            maCauHoi: 1,
            dsDapAn: [
              {
                maDapAn: 1,
                loaiDapAn: 0,
              },
              {
                maDapAn: 2,
                loaiDapAn: 0,
              },
              {
                maDapAn: 3,
                loaiDapAn: 0,
              },
              {
                maDapAn: 4,
                loaiDapAn: 1,
              },
            ],
          },
        ],
      },
      token,
    );

    if (response?.status === 200) {
      alert("Tạo đề thi thành công.");
    } else {
      alert("Đã xảy ra lỗi. Tạo đề thi thất bại.");
    }
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

          <div className="uk-flex uk-flex-center">
            <div className="uk-card-body">
              <button
                className="uk-button"
                style={{ backgroundColor: "#32d296", color: "#FFF" }}
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
              Nhập mã bộ đề
            </label>
            <div className="uk-form-controls">
              <input
                className="uk-input"
                type="text"
                disabled={!taoBoDe}
                onChange={(e) => {
                  tenBoDe = e.target.value;
                }}
              />
            </div>
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
