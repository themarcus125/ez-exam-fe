import React, { useState } from "react";
import styled, { css } from "styled-components";

import { questionLevel, questionType } from "../../utils/constants";
import QuestionTable from "./QuestionTable";

const Question = () => {
  const [level, setLevel] = useState(questionLevel.EASY);
  const [type, setType] = useState(questionType.MULTIPLE_CHOICE);

  const onChangeLevel = (e) => {
    setLevel(e.target.value);
  };

  const onChangeType = (e) => {
    setType(e.target.value);
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

      <QuestionTable type={type} level={level} />
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
