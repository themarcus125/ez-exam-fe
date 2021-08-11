import React, { forwardRef, useImperativeHandle, useState } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

const EssayQuestionBlock = forwardRef((props, ref) => {
  const { onRemove } = props;
  const [title, setTitle] = useState("");

  useImperativeHandle(ref, () => ({
    getData: () => {
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
      <div className="uk-flex uk-flex-between uk-margin-bottom">
        <span>Nhập câu hỏi</span>
        <div className="uk-inline-block uk-flex uk-flex-middle uk-flex-right">
          <label>
            <input
              className="uk-radio"
              type="radio"
              style={{ borderColor: "black" }}
            />{" "}
            Công khai
          </label>
          <a
            className="uk-margin-left uk-text-danger"
            uk-icon="icon: trash; ratio: 1.5"
            onClick={onRemove}
          ></a>
        </div>
      </div>
      <div style={{ border: "1px solid black" }}>
        <CKEditor
          editor={ClassicEditor}
          data={title}
          onChange={onChangeTitle}
          config={{
            toolbar: [
              "heading",
              "|",
              "bold",
              "italic",
              "link",
              "bulletedList",
              "numberedList",
              "blockQuote",
            ],
          }}
        />
      </div>
    </div>
  );
});

export default EssayQuestionBlock;
