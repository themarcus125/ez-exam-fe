import React, { useState } from "react";

const charNumberStart = 65;

const MultipleChoiceQuestionBlock = () => {
  const [answerList, setAnswerList] = useState([""]);
  const [correctAnswer, setCorrectAnswer] = useState([]);

  const onAddNewAnswer = () => {
    setAnswerList([...answerList, ""]);
  };

  const onCheckCorrectAnswer = (e) => {
    console.log(e.target.check);
  };

  return (
    <div
      className="uk-padding uk-margin-bottom"
      style={{ backgroundColor: "#7FFFE3", borderRadius: "10px" }}
    >
      <div className="uk-flex uk-flex-middle uk-flex-right">
        <label>
          <input
            class="uk-radio"
            type="radio"
            style={{ borderColor: "black" }}
          />{" "}
          Công khai
        </label>
        <a
          className="uk-margin-left uk-text-danger"
          uk-icon="icon: trash; ratio: 1.5"
        ></a>
      </div>
      <div className="uk-margin-top uk-margin-bottom">
        <input class="uk-input" type="text" placeholder="Input" />
        <table
          class="uk-table uk-table-divider uk-background-muted"
          style={{ marginTop: 0 }}
        >
          <thead hidden>
            <tr>
              <th></th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {answerList.map((answer, index) => {
              return (
                <tr key={answer + index} className="uk-flex uk-flex-middle">
                  <td className="uk-width-auto">
                    {String.fromCharCode(index + charNumberStart)}
                  </td>
                  <td className="uk-width-expand">
                    <input
                      className="uk-input"
                      type="text"
                      placeholder="Câu trả lời"
                      value={answer}
                    />
                  </td>
                  <td className="uk-width-small">
                    <label>
                      <input
                        class="uk-checkbox"
                        type="checkbox"
                        onChange={onCheckCorrectAnswer}
                      />{" "}
                      Đáp án
                    </label>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className="uk-text-right">
        <button
          class="uk-button"
          style={{ backgroundColor: "#32d296", color: "#FFFFFF" }}
          onClick={onAddNewAnswer}
        >
          Thêm đáp án
        </button>
      </div>
    </div>
  );
};

export default MultipleChoiceQuestionBlock;
