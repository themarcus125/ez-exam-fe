import React from "react";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

const EssayQuestionBlock = () => {
  return (
    <div className="uk-margin-bottom">
      <div className="uk-flex uk-flex-between uk-margin-bottom">
        <span>Nhập câu hỏi</span>
        <div className="uk-inline-block uk-flex uk-flex-middle uk-flex-right">
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
      </div>
      <div style={{ border: "1px solid black" }}>
        <Editor
          toolbarClassName="toolbarClassName"
          wrapperClassName="wrapperClassName"
          editorClassName="editorClassName"
          editorStyle={{ padding: 10, minHeight: 200, maxHeight: 200 }}
          toolbar={{
            options: [
              "inline",
              "blockType",
              "fontSize",
              "list",
              "textAlign",
              "embedded",
              "emoji",
              "remove",
              "history",
            ],
          }}
        />
      </div>
    </div>
  );
};

export default EssayQuestionBlock;
