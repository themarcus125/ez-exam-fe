import React from "react";
import { Router } from "@reach/router";

import ExaminerLayout from "../layout/ExaminerLayout";
import { EXAMINER_ROLE } from "../utils/roles";
import PrivateRoute from "../components/common/PrivateRoute";
import Home from "../components/examiner/Home";
import Result from "../components/examiner/Result";
import Questionaire from "../components/examiner/Questionaire";

const ExaminerDashboard = () => {
  const role = EXAMINER_ROLE;
  return (
    <ExaminerLayout>
      <Router basepath={`/${role}`}>
        <PrivateRoute role={role} path="/" component={Home} />
        <PrivateRoute
          role={role}
          path="/questionaire"
          component={Questionaire}
        />
      </Router>
    </ExaminerLayout>
  );
};

export default ExaminerDashboard;
