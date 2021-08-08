import React, { useEffect } from "react";
import UIKit from "uikit/dist/js/uikit.min.js";
import styled, { css } from "styled-components";
import { Link } from "gatsby";

const Question = () => {
  useEffect(() => {
    UIKit.modal("#modal-center");
  }, []);

  return (
    <div
      className="uk-padding uk-padding-remove-bottom uk-height-1-1"
      style={{ overflowY: "auto" }}
    >
      <p className="uk-text-large uk-text-center uk-text-bold uk-text-success">
        Danh sách câu hỏi
      </p>
      <div className="uk-flex uk-flex-row uk-flex-between uk-margin-medium-bottom">
        <div className="uk-width-1-5@s uk-display-inline-block">
          <span className="uk-display-inline-block uk-width-2-5">Môn học</span>
          <div className="uk-display-inline-block uk-width-3-5">
            <select
              className="uk-select uk-width-1-1"
              style={{
                border: "solid 0.5px #666",
              }}
            >
              <option>Phần mềm</option>
            </select>
          </div>
        </div>

        <div className="uk-width-1-6@s uk-display-inline-block">
          <span className="uk-display-inline-block uk-width-2-5">Chương</span>
          <div className="uk-display-inline-block uk-width-3-5">
            <select
              className="uk-select uk-width-1-1"
              style={{
                border: "solid 0.5px #666",
              }}
            >
              <option>Chương 1</option>
              <option>Chương 2</option>
            </select>
          </div>
        </div>

        <div className="uk-width-1-5@s uk-display-inline-block">
          <span className="uk-display-inline-block uk-width-2-5">
            Loại câu hỏi
          </span>
          <div className="uk-display-inline-block uk-width-3-5">
            <select
              className="uk-select uk-width-1-1"
              style={{
                border: "solid 0.5px #666",
              }}
            >
              <option>Trắc nghiệm</option>
              <option>Tự luận</option>
            </select>
          </div>
        </div>

        <div className="uk-width-1-6@s uk-display-inline-block">
          <span className="uk-display-inline-block uk-width-2-5">Mức độ</span>
          <div className="uk-display-inline-block uk-width-3-5">
            <select
              className="uk-select uk-width-1-1"
              style={{
                border: "solid 0.5px #666",
              }}
            >
              <option>Dễ</option>
              <option>Trung bình</option>
              <option>Khó</option>
            </select>
          </div>
        </div>
      </div>

      <div className="uk-margin-top" style={{ minHeight: 340 }}>
        <table class="uk-table uk-table-divider">
          <thead>
            <tr>
              <th>Câu hỏi</th>
              <th class="uk-width-small"></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Question 1</td>
              <td>
                <Link
                  title="Xem đáp án"
                  className="uk-icon-link uk-margin-right"
                  uk-icon="file-text"
                  uk-toggle="target: .my-class"
                ></Link>
                <Link
                  title="Lưu vào ngân hàng câu hỏi"
                  className="uk-icon-link uk-margin-small-right"
                  uk-icon="cloud-upload"
                  uk-toggle="target: #modal-center"
                ></Link>
              </td>
            </tr>
            <AnswerRow className="my-class" correct hidden>
              <td colSpan="2">Answer 1</td>
            </AnswerRow>
            <AnswerRow className="my-class" hidden>
              <td colSpan="2">Answer 2</td>
            </AnswerRow>
            <AnswerRow className="my-class" hidden>
              <td colSpan="2">Answer 3</td>
            </AnswerRow>
            <AnswerRow className="my-class" hidden>
              <td colSpan="2">Answer 4</td>
            </AnswerRow>
          </tbody>
        </table>
        <div id="modal-center" class="uk-flex-top" uk-modal>
          <div class="uk-modal-dialog uk-modal-body uk-margin-auto-vertical">
            <div>
              <a class="uk-modal-close-default" uk-icon="close" uk-close></a>
            </div>
            <p className="uk-text-large uk-text-center">
              Chọn bộ câu hỏi muốn lưu
            </p>
            <div className="uk-height-max-small" style={{ overflow: "auto" }}>
              <form>
                <div class="uk-margin">
                  <div class="uk-form-controls">
                    <label>
                      <input class="uk-radio" type="radio" name="radio1" />{" "}
                      Option 01
                    </label>
                    <br />
                    <label>
                      <input class="uk-radio" type="radio" name="radio1" />{" "}
                      Option 02
                    </label>
                    <br />
                    <label>
                      <input class="uk-radio" type="radio" name="radio1" />{" "}
                      Option 03
                    </label>
                    <br />
                    <label>
                      <input class="uk-radio" type="radio" name="radio1" />{" "}
                      Option 04
                    </label>
                    <br />
                    <label>
                      <input class="uk-radio" type="radio" name="radio1" />{" "}
                      Option 05
                    </label>
                  </div>
                </div>
              </form>
            </div>
            <div class="uk-text-center">
              <button
                class="uk-button"
                type="button"
                style={{ ...myButton, ...activeText }}
              >
                Lưu
              </button>
            </div>
          </div>
        </div>
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

export default Question;

const AnswerRow = styled.tr`
  background: #f0f0f0;
  ${(props) =>
    props.correct &&
    css`
      background: #32d296;
      color: white;
    `}
`;

const paginationButton = {
  width: 40,
};

const activeText = {
  color: "#FFF",
};

const myButton = {
  backgroundColor: "#32d296",
};
