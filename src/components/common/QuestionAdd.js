import React, { useEffect, useState } from "react";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import EssayQuestionBlock from "./EssayQuestionBlock";
import MultipleChoiceQuestionBlock from "./MultipleChoiceQuestionBlock";
import { questionType } from "../../utils/constants";

const QuestionAdd = () => {
  const [type, setType] = useState(questionType.multipleChoice);
  const [essayQuestions, setEssayQuestions] = useState([]);
  const [multipleChoiceQuestions, setMultipleChoiceQuestions] = useState([]);

  const buttonClass = (t) =>
    `uk-button uk-padding ${type === t ? "uk-button-primary" : ""}`;

  const onToggle = (passedType) => {
    if (passedType !== type) {
      setType(passedType);
    }
  };

  const onAddNewQuestion = () => {
    if (type === questionType.multipleChoice) {
      setMultipleChoiceQuestions([...multipleChoiceQuestions, ""]);
    } else {
      setEssayQuestions([...essayQuestions, ""]);
    }
  };

  return (
    <div className="uk-flex uk-flex-row uk-flex-1">
      <div className="uk-flex uk-flex-column uk-height-1-1">
        <button
          class={buttonClass(questionType.multipleChoice)}
          onClick={() => onToggle(questionType.multipleChoice)}
        >
          Trắc nghiệm
        </button>
        <button
          class={buttonClass(questionType.essay)}
          onClick={() => onToggle(questionType.essay)}
        >
          Tự luận
        </button>
      </div>
      <div
        className="uk-padding uk-padding-remove-bottom uk-height-1-1 uk-flex-1"
        style={{ overflowY: "auto" }}
      >
        <p className="uk-text-large uk-text-center uk-text-bold uk-text-success">
          Thêm câu hỏi
        </p>
        <div className="uk-flex uk-flex-row uk-flex-between uk-margin-medium-bottom">
          <div className="uk-width-1-6@s uk-display-inline-block">
            <span className="uk-display-inline-block uk-width-2-5">
              Môn học
            </span>
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

        {/* Question block */}
        {type === questionType.multipleChoice ? (
          <div>
            {multipleChoiceQuestions.map((question) => {
              return <MultipleChoiceQuestionBlock />;
            })}
          </div>
        ) : (
          <div>
            {essayQuestions.map((question) => {
              return <EssayQuestionBlock />;
            })}
          </div>
        )}

        <div className="uk-text-right uk-padding">
          <button
            class="uk-button"
            style={{ backgroundColor: "#32d296", color: "#FFFFFF" }}
            onClick={onAddNewQuestion}
          >
            Thêm mới
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuestionAdd;
