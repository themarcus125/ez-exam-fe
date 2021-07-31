import React from "react";
import { Link, navigate } from "gatsby";

const AdminAccounts = () => {
  const onAddNew = () => {
    navigate("../accounts/add");
  };

  return (
    <div
      className="uk-padding uk-padding-remove-top uk-padding-remove-bottom uk-height-1-1"
      style={{ overflowY: "auto" }}
    >
      <p className="uk-text-large uk-text-center uk-text-bold uk-text-success">
        Danh sách tài khoản
      </p>
      <div className="uk-flex uk-flex-row uk-flex-between uk-margin-bottom">
        <div className="uk-width-1-4@s uk-display-inline-block">
          <span class="uk-display-inline-block uk-width-2-5">
            Loại tài khoản
          </span>
          <div className="uk-display-inline-block uk-width-3-5">
            <select
              className="uk-select uk-width-1-1"
              style={{
                border: "solid 0.5px #666",
              }}
            >
              <option>Giáo viên</option>
              <option>Học sinh</option>
            </select>
          </div>
        </div>

        <div className="uk-width-1-4@s uk-display-inline-block">
          <span class="uk-display-inline-block uk-width-1-5 uk-margin-right">
            Trạng thái
          </span>
          <div className="uk-display-inline-block uk-width-3-5">
            <select
              className="uk-select uk-width-1-1"
              style={{
                border: "solid 0.5px #666",
              }}
            >
              <option>Đang hoạt động</option>
              <option>Ngừng hoạt động</option>
            </select>
          </div>
        </div>

        <div className="uk-width-1-4@s uk-display-inline-block">
          <div className="uk-flex uk-flex-right uk-flex-middle uk-height-1-1">
            <button
              className="uk-button uk-margin-right"
              style={{ ...myButton, ...activeText }}
              onClick={onAddNew}
            >
              Thêm mới
            </button>
            <button
              className="uk-button"
              style={{ ...myButton, ...activeText }}
            >
              Thêm từ tập tin
            </button>
          </div>
        </div>
      </div>
      <div className="uk-flex uk-flex-row uk-flex-center">
        <div className="uk-width-3-5 uk-flex uk-flex-between">
          <input
            class="uk-search-input uk-width-4-5"
            type="search"
            placeholder="Search"
            style={{
              border: "solid 0.5px #666",
            }}
          />
          <button className="uk-button" style={{ ...myButton, ...activeText }}>
            Tìm kiếm
          </button>
        </div>
      </div>
      <div className="uk-margin-top" style={{ height: 400 }}>
        <table class="uk-table uk-table-striped uk-table-middle">
          <thead>
            <tr>
              <th className="uk-width-small">Mã tài khoản</th>
              <th className="uk-width-large">Họ tên</th>
              <th>Loại tài khoản</th>
              <th>Trạng thái</th>
              <th className="uk-width-small"></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>GV057567</td>
              <td>Phạm Mai Anh</td>
              <td>Giáo viên</td>
              <td>Đang hoạt động</td>
              <td>
                <Link
                  class="uk-icon-link uk-margin-small-right"
                  uk-icon="file-edit"
                ></Link>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <ul class="uk-pagination uk-flex-center" uk-margin>
        <li>
          <button class="uk-button uk-button-default uk-button-small">
            <span class="uk-icon" uk-icon="icon: chevron-left"></span>
          </button>
        </li>
        <li class="uk-disabled">
          <button
            class="uk-button uk-button-default uk-button-small"
            style={{
              ...paginationButton,
              ...activeText,
              ...myButton,
            }}
          >
            1
          </button>
        </li>
        <li>
          <button
            class="uk-button uk-button-default uk-button-small"
            style={paginationButton}
          >
            2
          </button>
        </li>
        <li>
          <button
            class="uk-button uk-button-default uk-button-small"
            style={paginationButton}
          >
            3
          </button>
        </li>
        <li>
          <button class="uk-button uk-button-default uk-button-small">
            <span class="uk-icon" uk-icon="icon: chevron-right"></span>
          </button>
        </li>
      </ul>
    </div>
  );
};

export default AdminAccounts;

const paginationButton = {
  width: 40,
};

const activeText = {
  color: "#FFF",
};

const myButton = {
  backgroundColor: "#32d296",
};
