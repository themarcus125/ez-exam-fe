import React, { useEffect } from "react";
import Modal, { showModal, hideModal } from "./Modal";
import QuestionTable from "./QuestionTable";

export const showSelectModal = showModal;

export const hideSelectModal = hideModal;

const QuestionSelectModal = ({ type, level }) => {
  return (
    <Modal>
      <h4>Chọn câu hỏi</h4>
      <p>
        Hãy chọn những câu hỏi bạn muốn thêm vào đề thi từ ngân hàng câu hỏi
      </p>
      <QuestionTable type={type} level={level} />
    </Modal>
  );
};

export default QuestionSelectModal;
