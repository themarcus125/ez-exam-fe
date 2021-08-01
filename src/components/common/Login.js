import React, { useState, useEffect } from "react";
import { navigate } from "gatsby";
import styled from "styled-components";
import { handleLogin, isLoggedIn, isBrowser } from "../../utils/auth";
import background_admin from "../../asset/images/background_admin.jpg";
import background_examinee from "../../asset/images/background_examinee.jpg";
import background_examiner from "../../asset/images/background_examiner.jpg";
let role = "";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleChangeEmail = (e) => {
    setEmail(e.target.value);
  };

  const handleChangePassword = (e) => {
    setPassword(e.target.value);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const isLoginSuccess = handleLogin({ email, password }, (roleUser) => {
      navigate(`${roleUser}`);
      role = roleUser;
    });
    if (!isLoginSuccess) {
      alert("Invalid login credentials");
    }
  };

  useEffect(() => {
    const loginPageEl = document.querySelector("#login_page");
    if (loginPageEl) {
      let background = "";
      if (role === "admin") {
        background = background_admin;
      }
      if (role === "examinee") {
        background = background_examinee;
      }
      if (role === "examiner") {
        background = background_examiner;
      }
      loginPageEl.style.backgroundImage = `url(${background})`;
    }
  }, []);

  return (
    <div
      id="login_page"
      className="uk-flex uk-flex-center uk-flex-middle uk-background-cover"
      style={{
        height: "100%",
        width: "100%",
        position: "absolute",
        left: 0,
      }}
    >
      <div className="uk-width-1-3 uk-background-default uk-border-rounded uk-padding">
        <form className="uk-form" onSubmit={onSubmit}>
          <fieldset className="uk-fieldset">
            <legend className="uk-legend">Login</legend>
            <div className="uk-margin">
              <input
                required
                className="uk-input"
                type="text"
                placeholder="Email"
                value={email}
                onChange={handleChangeEmail}
              />
            </div>
            <div className="uk-margin">
              <input
                required
                className="uk-input"
                type="password"
                placeholder="Password"
                value={password}
                onChange={handleChangePassword}
              />
            </div>
            <button className="uk-button">Login</button>
          </fieldset>
        </form>
      </div>
    </div>
  );
};

export default Login;
