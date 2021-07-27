import React from "react";
import { Router } from "@reach/router";
import ExaminerLayout from "../layout/ExaminerLayout";
import { EXAMINER_ROLE } from "../utils/roles";
import Login from "../components/common/Login";
import PrivateRoute from "../components/common/PrivateRoute";
import Result from "../components/examiner/Result";

const ExaminerDashboard = () => {
  const role = EXAMINER_ROLE;
  return (
    <ExaminerLayout>
      <Router basepath={`/${role}`}>
        {/* <Login path="/login" role={role} /> */}
        <PrivateRoute role={role} path="/" component={Result} />
      </Router>
    </ExaminerLayout>
  );
};

export default ExaminerDashboard;
