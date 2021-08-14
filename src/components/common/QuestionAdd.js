import React, { useState, useRef } from "react";
import EssayQuestionBlock from "./EssayQuestionBlock";

import MultipleChoiceQuestionBlock from "./MultipleChoiceQuestionBlock";
import { questionType, questionLevel } from "../../utils/constants";
import { postAPIWithToken } from "../../utils/api";
import { getUser } from "../../utils/auth";

const token = getUser()?.tk ?? "";

const QuestionAdd = () => {
  const [type, setType] = useState(questionType.MULTIPLE_CHOICE);
  const [level, setLevel] = useState(questionLevel.EASY);
  const [essayQuestions, setEssayQuestions] = useState([]);
  const [multipleChoiceQuestions, setMultipleChoiceQuestions] = useState([]);
  const multipleChoiceRefs = useRef([]);
  const essayRefs = useRef([]);
  const count = useRef(0);
  const hasError = useRef(false);

  const buttonClass = (t) =>
    `uk-button uk-padding ${
      type === t ? "uk-button-primary" : "uk-button-link"
    }`;

  const onToggle = (passedType) => {
    if (passedType !== type) {
      setType(passedType);
    }
  };

  const onChangeLevel = (e) => {
    setLevel(e.target.value);
  };

  const clearQuestions = (type) => {
    if (type === questionType.ESSAY) {
      setEssayQuestions([]);
      essayRefs.current = [];
    } else if (type === questionType.MULTIPLE_CHOICE) {
      setMultipleChoiceQuestions([]);
      multipleChoiceRefs.current = [];
    }
  };

  const onAddNewQuestion = () => {
    count.current += 1;
    if (type === questionType.MULTIPLE_CHOICE) {
      setMultipleChoiceQuestions([...multipleChoiceQuestions, count.current]);
    } else {
      setEssayQuestions([...essayQuestions, count.current]);
    }
  };

  const onRemoveQuestion = (id, type) => {
    if (type === questionType.ESSAY) {
      setEssayQuestions(essayQuestions.filter((question) => question !== id));
    } else {
      setMultipleChoiceQuestions(
        multipleChoiceQuestions.filter((question) => question !== id),
      );
    }
  };

  const onSave = async () => {
    hasError.current = false;
    const questionList = [];
    let refs = [];
    if (type === questionType.MULTIPLE_CHOICE) {
      refs = multipleChoiceRefs.current;
    } else if (type === questionType.ESSAY) {
      refs = essayRefs.current;
    }

    refs.forEach((ref) => {
      if (ref !== null) {
        const data = ref.getData();
        if (data.error) {
          hasError.current = true;
          alert(data.error);
          return;
        }

        questionList.push(data);
      }
    });

    if (hasError.current) {
      return;
    }

    try {
      const res = await postAPIWithToken(
        "/cauhoi/themDanhSachCauHoi",
        {
          maChuyenDe: 1,
          loaiCauHoi: type,
          doKho: level,
          dsCauHoi: questionList,
        },
        token,
      );
      if (res.status === 200) {
        alert(
          `Thêm câu hỏi ${
            type === questionType.ESSAY ? "tự luận" : "trắc nghiệm"
          } thành công`,
        );
        clearQuestions(type);
      }
    } catch (err) {
      alert("Thêm câu hỏi thất bại.");
    }
  };

  return (
    <div className="uk-flex uk-flex-row uk-flex-1">
      <div
        className="uk-flex uk-flex-column uk-height-1-1"
        style={{ width: 200 }}
      >
        <button
          className={buttonClass(questionType.MULTIPLE_CHOICE)}
          onClick={() => onToggle(questionType.MULTIPLE_CHOICE)}
        >
          Trắc nghiệm
        </button>
        <button
          className={buttonClass(questionType.ESSAY)}
          onClick={() => onToggle(questionType.ESSAY)}
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

        {type === questionType.MULTIPLE_CHOICE ? (
          <div>
            {multipleChoiceQuestions.map((question, index) => {
              return (
                <MultipleChoiceQuestionBlock
                  key={question}
                  ref={(element) =>
                    (multipleChoiceRefs.current[index] = element)
                  }
                  onRemove={() =>
                    onRemoveQuestion(question, questionType.MULTIPLE_CHOICE)
                  }
                />
              );
            })}
          </div>
        ) : (
          <div>
            {essayQuestions.map((question, index) => {
              return (
                <EssayQuestionBlock
                  key={question}
                  ref={(element) => (essayRefs.current[index] = element)}
                  onRemove={() =>
                    onRemoveQuestion(question, questionType.ESSAY)
                  }
                />
              );
            })}
          </div>
        )}

        <div className="uk-text-right uk-padding">
          <button
            className="uk-button"
            style={{ backgroundColor: "#32d296", color: "#FFFFFF" }}
            onClick={onAddNewQuestion}
          >
            Thêm mới
          </button>
        </div>

        <div className="uk-text-center uk-padding">
          <button
            className="uk-button"
            style={{ backgroundColor: "#32d296", color: "#FFFFFF" }}
            onClick={onSave}
          >
            Lưu
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuestionAdd;
