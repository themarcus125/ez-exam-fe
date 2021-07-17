import React from "react";
import { Router } from "@reach/router";
import ExamineeLayout from "../layout/ExamineeLayout";
import { EXAMINEE_ROLE } from "../utils/roles";
import Default from "../components/examinee/Default";
import Login from "../components/examinee/Login";
import PrivateRoute from "../components/common/PrivateRoute";

const ExamineeDashboard = () => {
  const role = EXAMINEE_ROLE;
  return (
    <ExamineeLayout>
      <Router basepath={`/${role}`}>
        <Login path="/login" />
        <PrivateRoute role={role} path="/" component={Default} />
      </Router>
    </ExamineeLayout>
  );
};

export default ExamineeDashboard;