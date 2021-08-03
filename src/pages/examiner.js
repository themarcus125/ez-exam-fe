import React from "react";
import { Router } from "@reach/router";

import ExaminerLayout from "../layout/ExaminerLayout";
import { EXAMINER_ROLE } from "../utils/roles";
import PrivateRoute from "../components/common/PrivateRoute";
import Home from "../components/examiner/Home";
import Result from "../components/examiner/Result";

const ExaminerDashboard = () => {
  const role = EXAMINER_ROLE;
  return (
    <ExaminerLayout>
      <Router basepath={`/${role}`}>
        <PrivateRoute role={role} path="/" component={Home} />
      </Router>
    </ExaminerLayout>
  );
};

export default ExaminerDashboard;
