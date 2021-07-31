import React from "react";
import classNames from "classnames";
import { ADMIN_ROLE } from "../utils/roles";

const AdminLayout = ({ children }) => {
  return <div className={classNames([ADMIN_ROLE, "layout"])}>{children}</div>;
};

export default AdminLayout;
