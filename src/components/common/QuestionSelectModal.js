import React, { useState, useEffect } from "react";
import Modal, { showModal, hideModal } from "./Modal";
import QuestionTable from "./QuestionTable";

export const showSelectModal = showModal;

export const hideSelectModal = hideModal;

const QuestionSelectModal = ({ type, level }) => {
  const [checkedQuestionList, setCheckedQuestionList] = useState([]);

  const isQuestionChecked = (question) => {
    const targetQuestion = checkedQuestionList.find(
      (ques) => ques.id === question.id,
    );
    if (targetQuestion) {
      return true;
    }
    return false;
  };

  const onCheckQuestion = (e, question) => {
    setCheckedQuestionList([...checkedQuestionList, question]);
  };
  return (
    <Modal>
      <h4>Chọn câu hỏi</h4>
      <p>
        Hãy chọn những câu hỏi bạn muốn thêm vào đề thi từ ngân hàng câu hỏi
      </p>
      <QuestionTable
        type={type}
        level={level}
        isSelectable
        isQuestionChecked={isQuestionChecked}
        onCheckQuestion={onCheckQuestion}
      />
    </Modal>
  );
};

export default QuestionSelectModal;
