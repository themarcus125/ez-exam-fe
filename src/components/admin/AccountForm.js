import React, { useState, useEffect } from "react";
import { navigate } from "gatsby";

import { postAPIWithToken } from "../../utils/api";

const AdminAccountForm = ({ userId }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
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
      await postAPIWithToken("/register", {
        tenNguoiDung: name,
        email,
      });
      // Handle after register...
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
          <div class="uk-margin uk-flex uk-flex-row uk-flex-middle">
            <label class="uk-form-label uk-width-1-5" for="form-stacked-text">
              Họ tên
            </label>
            <div class="uk-form-controls uk-display-inline-block uk-width-4-5">
              <input
                class="uk-input"
                value={name}
                type="text"
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
          </div>

          <div class="uk-margin uk-flex uk-flex-row uk-flex-middle">
            <label class="uk-form-label uk-width-1-5" for="form-stacked-text">
              Email
            </label>
            <div class="uk-form-controls uk-display-inline-block uk-width-4-5">
              <input
                class="uk-input"
                value={email}
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          <div class="uk-margin uk-flex uk-flex-row uk-flex-middle">
            <label class="uk-form-label uk-width-1-5" for="form-stacked-text">
              Mật khẩu
            </label>
            <div class="uk-form-controls uk-display-inline-block uk-width-4-5">
              <input
                class="uk-input"
                value={password}
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>

          <div class="uk-margin uk-flex uk-flex-row uk-flex-middle">
            <label class="uk-form-label uk-width-1-5" for="form-stacked-select">
              Loại tài khoản
            </label>
            <div class="uk-form-controls uk-display-inline-block uk-width-4-5">
              <select
                class="uk-select"
                value={role}
                onChange={(e) => setRole(e.target.value)}
              >
                <option value={0}>Học sinh</option>
                <option value={1}>Giáo viên</option>
              </select>
            </div>
          </div>

          <div class="uk-margin uk-flex uk-flex-row uk-flex-middle">
            <label class="uk-form-label uk-width-1-5" for="form-stacked-select">
              Trạng thái
            </label>
            <div class="uk-form-controls uk-display-inline-block uk-width-4-5">
              <select
                class="uk-select"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
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
