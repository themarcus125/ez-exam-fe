import React, { forwardRef, useImperativeHandle, useState } from "react";
import loadable from "@loadable/component";

const LoadableEditor = loadable(() => import("./Editor"));

const EssayQuestionBlock = (props, ref) => {
  const {
    onRemove,
    publicButtonDisabled = false,
    readOnly,
    defaultQuestionProp = "",
    hideHeader = false,
  } = props;
  const [title, setTitle] = useState(defaultQuestionProp);

  useImperativeHandle(ref, () => ({
    getData: () => {
      if (readOnly) return null;
      if (!title) {
        return { error: "Câu hỏi không được để trống" };
      }

      return {
        noiDung: title,
      };
    },
  }));

  const onChangeTitle = (event, editor) => {
    setTitle(editor.getData());
  };

  return (
    <div className="uk-margin-bottom">
      {!hideHeader && (
        <div className="uk-flex uk-flex-between uk-margin-bottom">
          <span>Nhập câu hỏi</span>
          <div className="uk-inline-block uk-flex uk-flex-middle uk-flex-right">
            {publicButtonDisabled ? null : (
              <label>
                <input
                  className="uk-radio"
                  type="radio"
                  style={{ borderColor: "black" }}
                />{" "}
                Công khai
              </label>
            )}
            <a
              className="uk-margin-left uk-text-danger"
              uk-icon="icon: trash; ratio: 1.5"
              onClick={onRemove}
            ></a>
          </div>
        </div>
      )}
      <div style={{ border: "1px solid black" }}>
        <LoadableEditor
          title={title}
          onChangeTitle={onChangeTitle}
          readOnly={readOnly}
        />
      </div>
    </div>
  );
};

export default forwardRef(EssayQuestionBlock);
