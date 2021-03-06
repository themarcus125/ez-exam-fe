import React from "react";
import classNames from "classnames";
import { EXAMINEE_ROLE } from "../utils/roles";

const ExamineeLayout = ({ children }) => {
  return (
    <div className={classNames([EXAMINEE_ROLE, "layout"])}>{children}</div>
  );
};

export default ExamineeLayout;
