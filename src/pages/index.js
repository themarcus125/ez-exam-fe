import React, { useEffect } from "react";
import { Link, navigate } from "gatsby";
import UIKit from "uikit/dist/js/uikit.min.js";
import { Helmet } from "react-helmet";

import logo from "../asset/images/logo.png";
import { getUser } from "../utils/auth";
import { userRoleToPath } from "../utils/constants";
import { ResponsiveFlexWrapper } from "../utils/ui";

const IndexPage = () => {
  useEffect(() => {
    UIKit.navbar("#navbar");
  }, []);

  const onLogin = (e) => {
    e.preventDefault();
    const { role = "" } = getUser();
    if (!role) {
      return navigate("/login");
    }

    const path = userRoleToPath[role] || "examinee";
    navigate(`/${path}`);
  };

  return (
    <>
      <Helmet title="Trang chủ - EzExam" defer={false} />

      <div className="uk-flex uk-flex-column" style={{ height: "100vh" }}>
        <nav
          id="navbar"
          className="uk-navbar-container"
          uk-navbar="true"
          style={{ backgroundColor: "#FFFFFF" }}
        >
          <div className="uk-navbar-left uk-margin-small-left">
            <Link className="logo-image" to="/">
              <img src={logo} alt="Logo" width="200" height="80" />
            </Link>
          </div>

          <div className="uk-navbar-right uk-margin-right">
            <ul className="uk-navbar-nav">
              <li>
                <a href="login" onClick={onLogin}>
                  Đăng nhập.
                </a>
              </li>
            </ul>
          </div>
        </nav>
        <div className="uk-padding" style={{ flexGrow: 1 }}>
          <ResponsiveFlexWrapper className="uk-height-1-1">
            <div
              className="uk-padding uk-padding-remove-vertical"
              style={{ flex: 2 }}
            >
              <h2 className="uk-text-success">Hướng dẫn sử dụng phần mềm</h2>
              <p>
                Ứng dụng thi trắc nghiệm online là một hệ thống phần mềm tổ chức
                thi trắc nghiệm, thực hiện việc biên tập ngân hàng câu hỏi, tạo
                đề thi và kể cả chấm điểm
              </p>
              <div className="uk-padding uk-padding-remove-vertical uk-padding-remove-right">
                <p>
                  Bước 1: Thông thường những phần mềm tạo đề thi trắc nghiệm
                  trực tuyến có thể triển khai
                </p>
                <p>
                  Bước 2: Những phần mềm được áp dụng đa dạng từ các trường học
                </p>
                <p>
                  Bước 3: Hệ thống thi trắc nghiệm online đã giúp đỡ không ít
                  cho việc tổ chức thi hiện nay, đem lại những hiệu quả ưu việt
                </p>
              </div>
            </div>
            <div style={{ flex: 3, height: "400px" }}>
              <iframe
                title="video"
                src="https://www.youtube.com/embed/dQw4w9WgXcQ"
                frameBorder="0"
                uk-video="automute: true"
                style={{
                  display: "block",
                  width: "100%",
                  height: "100%",
                  flexGrow: 1,
                }}
              ></iframe>
            </div>
          </ResponsiveFlexWrapper>
        </div>
      </div>
    </>
  );
};

export default IndexPage;
