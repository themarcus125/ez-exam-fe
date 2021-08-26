import React, { useState } from "react";
import { questionLevel, questionType } from "../../utils/constants";
import ControlBar from "./ControlBar";
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
      className="uk-padding uk-padding-remove-vertical uk-height-1-1"
      style={{ overflowY: "auto" }}
    >
      <ControlBar
        title="Danh sách câu hỏi"
        controlRow={() => (
          <>
            <div className="uk-width-1-3@l uk-display-inline-block">
              <span className="uk-display-inline-block uk-width-1-4">
                Môn học
              </span>
              <div className="uk-display-inline-block uk-width-3-4">
                <select className="uk-select uk-width-1-1 black-border">
                  <option>Phần mềm</option>
                </select>
              </div>
            </div>

            <div className="uk-width-1-3@l uk-display-inline-block">
              <span className="uk-display-inline-block uk-width-1-4">
                Loại câu hỏi
              </span>
              <div className="uk-display-inline-block uk-width-3-4">
                <select
                  className="uk-select uk-width-1-1 black-border"
                  value={type}
                  onChange={onChangeType}
                  onBlur={() => {}}
                >
                  <option value={questionType.MULTIPLE_CHOICE}>
                    Trắc nghiệm
                  </option>
                  <option value={questionType.ESSAY}>Tự luận</option>
                </select>
              </div>
            </div>

            <div className="uk-width-1-3@l uk-display-inline-block">
              <span className="uk-display-inline-block uk-width-1-4">
                Mức độ
              </span>
              <div className="uk-display-inline-block uk-width-3-4">
                <select
                  className="uk-select uk-width-1-1 black-border"
                  value={level}
                  onChange={onChangeLevel}
                  onBlur={() => {}}
                >
                  <option value={questionLevel.EASY}>Dễ</option>
                  <option value={questionLevel.MEDIUM}>Trung bình</option>
                  <option value={questionLevel.HARD}>Khó</option>
                </select>
              </div>
            </div>
          </>
        )}
      />

      <QuestionTable type={type} level={level} />
    </div>
  );
};

export default Question;
