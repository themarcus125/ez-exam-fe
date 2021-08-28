import React, { useState, useEffect, useRef } from "react";
import { questionType } from "../../utils/constants";
import Modal, { showModal, hideModal } from "./Modal";
import QuestionTable from "./QuestionTable";

export const showSelectModal = showModal;

const QuestionSelectModal = ({ course, level, onSave = () => {} }) => {
  const [checkedQuestionList, setCheckedQuestionList] = useState([]);
  const checkboxQuestionRef = useRef([]);
  const [type, setType] = useState(questionType.MULTIPLE_CHOICE);

  const buttonClass = (t) =>
    `uk-button uk-padding uk-padding-remove-vertical ${
      type === t ? "uk-button-primary" : "uk-button-link"
    }`;

  const onCheckQuestion = (e, question) => {
    const checkboxValue = e.target.checked;
    if (checkboxValue) {
      setCheckedQuestionList([...checkedQuestionList, question]);
    }
    if (!checkboxValue) {
      setCheckedQuestionList(checkedQuestionList.filter((q) => q !== question));
    }
  };

  const hideSelectModal = () => {
    checkboxQuestionRef.current
      .filter((checkbox) => checkbox)
      .forEach((checkbox) => {
        checkbox.checked = false;
      });
    setCheckedQuestionList([]);
    hideModal();
  };

  const onSaveButtonClicked = (e) => {
    e.preventDefault();
    onSave(checkedQuestionList);
    hideSelectModal();
  };

  return (
    <Modal
      title="Chọn câu hỏi"
      description="Hãy chọn những câu hỏi bạn muốn thêm vào đề thi từ ngân hàng câu hỏi. Hệ thống sẽ tự động kiểm tra, nếu câu hỏi bạn chọn đã có trong đề thi thì sẽ huỷ thêm câu hỏi đó."
      onSave={onSaveButtonClicked}
    >
      <div className="uk-flex uk-flex-row uk-margin-bottom">
        <button
          className={buttonClass(questionType.MULTIPLE_CHOICE)}
          onClick={() => setType(questionType.MULTIPLE_CHOICE)}
        >
          Trắc nghiệm
        </button>
        <button
          className={buttonClass(questionType.ESSAY)}
          onClick={() => setType(questionType.ESSAY)}
        >
          Tự luận
        </button>
      </div>
      <QuestionTable
        course={course}
        type={type}
        level={level}
        isSelectable
        onCheckQuestion={onCheckQuestion}
        checkboxQuestionRef={checkboxQuestionRef}
      />
    </Modal>
  );
};

export default QuestionSelectModal;
