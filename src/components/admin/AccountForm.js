import React, { useState, useEffect } from "react";
import { navigate } from "../../utils/common";

import { postAPIFormWithToken } from "../../utils/api";
import { getToken } from "../../utils/auth";

const AdminAccountForm = ({ userId }) => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState(0);
  const [status, setStatus] = useState(0);

  useEffect(() => {
    // TODO: Get user info
    if (userId) {
    }
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();
    // TODO: Integrate API
    if (userId) {
      //Update
    } else {
      // Add
      try {
        const token = await getToken();
        await postAPIFormWithToken(
          "/register",
          {
            tenNguoiDung: name,
            matKhau: password,
            trangThai: status,
            loai: role,
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

  return (
    <div className="uk-flex uk-margin-top uk-flex-center">
      <div className="uk-width-1-2 uk-background-default uk-border-rounded uk-padding">
        <form className="uk-form" onSubmit={onSubmit}>
          <p className="uk-text-large uk-text-bold uk-text-center uk-text-success">
            {`${userId ? "Sửa thông tin" : "Tạo"} tài khoản`}
          </p>
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
              Mật khẩu
            </label>
            <div className="uk-form-controls uk-display-inline-block uk-width-4-5">
              <input
                className="uk-input"
                value={password}
                type="password"
                onChange={(e) => setPassword(e.target.value)}
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
                defaultValue={role}
                onBlur={(e) => setRole(e.target.value)}
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
                defaultValue={status}
                onBlur={(e) => setStatus(e.target.value)}
              >
                <option value={0}>Đang hoạt động</option>
                <option value={1}>Ngừng hoạt động</option>
              </select>
            </div>
          </div>

          <div className="uk-flex uk-flex-center">
            <button
              className="uk-button uk-margin-top"
              style={{ backgroundColor: "#32d296", color: "#FFF" }}
            >
              Lưu
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminAccountForm;
