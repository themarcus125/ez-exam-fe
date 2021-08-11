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
import ExaminerHome from "../components/examiner/ExaminerHome";

const ExaminerDashboard = () => {
  const role = EXAMINER_ROLE;
  return (
    <ExaminerLayout>
      <Router basepath={`/${role}`}>
        <PrivateRoute
          role={role}
          path="/"
          component={ExaminerHome}
          title="Trang chủ"
        />
        <PrivateRoute
          role={role}
          path="/exam"
          component={Exam}
          title="Đề thi"
        />
        <PrivateRoute
          role={role}
          path="/exam/add"
          component={ExamAdd}
          title="Thêm đề thi"
        />
        <PrivateRoute
          role={role}
          path="/examroom"
          component={ExamRoom}
          title="Phòng thi"
        />
        <PrivateRoute
          role={role}
          path="/examroom/add"
          component={ExamRoomAdd}
          title="Thêm phòng thi"
        />
        <PrivateRoute
          role={role}
          path="/questionaire"
          component={Question}
          title="Danh sách câu hỏi"
        />
        <PrivateRoute
          role={role}
          path="/questionaire/add"
          component={QuestionAdd}
          title="Thêm câu hỏi"
        />
        <PrivateRoute
          role={role}
          path="/question-list"
          component={QuestionList}
          title="Bộ câu hỏi"
        />

        <PrivateRoute
          role={role}
          path="/examroom/:roomId"
          component={ExamRoomAdd}
          title="Cập nhật phòng thi"
        />
      </Router>
    </ExaminerLayout>
  );
};

export default ExaminerDashboard;
