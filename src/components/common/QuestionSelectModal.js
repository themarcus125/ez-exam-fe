import React, { useState, useEffect, useRef } from "react";
import Modal, { showModal, hideModal } from "./Modal";
import QuestionTable from "./QuestionTable";

export const showSelectModal = showModal;

const QuestionSelectModal = ({ type, level, onSave = () => {} }) => {
  const [checkedQuestionList, setCheckedQuestionList] = useState([]);
  const checkboxQuestionRef = useRef([]);

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
    checkboxQuestionRef.current.forEach((checkbox) => {
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
      <QuestionTable
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
