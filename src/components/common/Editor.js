import React from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

const Editor = ({ title, onChangeTitle, readOnly }) => {
  return (
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
      disabled={readOnly}
    />
  );
};

export default Editor;
