import React, { useEffect } from "react";
import { Link, navigate } from "gatsby";
import UIKit from "uikit/dist/js/uikit.min.js";

import logo from "../asset/images/logo.png";
import { getUser } from "../utils/auth";
import { userRoleToPath } from "../utils/constants";

import Home from "../components/common/Home";

const IndexPage = () => {
  useEffect(() => {
    UIKit.navbar("#navbar");
  }, []);

  const onLogin = () => {
    const { role = "" } = getUser();
    if (!role) {
      return navigate("/login");
    }

    const path = userRoleToPath[role] || "examinee";
    navigate(`/${path}`);
  };

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
              <a onClick={onLogin}>Đăng nhập</a>
            </li>
          </ul>
        </div>
      </nav>
      <Home></Home>
    </div>
  );
};

export default IndexPage;
