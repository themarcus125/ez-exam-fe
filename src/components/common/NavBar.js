import React, { useEffect } from "react";
import UIKit from "uikit/dist/js/uikit.min.js";
import { Link } from "gatsby";

import { navigate } from "../../utils/common";
import { logout, getUser } from "../../utils/auth";
import logo from "../../asset/images/logo.png";
import { navBarCategories, userRoleToPath } from "../../utils/constants";

const NavBar = () => {
  const { email: userEmail, role: userRole } = getUser();
  const rootPath = userRoleToPath[userRole] || "examinee";
  const categories = navBarCategories[userRole] || navBarCategories["sinhvien"];

  useEffect(() => {
    UIKit.navbar("#navbar");
  }, []);

  const onLogout = () => {
    logout(() => navigate(`/`));
  };

  return (
    <div uk-sticky="sel-target: .uk-navbar-container; cls-active: uk-navbar-sticky">
      <nav
        id="navbar"
        className="uk-navbar-container"
        style={{ backgroundColor: "#FFFFFF" }}
        uk-navbar
      >
        <div className="uk-navbar-left uk-margin-small-left">
          <ul className="uk-navbar-nav">
            <Link to={`/${rootPath}`}>
              <img src={logo} alt="Logo" width="200" height="80" />
            </Link>

            {categories.map((category) => {
              return (
                <li className="uk-flex uk-flex-middle">
                  <Link
                    to={
                      category?.subCategories
                        ? ""
                        : `/${rootPath}${category.path}`
                    }
                  >
                    {category.title}
                  </Link>
                  {category?.subCategories && (
                    <div className="uk-navbar-dropdown">
                      <ul className="uk-nav uk-navbar-dropdown-nav">
                        {category.subCategories.map((subCategory) => {
                          return (
                            <li>
                              <Link
                                to={`/${rootPath}${category.path}${subCategory.path}`}
                              >
                                {subCategory.title}
                              </Link>
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
        <div className="uk-navbar-right uk-margin-small-right">
          <ul className="uk-navbar-nav">
            <li>
              <span>
                {userEmail}
                <span className="uk-icon" uk-icon="icon: triangle-down"></span>
              </span>
              <div className="uk-navbar-dropdown">
                <ul className="uk-nav uk-navbar-dropdown-nav">
                  <li>
                    <Link to={`/${rootPath}`}>Tài khoản</Link>
                  </li>
                  <li>
                    <a onClick={onLogout}>Đăng xuất</a>
                  </li>
                </ul>
              </div>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default NavBar;
