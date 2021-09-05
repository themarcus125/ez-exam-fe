import React from "react";
import { Link } from "gatsby";

const QuestionList = () => {
  return (
    <div
      className="uk-padding uk-padding-remove-top uk-padding-remove-bottom uk-height-1-1"
      style={{ overflowY: "auto" }}
    >
      <p className="uk-text-large uk-text-center uk-text-bold uk-text-success">
        Danh sách tài khoản
      </p>
      <div className="uk-flex uk-flex-row uk-flex-center">
        <div className="uk-width-3-5 uk-flex uk-flex-between">
          <input
            className="uk-search-input uk-width-4-5"
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

      <div className="uk-margin-top" style={{ minHeight: 400 }}>
        <table className="uk-table uk-table-divider">
          <thead>
            <tr>
              <th>Tên bộ câu hỏi</th>
              <th className="uk-width-small"></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Question List 1</td>
              <td>
                <Link
                  title="Xem đáp án"
                  className="uk-icon-link uk-margin-right"
                  uk-icon="file-text"
                ></Link>
              </td>
            </tr>
            <tr>
              <td>Question List 2</td>
              <td>
                <Link
                  title="Xem đáp án"
                  className="uk-icon-link uk-margin-right"
                  uk-icon="file-text"
                ></Link>
              </td>
            </tr>
            <tr>
              <td>Question List 3</td>
              <td>
                <Link
                  title="Xem đáp án"
                  className="uk-icon-link uk-margin-right"
                  uk-icon="file-text"
                ></Link>
              </td>
            </tr>
            <tr>
              <td>Question List 4</td>
              <td>
                <Link
                  title="Xem đáp án"
                  className="uk-icon-link uk-margin-right"
                  uk-icon="file-text"
                ></Link>
              </td>
            </tr>
            <tr>
              <td>Question List 5</td>
              <td>
                <Link
                  title="Xem đáp án"
                  className="uk-icon-link uk-margin-right"
                  uk-icon="file-text"
                ></Link>
              </td>
            </tr>
            <tr>
              <td>Question List 6</td>
              <td>
                <Link
                  title="Xem đáp án"
                  className="uk-icon-link uk-margin-right"
                  uk-icon="file-text"
                ></Link>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <ul className="uk-pagination uk-flex-center">
        <li>
          <button className="uk-button uk-button-default uk-button-small">
            <span className="uk-icon" uk-icon="icon: chevron-left"></span>
          </button>
        </li>
        <li className="uk-disabled">
          <button
            className="uk-button uk-button-default uk-button-small"
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
            className="uk-button uk-button-default uk-button-small"
            style={paginationButton}
          >
            2
          </button>
        </li>
        <li>
          <button
            className="uk-button uk-button-default uk-button-small"
            style={paginationButton}
          >
            3
          </button>
        </li>
        <li>
          <button className="uk-button uk-button-default uk-button-small">
            <span className="uk-icon" uk-icon="icon: chevron-right"></span>
          </button>
        </li>
      </ul>
    </div>
  );
};

export default QuestionList;

const paginationButton = {
  width: 40,
};

const activeText = {
  color: "#FFF",
};

const myButton = {
  backgroundColor: "#32d296",
};
