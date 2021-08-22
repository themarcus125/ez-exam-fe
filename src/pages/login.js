import React, { useState, useEffect } from "react";
import { navigate } from "gatsby";
import { Helmet } from "react-helmet";
import styled from "styled-components";
import { handleLogin, getUserRole } from "../utils/auth";
import background_examinee from "../asset/images/background_examinee.jpg";
import LoadingOverlay from "../components/common/LoadingOverlay";

const LoginPageWrapper = styled.div`
  height: 100%;
  width: 100%;
  position: absolute;
  left: 0;
  @media only screen and (max-width: 639px) {
    height: auto;
    .uk-border-rounded {
      border-radius: 0px;
    }
  }
`;

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setisLoading] = useState(true);

  const handleChangeEmail = (e) => {
    setEmail(e.target.value);
  };

  const handleChangePassword = (e) => {
    setPassword(e.target.value);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    handleLogin(
      { email, password },
      (role) => {
        navigate(`${role}`);
      },
      () => {
        alert(
          "Đã có lỗi xảy ra, vui lòng kiểm tra lại thông tin đăng nhập của bạn và thử lại.",
        );
      },
    );
  };

  useEffect(() => {
    const fetchUserRole = async () => {
      const role = await getUserRole();
      if (role) {
        return navigate(`/${role}`);
      }
      setisLoading(false);
    };
    fetchUserRole();
  }, []);

  return (
    <>
      <Helmet title="Đăng nhập - EzExam" defer={false} />

      <LoginPageWrapper
        id="login_page"
        className="uk-flex uk-flex-center uk-flex-middle uk-background-cover"
        style={{
          backgroundImage: `url(${background_examinee})`,
        }}
      >
        <div className="uk-width-1-2@s uk-width-1-3@l uk-background-default uk-border-rounded uk-padding">
          <form className="uk-form" onSubmit={onSubmit}>
            <fieldset className="uk-fieldset">
              <legend className="uk-legend">Đăng nhập vào EzExam</legend>
              <div className="uk-margin">
                <input
                  required
                  className="uk-input"
                  type="text"
                  placeholder="Tên đăng nhập"
                  value={email}
                  onChange={handleChangeEmail}
                />
              </div>
              <div className="uk-margin">
                <input
                  required
                  className="uk-input"
                  type="password"
                  placeholder="Mật khẩu"
                  value={password}
                  onChange={handleChangePassword}
                />
              </div>
              <button className="uk-button">Đăng nhập</button>
            </fieldset>
          </form>
        </div>
      </LoginPageWrapper>
      <LoadingOverlay isLoading={isLoading} />
    </>
  );
};

export default Login;
