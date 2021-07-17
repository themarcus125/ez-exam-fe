import React from "react";
import { navigate } from "gatsby";
import { logout, getUser } from "../../utils/auth";
import { EXAMINEE_ROLE } from "../../utils/roles";

const NavBar = () => {
  const userEmail = getUser()?.email;

  const onLogout = () => {
    logout(() => navigate(`/${EXAMINEE_ROLE}/login`));
  };

  return (
    <div className="uk-flex uk-flex-column uk-width-1-5 uk-height-1-1">
      <div className="uk-flex uk-flex-1 uk-padding-small">
        <h3>Welcome, {userEmail}</h3>
      </div>
      <div className="uk-padding-small">
        <button className="uk-button uk-button-default" onClick={onLogout}>
          Log out
        </button>
      </div>
    </div>
  );
};

export default NavBar;
