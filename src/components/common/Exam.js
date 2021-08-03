import React from "react";
import { Link } from "gatsby";

const Exam = () => {
  return (
    <div className="uk-padding uk-padding-remove-top uk-padding-remove-bottom uk-height-1-1">
      <p className="uk-text-large uk-text-center uk-text-bold uk-text-success">
        Danh sách đề thi
      </p>

      <div className="uk-flex uk-flex-row uk-flex-between uk-margin-bottom">
        <div className="uk-width-1-4@s uk-display-inline-block">
          <span class="uk-display-inline-block uk-width-2-5">Môn học</span>
          <div className="uk-display-inline-block uk-width-3-5">
            <select
              className="uk-select uk-width-1-1"
              style={{
                border: "solid 0.5px #666",
              }}
            >
              <option>Môn học A</option>
              <option>Môn học B</option>
            </select>
          </div>
        </div>

        <div className="uk-width-1-4@s uk-display-inline-block">
          <span class="uk-display-inline-block uk-width-1-5 uk-margin-right">
            Năm học
          </span>
          <div className="uk-display-inline-block uk-width-3-5">
            <select
              className="uk-select uk-width-1-1"
              style={{
                border: "solid 0.5px #666",
              }}
            >
              <option>2020</option>
              <option>2021</option>
            </select>
          </div>
        </div>

        <div className="uk-width-1-4@s uk-display-inline-block">
          <span class="uk-display-inline-block uk-width-1-5 uk-margin-right">
            Mức độ
          </span>
          <div className="uk-display-inline-block uk-width-3-5">
            <select
              className="uk-select uk-width-1-1"
              style={{
                border: "solid 0.5px #666",
              }}
            >
              <option>Dễ</option>
              <option>Trung bình</option>
            </select>
          </div>
        </div>
      </div>

      <div className="uk-flex uk-flex-row uk-flex-between uk-margin-bottom">
        <div className="uk-width-3-5 uk-flex uk-flex-between">
          <input
            class="uk-search-input uk-width-4-5"
            type="search"
            placeholder="Search"
            style={{
              border: "solid 0.5px #666",
            }}
          />

          <button
            className="uk-button"
            style={{ backgroundColor: "#32d296", color: "#FFF" }}
          >
            Tìm kiếm
          </button>
        </div>

        <button
          className="uk-button"
          style={{ backgroundColor: "#32d296", color: "#FFF" }}
        >
          Thêm mới
        </button>
      </div>

      <div className="uk-margin-top" style={{ height: 400 }}>
        <table class="uk-table uk-table-striped uk-table-middle">
          <thead>
            <tr>
              <th className="uk-width-large">Mã bộ đề</th>
              <th className="uk-width-large">Tên đề thi</th>
              <th className="uk-width-large">Môn học</th>
              <th className="uk-width-large">Năm học</th>
              <th className="uk-width-large">Mức độ</th>
              <th className="uk-width-large">Số lượng</th>
              <th className="uk-width-small"></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>103</td>
              <td>Kiểm tra cuối kì</td>
              <td>Toán cao cấp B1</td>
              <td>2021</td>
              <td>Dễ</td>
              <td>5</td>
              <td>
                <nav
                  id="navbar"
                  class="uk-navbar-container"
                  style={{ backgroundColor: "#FFFFFF" }}
                  uk-navbar
                >
                  <div class="uk-navbar-left uk-margin-small-left">
                    <ul class="uk-navbar-nav">
                      <li class="uk-flex uk-flex-middle">
                        <a>
                          <span uk-icon="table"></span>
                        </a>
                        <div class="uk-navbar-dropdown">
                          <ul class="uk-nav uk-navbar-dropdown-nav">
                            <li>
                              <a>Tạo bản sao</a>
                            </li>
                            <li>
                              <a>Xem chi tiết</a>
                            </li>
                          </ul>
                        </div>
                      </li>
                    </ul>
                  </div>
                </nav>
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
              width: 40,
              color: "#FFF",
              backgroundColor: "#32d296",
            }}
          >
            1
          </button>
        </li>
        <li>
          <button
            class="uk-button uk-button-default uk-button-small"
            style={{ width: 40 }}
          >
            2
          </button>
        </li>
        <li>
          <button
            class="uk-button uk-button-default uk-button-small"
            style={{ width: 40 }}
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

export default Exam;
