import React from "react";
import { navigate } from "../../utils/common";
import { isLoggedIn, getUser } from "../../utils/auth";
import { userRoleToPath } from "../..//utils/constants";
import NavBar from "./NavBar";

const PrivateRoute = ({ component: Component, role, location, ...rest }) => {
  const user = getUser();
  if (!user.role && location.pathname !== `/login`) {
    navigate(`/login`);
    return null;
  }

  const pathToReturn = userRoleToPath[user.role] ?? "examinee";
  if (!isLoggedIn(role)) {
    navigate(`/${pathToReturn}`);
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
