import React, { useState, forwardRef, useImperativeHandle } from "react";

const charNumberStart = 65;

const MultipleChoiceQuestionBlock = (props, ref) => {
  const {
    onRemove,
    publicButtonDisabled = false,
    readOnly = false,
    defaultQuestionProp,
    defaultAnswerListProp,
  } = props;
  const defaultQuestion = defaultQuestionProp ? defaultQuestionProp : "";
  const defaultAnswerList =
    defaultAnswerListProp?.length > 0
      ? defaultAnswerListProp.map((answer) => ({
          id: answer.id,
          content: answer.noiDung,
          type: answer.loaiDapAn,
        }))
      : [
          {
            id: 1,
            content: "",
            type: 0,
          },
        ];
  const [answerList, setAnswerList] = useState(defaultAnswerList);
  const [title, setTitle] = useState(defaultQuestion);
  const [isPublic, setIsPublic] = useState(false);

  if (ref) {
    useImperativeHandle(ref, () => ({
      getData: () => {
        if (readOnly) return null;
        const hasCorrectAnswer =
          answerList.filter((answer) => answer.type === 1).length > 0;
        if (!hasCorrectAnswer) {
          return { error: "Hãy chọn đáp án đúng" };
        }

        if (!title) {
          return { error: "Câu hỏi không được để trống" };
        }

        const hasEmptyAnswer =
          answerList.filter((answer) => !answer.content).length > 0;
        if (hasEmptyAnswer) {
          return { error: "Hãy điền đầy đủ đáp án" };
        }

        return {
          noiDung: title,
          dsDapAn: answerList.map((answer) => {
            return {
              noiDung: answer.content,
              loaiDapAn: answer.type,
            };
          }),
        };
      },
    }));
  }

  const onAddNewAnswer = () => {
    setAnswerList([
      ...answerList,
      {
        id: answerList.length + 1,
        content: "",
        type: 0,
      },
    ]);
  };

  const onCheckCorrectAnswer = (e, answerId) => {
    const index = answerList.findIndex((answer) => answer.id === answerId);

    if (index !== -1) {
      setAnswerList([
        ...answerList.slice(0, index),
        {
          ...answerList[index],
          type: e.target.checked ? 1 : 0,
        },
        ...answerList.slice(index + 1),
      ]);
    }
  };

  const onChangeTitle = (e) => {
    setTitle(e.target.value);
  };

  const onChangeAnswer = (e, answerId) => {
    const index = answerList.findIndex((answer) => answer.id === answerId);

    if (index !== -1) {
      setAnswerList([
        ...answerList.slice(0, index),
        {
          ...answerList[index],
          content: e.target.value,
        },
        ...answerList.slice(index + 1),
      ]);
    }
  };

  const onPublic = (e) => {
    setIsPublic(e.target.checked);
  };

  return (
    <div className="uk-padding uk-padding-remove-horizontal uk-padding-remove-top">
      <div className="uk-flex uk-flex-middle uk-flex-right">
        {publicButtonDisabled ? null : (
          <label>
            <input
              className="uk-radio"
              type="radio"
              style={{ borderColor: "black" }}
              checked={isPublic}
              onChange={onPublic}
              disabled={readOnly}
            />{" "}
            Công khai
          </label>
        )}
        <button
          className="uk-margin-left uk-text-danger"
          uk-icon="icon: trash; ratio: 1.5"
          onClick={onRemove}
        ></button>
      </div>
      <div className="uk-margin-top uk-margin-bottom">
        <input
          className="uk-input"
          type="text"
          placeholder="Câu hỏi"
          value={title}
          onChange={onChangeTitle}
          disabled={readOnly}
          required
        />
        <table
          className="uk-table uk-table-divider uk-background-muted"
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
                <tr key={answer.id} className="uk-flex uk-flex-middle">
                  <td className="uk-width-auto">
                    {String.fromCharCode(index + charNumberStart)}
                  </td>
                  <td className="uk-width-expand">
                    <input
                      className="uk-input"
                      type="text"
                      placeholder="Câu trả lời"
                      value={answer.content}
                      onChange={(e) => onChangeAnswer(e, answer.id)}
                      required
                      disabled={readOnly}
                    />
                  </td>
                  <td className="uk-width-small">
                    <label>
                      <input
                        className="uk-checkbox"
                        type="checkbox"
                        checked={answer.type === 1}
                        onChange={(e) => onCheckCorrectAnswer(e, answer.id)}
                        disabled={readOnly}
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
          className="uk-button"
          style={{ backgroundColor: "#32d296", color: "#FFFFFF" }}
          onClick={onAddNewAnswer}
        >
          Thêm đáp án
        </button>
      </div>
    </div>
  );
};

export default forwardRef(MultipleChoiceQuestionBlock);
