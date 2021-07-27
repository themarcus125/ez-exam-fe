import React from "react";
import { navigate } from "gatsby";
import { isLoggedIn } from "../../utils/auth";
const PrivateRoute = ({ component: Component, role, location, ...rest }) => {
  if (!isLoggedIn(role) && location.pathname !== `/login`) {
    navigate(`/login`);
    return null;
  }
  return <Component {...rest} />;
};
export default PrivateRoute;
