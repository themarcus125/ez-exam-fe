import React from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "ckeditor5-classic-with-mathtype";

const Editor = ({ id, title, onChangeTitle, readOnly }) => {
  return (
    <CKEditor
      id={id}
      editor={ClassicEditor}
      data={title}
      onChange={onChangeTitle}
      config={{
        toolbar: [
          "heading",
          "|",
          "MathType",
          "ChemType",
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
