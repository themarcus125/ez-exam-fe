import React, { Fragment, useEffect, useState, useRef } from "react";
import UIKit from "uikit/dist/js/uikit.min.js";
import styled, { css } from "styled-components";
import { ToastContainer, toast } from "react-toastify";

import PaginationButtonGroup from "./PaginationButtonGroup";
import { getUser } from "../../utils/auth";
import { getAPIWithToken } from "../../utils/api";
import { questionType } from "../../utils/constants";

const QUESTION_PER_PAGE = 10;
const token = getUser()?.tk ?? "";

const QuestionTable = ({
  course,
  type,
  level,
  isSelectable,
  searchString = "",
  onCheckQuestion = () => {},
  checkboxQuestionRef,
}) => {
  const [questionList, setQuestionList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const numOfPage = useRef(1);

  useEffect(() => {
    getData();
  }, [currentPage]);

  useEffect(() => {
    if (type && level && course) {
      setCurrentPage(1);
      numOfPage.current = 1;
      getData();
    }
  }, [type, level, course, searchString]);

  useEffect(() => {
    UIKit.modal("#modal-center");
  }, []);

  const getData = async () => {
    setLoading(true);
    try {
      const response = await getAPIWithToken(
        `/cauhoi/layDanhSachCauHoi?limit=${QUESTION_PER_PAGE}&page=${currentPage}&&loaiCauHoi=${type}&&doKho=${level}&&maChuyenDe=${course}&&keyword=${searchString}`,
        token,
      );
      numOfPage.current = response?.data?.meta.to;
      setQuestionList(response?.data?.dsCauHoi);
    } catch (error) {
      toast.error("Đã có lỗi xảy ra, không thể lấy danh sách môn học");
    }
    setLoading(false);
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
    <Fragment>
      {loading && <div className="uk-flex uk-flex-center" uk-spinner=""></div>}
      <ToastContainer autoClose={3000} position={toast.POSITION.TOP_RIGHT} />
      <div className="uk-margin-top" style={{ minHeight: 340 }}>
        {!loading && questionList?.length > 0 && (
          <table className="uk-table uk-table-divider">
            <thead>
              <tr>
                {isSelectable && <th></th>}
                <th>Câu hỏi</th>
                <th className="uk-width-small"></th>
              </tr>
            </thead>
            <tbody>
              {questionList?.map((question) => {
                return (
                  <Fragment key={question.id}>
                    <tr>
                      {isSelectable && (
                        <CheckBoxColumn className="uk-text-center">
                          <input
                            ref={(el) => {
                              checkboxQuestionRef.current[question.id] = el;
                            }}
                            className="uk-checkbox"
                            type="checkbox"
                            onChange={(e) => onCheckQuestion(e, question)}
                          />
                        </CheckBoxColumn>
                      )}
                      {type === questionType.MULTIPLE_CHOICE ? (
                        <td data-label="Câu hỏi">{question.noiDung}</td>
                      ) : (
                        <td data-label="Câu hỏi">
                          <div
                            dangerouslySetInnerHTML={{
                              __html: question.noiDung,
                            }}
                          ></div>
                        </td>
                      )}
                      <td data-label="Tùy chỉnh">
                        {type !== questionType.ESSAY && (
                          <a
                            title="Xem đáp án"
                            className="uk-icon-link uk-margin-right"
                            uk-icon="file-text"
                            uk-toggle={`target: .answer-${question.id}`}
                          ></a>
                        )}
                        {/* <a
                          title="Lưu vào ngân hàng câu hỏi"
                          className="uk-icon-link uk-margin-small-right"
                          uk-icon="cloud-upload"
                          uk-toggle="target: #modal-center"
                        ></a> */}
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
                          {isSelectable && <td></td>}
                          <td colSpan="2">{answer.noiDung}</td>
                        </AnswerRow>
                      );
                    })}
                  </Fragment>
                );
              })}
            </tbody>
          </table>
        )}
        {!loading && (!questionList || questionList?.length === 0) && (
          <p>
            Không có câu hỏi nào được tìm thấy cho môn học bạn đã chọn. Vui lòng
            chọn một môn học khác và thử lại.
          </p>
        )}
        <div id="modal-center" className="uk-flex-top" uk-modal="true">
          <div className="uk-modal-dialog uk-modal-body uk-margin-auto-vertical">
            <div>
              <a className="uk-modal-close-default" uk-close="">
                Close
              </a>
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
    </Fragment>
  );
};

export default QuestionTable;

const AnswerRow = styled.tr`
  background: #f0f0f0;
  ${(props) =>
    props.correct &&
    css`
      background: #32d296;
      color: white;
    `}
`;

const CheckBoxColumn = styled.td`
  width: 20px;
`;

const activeButton = {
  color: "#FFF",
  backgroundColor: "#32d296",
};
