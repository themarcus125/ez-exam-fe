import React from "react";
import { navigate } from "gatsby";
import { isLoggedIn } from "../../utils/auth";
const PrivateRoute = ({ component: Component, role, location, ...rest }) => {
  if (!isLoggedIn(role) && location.pathname !== `/${role}/login`) {
    navigate(`/${role}/login`);
    return null;
  }
  return <Component {...rest} />;
};
export default PrivateRoute;
