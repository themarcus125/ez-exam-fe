import React, { useEffect, useRef } from "react";
import UIKit from "uikit/dist/js/uikit.min.js";
import { Link } from "gatsby";
import styled, { css } from "styled-components";

import { navigate } from "../../utils/common";
import { logout, getUser } from "../../utils/auth";
import logo from "../../asset/images/logo.png";
import { navBarCategories, userRoleToPath } from "../../utils/constants";

const NavBar = () => {
  const { username: userName, role: userRole } = getUser();
  const rootPath = userRoleToPath[userRole] || "examinee";
  const categories = navBarCategories[userRole] || navBarCategories["sinhvien"];
  const isCanvasOpen = useRef(false);

  useEffect(() => {
    UIKit.navbar("#navbar");
  }, []);

  const onLogout = (e) => {
    e.preventDefault();
    logout(() => navigate(`/`));
  };

  const onToggle = () => {
    if (isCanvasOpen.current) {
      UIKit.offcanvas("#offcanvas-slide").hide();
    } else {
      UIKit.offcanvas("#offcanvas-slide").show();
    }
  };

  return (
    <div uk-sticky="sel-target: .uk-navbar-container; cls-active: uk-navbar-sticky">
      <nav
        id="navbar"
        className="uk-navbar-container"
        style={{ backgroundColor: "#FFFFFF" }}
        uk-navbar=""
      >
        <div className="uk-navbar-left uk-margin-small-left">
          <ul className="uk-navbar-nav">
            <HamburgerButton
              className="uk-button"
              type="button"
              onClick={onToggle}
            >
              <span uk-icon="icon: table"></span>
            </HamburgerButton>

            <Link to={`/${rootPath}`}>
              <img src={logo} alt="Logo" width="200" height="80" />
            </Link>

            {categories.map((category, index) => {
              return (
                <NavBarItem key={index} className="uk-flex uk-flex-middle">
                  <Link
                    to={
                      category?.subCategories
                        ? `/${rootPath}${category?.subCategories[0]?.path}`
                        : `/${rootPath}${category.path}`
                    }
                  >
                    {category.title}
                  </Link>
                  {category?.subCategories && (
                    <div className="uk-navbar-dropdown">
                      <ul className="uk-nav uk-navbar-dropdown-nav">
                        {category.subCategories.map((subCategory, index) => {
                          return (
                            <li key={index}>
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
                </NavBarItem>
              );
            })}
          </ul>
        </div>
        <div className="uk-navbar-right uk-margin-right">
          <ul className="uk-navbar-nav">
            <li>
              <div className="uk-flex uk-flex-middle">
                <div className="uk-width-auto">
                  <div
                    className="uk-border-circle uk-flex uk-flex-center uk-flex-middle uk-margin-small-right"
                    style={{
                      width: "40px",
                      height: "40px",
                      backgroundColor: "#32d296",
                      textTransform: "uppercase",
                      color: "#FFFFFF",
                    }}
                  >
                    {userName.slice(0, 2)}
                  </div>
                </div>
                <span>
                  {userName}
                  <span
                    className="uk-icon"
                    uk-icon="icon: triangle-down"
                  ></span>
                </span>
              </div>
              <div className="uk-navbar-dropdown">
                <ul className="uk-nav uk-navbar-dropdown-nav">
                  <li>
                    <Link to={`/${rootPath}`}>Tài khoản</Link>
                  </li>
                  <li>
                    <a href="logout" onClick={onLogout}>
                      Đăng xuất
                    </a>
                  </li>
                </ul>
              </div>
            </li>
          </ul>
        </div>
      </nav>
      <div id="offcanvas-slide" uk-offcanvas="overlay: true">
        <div className="uk-offcanvas-bar" style={{ backgroundColor: "#FFF" }}>
          <button
            className="uk-offcanvas-close"
            type="button"
            uk-close="true"
            style={{ color: "#222" }}
          ></button>

          <ul className="uk-nav">
            {categories.map((category, index) => {
              return (
                <NavBarItem canvas key={index} className="uk-parent">
                  <Link
                    to={
                      category?.subCategories
                        ? `/${rootPath}${category?.subCategories[0]?.path}`
                        : `/${rootPath}${category.path}`
                    }
                    style={{ color: "#222" }}
                  >
                    {category.title}
                  </Link>
                  {category?.subCategories && (
                    <ul className="uk-nav-sub">
                      {category.subCategories.map((subCategory, index) => {
                        return (
                          <li key={index}>
                            <Link
                              to={`/${rootPath}${category.path}${subCategory.path}`}
                              style={{ color: "#222" }}
                            >
                              {subCategory.title}
                            </Link>
                          </li>
                        );
                      })}
                    </ul>
                  )}
                </NavBarItem>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default NavBar;

const NavBarItem = styled.li`
  @media (max-width: 1320px) {
    ${(props) =>
      !props.canvas &&
      css`
        display: none;
      `}
  }
`;

const HamburgerButton = styled.button`
  display: none;
  align-self: center;
  padding: 10px;
  background-color: #f8f8f8;
  border: none;
  @media (max-width: 1320px) {
    display: inline-block;
  }
`;
