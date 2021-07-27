import React, { useEffect } from "react";
import { Link } from "gatsby";
import UIKit from "uikit/dist/js/uikit.min.js";

import logo from "../asset/images/logo.png";

const IndexPage = () => {
  useEffect(() => {
    UIKit.navbar("#navbar");
  }, []);

  return (
    <div className="uk-flex uk-flex-column" style={{ height: "100vh" }}>
      <nav
        id="navbar"
        class="uk-navbar-container"
        uk-navbar
        style={{ backgroundColor: "#FFFFFF" }}
      >
        <div class="uk-navbar-left uk-margin-small-left">
          <Link to="/">
            <img src={logo} alt="Logo" width="200" height="80" />
          </Link>
        </div>

        <div class="uk-navbar-right uk-margin-small-right">
          <ul class="uk-navbar-nav">
            <li>
              <Link to="/login">Đăng nhập</Link>
            </li>
          </ul>
        </div>
      </nav>
      <div className="uk-padding" style={{ flexGrow: 1 }}>
        <div className="uk-flex uk-height-1-1">
          <div
            className="uk-padding uk-padding-remove-vertical"
            style={{ flex: 2 }}
          >
            <h2 className="uk-text-success">Hướng dẫn sử dụng phần mềm</h2>
            <p>
              Ứng dụng thi trắc nghiệm online là một hệ thống phần mềm tổ chức
              thi trắc nghiệm, thực hiện việc biên tập ngân hàng câu hỏi, tạo đề
              thi và kể cả chấm điểm
            </p>
            <div className="uk-padding uk-padding-remove-vertical uk-padding-remove-right">
              <p>
                Bước 1: Thông thường những phần mềm tạo đề thi trắc nghiệm trực
                tuyến có thể triển khai
              </p>
              <p>
                Bước 2: Những phần mềm được áp dụng đa dạng từ các trường học
              </p>
              <p>
                Bước 3: Hệ thống thi trắc nghiệm online đã giúp đỡ không ít cho
                việc tổ chức thi hiện nay, đem lại những hiệu quả ưu việt
              </p>
            </div>
          </div>
          <div style={{ flex: 3 }}>
            <iframe
              src="https://www.youtube.com/embed/dQw4w9WgXcQ"
              frameborder="0"
              uk-video="automute: true"
              style={{
                display: "block",
                width: "100%",
                height: "100%",
                flexGrow: 1,
              }}
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IndexPage;
