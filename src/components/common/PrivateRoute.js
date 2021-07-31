import React from "react";
import { navigate } from "gatsby";
import { isLoggedIn } from "../../utils/auth";
import NavBar from "./NavBar";

const PrivateRoute = ({ component: Component, role, location, ...rest }) => {
  if (!isLoggedIn(role) && location.pathname !== `/login`) {
    navigate(`/login`);
    return null;
  }
  return (
    <div>
      <NavBar />
      <Component {...rest} />
    </div>
  );
};
export default PrivateRoute;
