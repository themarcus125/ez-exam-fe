import React, { useState } from "react";
import { navigate } from "gatsby";
import { handleLogin, isLoggedIn, isBrowser } from "../../utils/auth";

const Login = ({ role }) => {
  if (isBrowser && isLoggedIn(role)) {
    navigate(`/${role}`);
    return <></>;
  }

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
    const isLoginSuccess = handleLogin({ email, password, role }, () => {
      navigate(`/${role}`);
    });
    if (!isLoginSuccess) {
      alert("Invalid login credentials");
    }
  };

  return (
    <div
      className="uk-flex uk-flex-center uk-flex-middle"
      style={{
        height: "100%",
        width: "100%",
        position: "absolute",
        left: 0,
        backgroundColor: "#D1D1D1",
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
                type="email"
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
