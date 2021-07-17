import React from "react";
import { Router } from "@reach/router";
import ExamineeLayout from "../layout/ExamineeLayout";
import { EXAMINEE_ROLE } from "../utils/roles";
import MainCourses from "../components/examinee/MainCourses";
import Login from "../components/common/Login";
import PrivateRoute from "../components/common/PrivateRoute";

const ExamineeDashboard = () => {
  const role = EXAMINEE_ROLE;
  return (
    <ExamineeLayout>
      <Router basepath={`/${role}`}>
        <Login path="/login" role={role} />
        <PrivateRoute role={role} path="/" component={MainCourses} />
      </Router>
    </ExamineeLayout>
  );
};

export default ExamineeDashboard;
