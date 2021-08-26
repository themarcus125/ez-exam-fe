import React, { useState, useEffect } from "react";

import { navigate } from "../../utils/common";
import {
  postAPIFormWithToken,
  getAPIWithToken,
  putAPIWithToken,
} from "../../utils/api";
import { getToken } from "../../utils/auth";
import { userStatus } from "../../utils/constants";
import LoadingOverlay from "../common/LoadingOverlay";

const AdminAccountForm = ({ userId }) => {
  const [isLoading, setisLoading] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState();
  const [role, setRole] = useState(2);
  const [status, setStatus] = useState(userStatus.ACTIVE);
  const [loading, setLoading] = useState(false);

  useEffect(async () => {
    // TODO: Get user info
    if (userId) {
      await getUser();
    }
    setisLoading(false);
  }, []);

  const getUser = async () => {
    setLoading(true);
    const token = await getToken();
    const response = await getAPIWithToken(`/users/${userId}`, token);
    setUsername(response.data.tenDangNhap);
    setName(response.data.tenNguoiDung);
    setStatus(response.data.trangThai);
    setEmail(response.data.email ?? "");
    setRole(response.data.phan_quyen?.[0]?.id ?? 2);
    setLoading(false);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const token = await getToken();

    if (userId) {
      //Update
      try {
        await putAPIWithToken(
          `/users/${userId}`,
          {
            tenNguoiDung: name,
            trangThai: status,
            email,
          },
          token,
        );
        alert("Chỉnh sửa tài khoản thành công");
      } catch (error) {
        alert("Đã xảy ra lỗi không thể chỉnh sửa tài khoản");
      }
    } else {
      // Add
      try {
        await postAPIFormWithToken(
          "/register",
          {
            tenNguoiDung: name,
            trangThai: status,
            loai: role,
            email,
          },
          token,
        );
        alert("Thêm tài khoản thành công");
      } catch (error) {
        alert("Đã xảy ra lỗi không thể thêm tài khoản");
      }
    }
    navigate("../");
  };

  const onResetPassword = async () => {
    try {
      await postAPIWithToken(
        "/users/reset-password",
        {
          id: userId,
        },
        token,
      );
      alert("Reset mật khẩu thành công");
    } catch (error) {
      alert("Đã xảy ra lỗi không thể reset mật khẩu");
    }
  };

  return (
    <div className="uk-flex uk-margin-top uk-flex-center">
      <div className="uk-width-1-2@m uk-background-default uk-border-rounded uk-padding">
        <form className="uk-form" onSubmit={onSubmit}>
          <p className="title uk-text-large uk-text-uppercase uk-text-bold uk-text-center uk-text-success">
            {`${userId ? "Sửa thông tin" : "Tạo"} tài khoản`}
          </p>

          {userId && (
            <div className="uk-margin uk-flex uk-flex-row uk-flex-middle">
              <label
                className="uk-form-label uk-width-1-5"
                htmlFor="form-stacked-text"
              >
                Mã tài khoản
              </label>
              <div className="uk-form-controls uk-display-inline-block uk-width-4-5">
                <input
                  className="uk-input"
                  value={username}
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
              Họ tên
            </label>
            <div className="uk-form-controls uk-display-inline-block uk-width-4-5">
              <input
                className="uk-input"
                value={name}
                type="text"
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="uk-margin uk-flex uk-flex-row uk-flex-middle">
            <label
              className="uk-form-label uk-width-1-5"
              htmlFor="form-stacked-text"
            >
              Email
            </label>
            <div className="uk-form-controls uk-display-inline-block uk-width-4-5">
              <input
                className="uk-input"
                value={email}
                type="text"
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="uk-margin uk-flex uk-flex-row uk-flex-middle">
            <label
              className="uk-form-label uk-width-1-5"
              htmlFor="form-stacked-select"
            >
              Loại tài khoản
            </label>
            <div className="uk-form-controls uk-display-inline-block uk-width-4-5">
              <select
                className="uk-select"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                disabled={!!userId}
              >
                <option value={3}>Học sinh</option>
                <option value={2}>Giáo viên</option>
              </select>
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
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                <option value={0}>Đang hoạt động</option>
                <option value={1}>Ngừng hoạt động</option>
              </select>
            </div>
          </div>

          {!userId && (
            <div className="uk-flex uk-flex-center uk-text-center uk-margin-bottom uk-text-primary">
              <small>
                Lưu ý: Mã tài khoản và mật khẩu sẽ được gửi tới email của người
                dùng
              </small>
            </div>
          )}

          <div className="uk-flex uk-flex-center">
            {userId && (
              <button
                type="button"
                className={`uk-button uk-margin-top uk-margin-right ${
                  loading ? "uk-disabled" : ""
                }`}
                style={{ backgroundColor: "#32d296", color: "#FFF" }}
                onClick={onResetPassword}
              >
                Reset mật khẩu
              </button>
            )}
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
      <LoadingOverlay isLoading={isLoading} />
    </div>
  );
};

export default AdminAccountForm;
