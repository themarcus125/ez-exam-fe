import React, { useState, useEffect, useRef } from "react";
import { graphql, useStaticQuery, Link } from "gatsby";

import { navigate } from "../../utils/common"

import { postFileAPIWithToken } from "../../utils/api";
import { getToken } from "../../utils/auth";

const AccountFromFile = () => {
  const targetFile = useRef(null);
  const exampleFile = useStaticQuery(graphql`
    query {
      file(name: { eq: "account-example" }) {
        name
        publicURL
      }
    }
  `);

  const onSubmit = async (e) => {
    e.preventDefault();
    if (targetFile.current) {
      try {
        const token = await getToken();
        const formData = new FormData();
        formData.append("file", targetFile.current);
        const request = await postFileAPIWithToken("/import", formData, token);
        if (request.status === 200) {
          alert("Tập tin đã được tải lên.");
          navigate("../");
        }
      } catch (err) {
        alert("Tải tập tin thất bại.");
      }
    }
  };

  const onInputFileChange = (e) => {
    const selectedFile = e.target.files[0];
    targetFile.current = selectedFile;
  };

  return (
    <div className="uk-flex uk-margin-top uk-flex-center">
      <div className="uk-width-1-2 uk-background-default uk-border-rounded uk-padding">
        <form className="uk-form" onSubmit={onSubmit}>
          <p className="uk-text-large uk-text-bold uk-text-center uk-text-success">
            Tạo mới tài khoản từ tập tin
          </p>

          <p>
            Bạn có thể lựa chọn tập tin để thêm một loạt tài khoản người dùng từ
            danh sách.
            <br />
            Tập tin phải có cấu trúc tương tự như mẫu sau:{" "}
            <a href={exampleFile?.file.publicURL}>Mẫu danh sách tài khoản</a>.
          </p>

          <div className="uk-margin uk-flex uk-flex-row uk-flex-middle">
            <label
              className="uk-form-label uk-width-1-5"
              htmlFor="form-stacked-select"
            >
              Đường dẫn tập tin
            </label>
            <div className="uk-form-controls uk-display-inline-block uk-width-4-5">
              <div uk-form-custom="target: true">
                <input
                  type="file"
                  onChange={onInputFileChange}
                  accept=".xlsx"
                />
                <input
                  className="uk-input uk-form-width-large"
                  type="text"
                  placeholder="Chọn tập tin..."
                  disabled
                />
              </div>
            </div>
          </div>
          <div className="uk-flex uk-flex-center">
            <button
              className="uk-button uk-margin-top"
              style={{ backgroundColor: "#32d296", color: "#FFF" }}
            >
              Tải lên
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AccountFromFile;
