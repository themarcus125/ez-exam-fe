import React, { useEffect, useState, useRef, Fragment } from "react";
import UIKit from "uikit/dist/js/uikit.min.js";
import styled, { css } from "styled-components";
import { Link } from "gatsby";

import { getUser } from "../../utils/auth";
import { getAPIWithToken } from "../../utils/api";
import { questionLevel, questionType } from "../../utils/constants";
import PaginationButtonGroup from "./PaginationButtonGroup";

const QUESTION_PER_PAGE = 10;
const token = getUser()?.tk ?? "";

const Question = () => {
  const [questionList, setQuestionList] = useState([]);
  const [level, setLevel] = useState(questionLevel.EASY);
  const [type, setType] = useState(questionType.MULTIPLE_CHOICE);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const numOfPage = useRef(1);

  useEffect(() => {
    UIKit.modal("#modal-center");
  }, []);

  useEffect(() => {
    getData();
  }, [type, level, currentPage]);

  const getData = async () => {
    setLoading(true);
    const response = await getAPIWithToken(
      `/cauhoi/layDanhSachCauHoi?limit=${QUESTION_PER_PAGE}&page=${currentPage}&&loaiCauHoi=${type}&&doKho=${level}`,
      token,
    );
    setQuestionList(response.data.dsCauHoi);
    numOfPage.current = response.data.meta.to;
    setLoading(false);
  };

  const onChangeLevel = (e) => {
    setLevel(e.target.value);
  };

  const onChangeType = (e) => {
    setType(e.target.value);
  };

  const onChangePage = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const onNext = () => {
    if (currentPage < numOfPage.current) {
      setCurrentPage(currentPage + 1);
    }
  };

  const onPrev = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

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
              value={type}
              onChange={onChangeType}
            >
              <option value={questionType.MULTIPLE_CHOICE}>Trắc nghiệm</option>
              <option value={questionType.ESSAY}>Tự luận</option>
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
              value={level}
              onChange={onChangeLevel}
            >
              <option value={questionLevel.EASY}>Dễ</option>
              <option value={questionLevel.MEDIUM}>Trung bình</option>
              <option value={questionLevel.HARD}>Khó</option>
            </select>
          </div>
        </div>
      </div>

      <div className="uk-margin-top" style={{ minHeight: 340 }}>
        <table className="uk-table uk-table-divider">
          <thead>
            <tr>
              <th>Câu hỏi</th>
              <th className="uk-width-small"></th>
            </tr>
          </thead>
          <tbody>
            {!loading &&
              questionList.map((question) => {
                return (
                  <Fragment key={question.id}>
                    <tr>
                      {type === questionType.MULTIPLE_CHOICE ? (
                        <td>{question.noiDung}</td>
                      ) : (
                        <td>
                          <div
                            dangerouslySetInnerHTML={{
                              __html: question.noiDung,
                            }}
                          ></div>
                        </td>
                      )}
                      <td>
                        {type !== questionType.ESSAY && (
                          <a
                            title="Xem đáp án"
                            className="uk-icon-link uk-margin-right"
                            uk-icon="file-text"
                            uk-toggle={`target: .answer-${question.id}`}
                          ></a>
                        )}
                        <a
                          title="Lưu vào ngân hàng câu hỏi"
                          className="uk-icon-link uk-margin-small-right"
                          uk-icon="cloud-upload"
                          uk-toggle="target: #modal-center"
                        ></a>
                      </td>
                    </tr>
                    {question.dsDapAn.map((answer, index) => {
                      return (
                        <AnswerRow
                          key={answer.id}
                          className={`answer-${question.id}`}
                          hidden
                          correct={answer.loaiDapAn === 1}
                        >
                          <td colSpan="2">{answer.noiDung}</td>
                        </AnswerRow>
                      );
                    })}
                  </Fragment>
                );
              })}
          </tbody>
        </table>
        {loading && (
          <div className="uk-flex uk-flex-center" uk-spinner=""></div>
        )}
        <div id="modal-center" className="uk-flex-top" uk-modal="true">
          <div className="uk-modal-dialog uk-modal-body uk-margin-auto-vertical">
            <div>
              <a
                className="uk-modal-close-default"
                uk-icon="close"
                uk-close=""
              ></a>
            </div>
            <p className="uk-text-large uk-text-center">
              Chọn bộ câu hỏi muốn lưu
            </p>
            <div className="uk-height-max-small" style={{ overflow: "auto" }}>
              <form>
                <div className="uk-margin">
                  <div className="uk-form-controls">
                    <label>
                      <input className="uk-radio" type="radio" name="radio1" />{" "}
                      Option 01
                    </label>
                    <br />
                    <label>
                      <input className="uk-radio" type="radio" name="radio1" />{" "}
                      Option 02
                    </label>
                    <br />
                    <label>
                      <input className="uk-radio" type="radio" name="radio1" />{" "}
                      Option 03
                    </label>
                  </div>
                </div>
              </form>
            </div>
            <div className="uk-text-center">
              <button className="uk-button" type="button" style={activeButton}>
                Lưu
              </button>
            </div>
          </div>
        </div>
      </div>

      <ul className="uk-pagination uk-flex-center">
        <PaginationButtonGroup
          onChangePage={onChangePage}
          onNext={onNext}
          onPrev={onPrev}
          numOfPage={numOfPage.current}
          currentPage={currentPage}
        />
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

const activeButton = {
  color: "#FFF",
  backgroundColor: "#32d296",
};
