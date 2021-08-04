import React from "react";
import { Router } from "@reach/router";

import ExaminerLayout from "../layout/ExaminerLayout";
import { EXAMINER_ROLE } from "../utils/roles";
import PrivateRoute from "../components/common/PrivateRoute";
import Result from "../components/examiner/Result";
import Exam from "../components/common/Exam";
import ExamAdd from "../components/common/ExamAdd";

const ExaminerDashboard = () => {
  const role = EXAMINER_ROLE;
  return (
    <ExaminerLayout>
      <Router basepath={`/${role}`}>
        <PrivateRoute role={role} path="/" component={Result} />
        <PrivateRoute role={role} path="/exam" component={Exam} />
        <PrivateRoute role={role} path="/exam/add" component={ExamAdd} />
      </Router>
    </ExaminerLayout>
  );
};

export default ExaminerDashboard;
