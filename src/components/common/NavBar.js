import React, { useEffect } from "react";
import UIKit from "uikit/dist/js/uikit.min.js";
import { navigate, Link } from "gatsby";

import { logout, getUser } from "../../utils/auth";
import logo from "../../asset/images/logo.png";
import { navBarCategories } from "../../utils/constants";

const NavBar = ({ role }) => {
  const userEmail = getUser()?.email;
  const categories = navBarCategories["admin"];

  useEffect(() => {
    UIKit.navbar("#navbar");
  }, []);

  const onLogout = () => {
    logout(() => navigate(`/${role}/login`));
  };

  return (
    <div uk-sticky="sel-target: .uk-navbar-container; cls-active: uk-navbar-sticky">
      <nav
        id="navbar"
        class="uk-navbar-container"
        style={{ backgroundColor: "#FFFFFF" }}
        uk-navbar
      >
        <div class="uk-navbar-left uk-margin-small-left">
          <ul class="uk-navbar-nav">
            <Link to="/examiner">
              <img src={logo} alt="Logo" width="200" height="80" />
            </Link>

            {categories.map((category) => {
              return (
                <li class="uk-flex uk-flex-middle">
                  <Link
                    to={
                      category?.subCategories ? "" : `/examiner${category.path}`
                    }
                  >
                    {category.title}
                  </Link>
                  {category?.subCategories && (
                    <div class="uk-navbar-dropdown">
                      <ul class="uk-nav uk-navbar-dropdown-nav">
                        {category.subCategories.map((subCategory) => {
                          return (
                            <li>
                              <Link to={`/examiner${category.path}`}>
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
        <div class="uk-navbar-right uk-margin-small-right">
          <ul class="uk-navbar-nav">
            <li>
              <span>
                {userEmail}
                <span class="uk-icon" uk-icon="icon: triangle-down"></span>
              </span>
              <div class="uk-navbar-dropdown">
                <ul class="uk-nav uk-navbar-dropdown-nav">
                  <li>
                    <Link to={`/examiner`}>Tài khoản</Link>
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
