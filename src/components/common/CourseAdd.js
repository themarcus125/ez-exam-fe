import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import {
  getAPIWithToken,
  postAPIWithToken,
  putAPIWithToken,
} from "../../utils/api";
import { getToken } from "../../utils/auth";
import LoadingOverlay from "./LoadingOverlay";

const CourseAdd = ({ courseId }) => {
  const [maChuyenDe, setMaChuyenDe] = useState("");
  const [tenChuyenDe, setTenChuyenDe] = useState("");
  const [trangThai, setTrangThai] = useState(0);

  const [loading, setLoading] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    const token = await getToken();
    if (courseId) {
      try {
        await putAPIWithToken(
          "/chuyende/suaChuyenDe",
          {
            id: courseId,
            tenChuyenDe: tenChuyenDe,
            trangThai: trangThai,
          },
          token,
        );
        toast.success("Chỉnh sửa môn học thành công");
      } catch (error) {
        toast.error("Đã xảy ra lỗi. Không thể chỉnh sửa môn học");
      }
    } else {
      try {
        await postAPIWithToken(
          "/chuyende/themChuyenDe",
          {
            tenChuyenDe: tenChuyenDe,
            trangThai: trangThai,
          },
          token,
        );
        toast.success("Thêm môn học thành công");
      } catch (error) {
        toast.error("Đã xảy ra lỗi. Không thể thêm môn học");
      }
    }
  };

  const getMonHoc = async () => {
    setLoading(true);

    const token = await getToken();
    const response = await getAPIWithToken(
      `/chuyende/layChiTietChuyenDe?id=${courseId}`,
      token,
    );

    setMaChuyenDe(response.data.maChuyenDe);
    setTenChuyenDe(response.data.tenChuyenDe);
    setTrangThai(response.data.trangThai);

    setLoading(false);
  };

  useEffect(async () => {
    if (courseId) {
      await getMonHoc();
    }
  }, []);

  return (
    <div className="uk-flex uk-margin-top uk-flex-center">
      <div className="uk-width-1-2@m uk-background-default uk-border-rounded uk-padding">
        <form className="uk-form" onSubmit={onSubmit}>
          <p className="uk-text-large uk-text-bold uk-text-center uk-text-success">
            {`${courseId ? "SỬA THÔNG TIN" : "THÊM MỚI"} MÔN HỌC`}
          </p>

          <ToastContainer
            autoClose={3000}
            position={toast.POSITION.TOP_RIGHT}
          />

          {courseId && (
            <div className="uk-margin uk-flex uk-flex-row uk-flex-middle">
              <label
                className="uk-form-label uk-width-1-5"
                htmlFor="form-stacked-text"
              >
                Mã môn học
              </label>
              <div className="uk-form-controls uk-display-inline-block uk-width-4-5">
                <input
                  className="uk-input"
                  value={maChuyenDe}
                  type="text"
                  disabled
                />
              </div>
            </div>
          )}

          <div className="uk-margin uk-flex uk-flex-row uk-flex-middle">
            <label
              className="uk-form-label uk-width-1-5"
              htmlFor="form-stacked-text"
            >
              Tên môn học
            </label>
            <div className="uk-form-controls uk-display-inline-block uk-width-4-5">
              <input
                className="uk-input"
                value={tenChuyenDe}
                type="text"
                onChange={(e) => setTenChuyenDe(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="uk-margin uk-flex uk-flex-row uk-flex-middle">
            <label
              className="uk-form-label uk-width-1-5"
              htmlFor="form-stacked-select"
            >
              Trạng thái
            </label>
            <div className="uk-form-controls uk-display-inline-block uk-width-4-5">
              <select
                className="uk-select"
                value={trangThai}
                onChange={(e) => setTrangThai(e.target.value)}
              >
                <option value={0}>Đang sử dụng</option>
                <option value={1}>Không sử dụng</option>
              </select>
            </div>
          </div>

          <div className="uk-flex uk-flex-center">
            <button
              type="submit"
              className={`uk-button uk-margin-top ${
                loading ? "uk-disabled" : ""
              }`}
              style={{ backgroundColor: "#32d296", color: "#FFF" }}
            >
              Lưu
            </button>
          </div>
        </form>
      </div>
      <LoadingOverlay isLoading={loading} />
    </div>
  );
};

export default CourseAdd;
