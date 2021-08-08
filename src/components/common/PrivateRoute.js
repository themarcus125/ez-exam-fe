import React from "react";
import { Helmet } from "react-helmet";
import { navigate } from "../../utils/common";
import { isLoggedIn, getUser } from "../../utils/auth";
import { userRoleToPath } from "../..//utils/constants";
import NavBar from "./NavBar";

const PrivateRoute = ({
  component: Component,
  role,
  location,
  title,
  ...rest
}) => {
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
      <Helmet title={`${title} - EzExam`} defer={false} />

      <NavBar />
      <Component {...rest} />
    </div>
  );
};
export default PrivateRoute;
