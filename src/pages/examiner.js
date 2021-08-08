import React from "react";
import { Router } from "@reach/router";

import ExaminerLayout from "../layout/ExaminerLayout";
import { EXAMINER_ROLE } from "../utils/roles";
import PrivateRoute from "../components/common/PrivateRoute";
import Result from "../components/examiner/Result";
import Exam from "../components/common/Exam";
import ExamAdd from "../components/common/ExamAdd";
import ExamRoom from "../components/common/ExamRoom";
import ExamRoomAdd from "../components/common/ExamRoomAdd";
import Question from "../components/common/Question";
import QuestionAdd from "../components/common/QuestionAdd";
import QuestionList from "../components/common/QuestionList";

const ExaminerDashboard = () => {
  const role = EXAMINER_ROLE;
  return (
    <ExaminerLayout>
      <Router basepath={`/${role}`}>
        <PrivateRoute role={role} path="/" component={Result} />
        <PrivateRoute role={role} path="/exam" component={Exam} />
        <PrivateRoute role={role} path="/exam/add" component={ExamAdd} />
        <PrivateRoute role={role} path="/examroom" component={ExamRoom} />
        <PrivateRoute
          role={role}
          path="/examroom/add"
          component={ExamRoomAdd}
        />
        <PrivateRoute role={role} path="/questionaire" component={Question} />
        <PrivateRoute
          role={role}
          path="/questionaire/add"
          component={QuestionAdd}
        />
        <PrivateRoute
          role={role}
          path="/question-list"
          component={QuestionList}
        />
      </Router>
    </ExaminerLayout>
  );
};

export default ExaminerDashboard;
