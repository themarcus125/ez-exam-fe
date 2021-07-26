import React from "react";
import { navigate } from "gatsby";
import { isLoggedIn } from "../../utils/auth";
import NavBar from "./NavBar";

const PrivateRoute = ({ component: Component, role, location, ...rest }) => {
  if (!isLoggedIn(role) && location.pathname !== `/${role}/login`) {
    navigate(`/${role}/login`);
    return null;
  }
  return (
    <div>
      <NavBar role={role} />
      <Component {...rest} />
    </div>
  );
};
export default PrivateRoute;
