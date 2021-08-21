import React, { useState } from "react";
import styled from "styled-components";

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
      <div class="uk-child-width-expand@s uk-flex" uk-grid>
        <div>
          <FilterLabel>Môn học</FilterLabel>
          <div className="uk-display-inline-block">
            <FilterSelector
              className="uk-select uk-width-1-1"
              style={{
                border: "solid 0.5px #666",
              }}
            >
              <option>Phần mềm</option>
            </FilterSelector>
          </div>
        </div>

        <div className="uk-text-center">
          <FilterLabel>Loại câu hỏi</FilterLabel>
          <div className="uk-display-inline-block">
            <FilterSelector
              className="uk-select uk-width-1-1"
              style={{
                border: "solid 0.5px #666",
              }}
              value={type}
              onChange={onChangeType}
            >
              <option value={questionType.MULTIPLE_CHOICE}>Trắc nghiệm</option>
              <option value={questionType.ESSAY}>Tự luận</option>
            </FilterSelector>
          </div>
        </div>

        <div className="uk-text-right">
          <FilterLabel>Mức độ</FilterLabel>
          <div className="uk-display-inline-block">
            <FilterSelector
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
            </FilterSelector>
          </div>
        </div>
      </div>

      <QuestionTable type={type} level={level} />
    </div>
  );
};

export default Question;

const FilterSelector = styled.select`
  width: 200px;
  @media (max-width: 768px) {
    width: 150px;
  }
  @media (max-width: 500px) {
    width: 100px;
  }
`;

const FilterLabel = styled.span`
  margin-right: 20px;
  @media (max-width: 1000px) {
    display: block;
    margin-right: 0;
    margin-bottom: 10px;
  }
`;
