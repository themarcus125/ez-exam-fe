import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";

import { navigate } from "../../utils/common";
import { getAPIWithToken, postAPIWithToken } from "../../utils/api";
import { getToken, getUser } from "../../utils/auth";
import { userStatus } from "../../utils/constants";
import LoadingOverlay from "../common/LoadingOverlay";

const userRoles = { 1: "Admin", 2: "Giáo viên", 3: "Học sinh" };
const userStatuses = { 0: "Đang hoạt động", 1: "Ngừng hoạt động" };

const AccountInfo = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState(2);
  const [status, setStatus] = useState(userStatus.ACTIVE);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const loadUserInfo = async () => {
    setLoading(true);
    const token = await getToken();
    const userId = getUser()?.id;
    if (!userId) {
      alert("Xin vui lòng đăng xuất và đăng nhập lại");
      navigate("../");
      return;
    }
    const response = await getAPIWithToken(`/users/${userId}`, token);
    setName(response.data.tenNguoiDung);
    setStatus(response.data.trangThai);
    setEmail(response.data.email ?? "");
    setRole(response.data.phan_quyen?.[0]?.id ?? 2);
    setLoading(false);
  };

  useEffect(() => {
    loadUserInfo();
  }, []);

  const onChangePassword = async (e) => {
    e.preventDefault();
    if (newPassword.length <= 8) {
      toast.error("Mật khẩu không hợp lệ");
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.error("Mật khẩu mới phải giống nhau");
      return;
    }

    const token = await getToken();
    try {
      const response = await postAPIWithToken(
        "/users/change-password",
        {
          currentPassword,
          newPassword,
          newPassword_confirmation: confirmPassword,
        },
        token,
      );

      const res = await response.json();
      if (res.message === "error") {
        toast.error(
          res.error === "Password doest not match"
            ? "Mật khẩu không đúng"
            : res.error,
        );
        return;
      }

      toast.success("Đổi mật khẩu thành công");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (error) {
      toast.error("Đã xảy ra lỗi không thể đổi mật khẩu");
    }
  };

  return (
    <div>
      <p className="title uk-text-large uk-text-uppercase uk-text-bold uk-text-center uk-text-success">
        Thông tin tài khoản
      </p>
      <ToastContainer autoClose={3000} position={toast.POSITION.TOP_RIGHT} />
      <div className="uk-flex uk-flex-center">
        <table className="uk-table-small">
          <thead></thead>
          <tbody>
            <tr>
              <td>
                <span>Họ tên</span>
              </td>
              <td>
                <span>{name}</span>
              </td>
            </tr>
            <tr>
              <td>
                <span>Email</span>
              </td>
              <td>
                <span>{email}</span>
              </td>
            </tr>
            <tr>
              <td>
                <span>Loại tài khoản</span>
              </td>
              <td>
                <span>{userRoles[role]}</span>
              </td>
            </tr>
            <tr>
              <td>
                <span>Trạng thái</span>
              </td>
              <td>
                <span>{userStatuses[status]}</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="uk-flex uk-flex-center">
        <div className="uk-width-1-2@m uk-background-default uk-border-rounded uk-padding">
          <form className="uk-form" onSubmit={onChangePassword}>
            <p className="title uk-text-large uk-text-uppercase uk-text-bold uk-text-center uk-text-success">
              Đổi mật khẩu
            </p>
            <div className="uk-margin uk-flex uk-flex-row uk-flex-middle">
              <label
                className="uk-form-label uk-width-2-5"
                htmlFor="form-stacked-text"
              >
                Mật khẩu hiện tại
              </label>
              <div className="uk-form-controls uk-display-inline-block uk-width-3-5">
                <input
                  className="uk-input"
                  type="password"
                  value={currentPassword}
                  required
                  onChange={(e) => setCurrentPassword(e.target.value)}
                />
              </div>
            </div>
            <div className="uk-margin uk-flex uk-flex-row uk-flex-middle">
              <label
                className="uk-form-label uk-width-2-5"
                htmlFor="form-stacked-text"
              >
                Mật khẩu mới
              </label>
              <div className="uk-form-controls uk-display-inline-block uk-width-3-5">
                <input
                  className="uk-input"
                  type="password"
                  value={newPassword}
                  required
                  onChange={(e) => setNewPassword(e.target.value)}
                />
              </div>
            </div>
            <div className="uk-margin uk-flex uk-flex-row uk-flex-middle">
              <label
                className="uk-form-label uk-width-2-5"
                htmlFor="form-stacked-text"
              >
                Nhập lại mật khẩu mới
              </label>
              <div className="uk-form-controls uk-display-inline-block uk-width-3-5">
                <input
                  className="uk-input"
                  type="password"
                  value={confirmPassword}
                  required
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>
            </div>
            <div className="uk-flex uk-flex-center uk-text-center uk-margin-bottom uk-text-primary">
              <small>
                Lưu ý: Mật khẩu mới phải dài hơn 8 kí tự để đảm bảo độ an toàn
              </small>
            </div>
            <div className="uk-flex uk-flex-center">
              <button
                type="submit"
                className={`uk-button uk-margin-top`}
                style={{ backgroundColor: "#32d296", color: "#FFF" }}
              >
                Lưu
              </button>
            </div>
          </form>
        </div>
      </div>
      <LoadingOverlay isLoading={loading} />
    </div>
  );
};

export default AccountInfo;
