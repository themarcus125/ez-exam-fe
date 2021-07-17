import React from "react";
import { Link } from "gatsby";

const NavBar = () => {
  return (
    <div className="uk-flex uk-flex-column uk-width-1-5 uk-height-1-1">
      <div className="uk-flex uk-flex-1 uk-padding-small">
        <h3>Welcome</h3>
      </div>
      <div className="uk-padding-small">
        <Link>Log out</Link>
      </div>
    </div>
  );
};

export default NavBar;
