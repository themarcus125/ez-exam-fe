import React from "react";

const Questionaire = () => {
  return (
    <div className="uk-height-1-1 uk-background-muted">
      <p className="uk-text-large uk-text-center uk-text-bold uk-text-success">
        Danh sách câu hỏi
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
            Chương
          </span>
          <div className="uk-display-inline-block uk-width-3-5">
            <select
              className="uk-select uk-width-1-1"
              style={{
                border: "solid 0.5px #666",
              }}
            >
              <option>Chương A</option>
              <option>Chương B</option>
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
              <option>Mức độ A</option>
              <option>Mức độ B</option>
            </select>
          </div>
        </div>
      </div>
      <div className="uk-margin-top" style={{ height: 400 }}>
        <table class="uk-table uk-table-striped uk-table-middle">
          <thead>
            <tr>
              <th className="uk-width-large"></th>
              <th className="uk-width-small"></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <p>What is the correct file extension for Python files?</p>
                <div id="cauhoi1" uk-modal hidden class>
                  <ul class="uk-list">
                    <li>A. pyt</li>
                    <li>B. pyth</li>
                    <li>C. py</li>
                    <li>D. pt</li>
                  </ul>
                </div>
              </td>
              <td>
                <span
                  uk-icon="table"
                  uk-tooltip="Xem chi tiết"
                  style={{ cursor: "pointer" }}
                  uk-toggle="target: #cauhoi1"
                ></span>
              </td>
            </tr>
            <tr>
              <td>
                <p>
                  Which SQL statement is used to extract data from a database?
                </p>
                <div id="cauhoi2" uk-modal hidden class>
                  <ul class="uk-list">
                    <li>A. Select</li>
                    <li>B. open</li>
                    <li>C. get</li>
                    <li>D. extract</li>
                  </ul>
                </div>
              </td>
              <td>
                <span
                  uk-icon="table"
                  uk-tooltip="Xem chi tiết"
                  style={{ cursor: "pointer" }}
                  uk-toggle="target: #cauhoi2"
                ></span>
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

export default Questionaire;
