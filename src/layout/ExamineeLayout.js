import React from "react";
import classNames from "classnames";
import { EXAMINER_ROLE } from "../utils/roles";

const ExamineeLayout = ({ children }) => {
  return (
    <div className={classNames([EXAMINER_ROLE, "layout"])}>{children}</div>
  );
};

export default ExamineeLayout;
