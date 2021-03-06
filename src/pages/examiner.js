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
import ExamGrading from "../components/examiner/ExamGrading";
import AccountInfo from "../components/common/AccountInfo";
import ExamTests from "../components/examiner/ExamTests";
import Course from "../components/common/Course";
import ExamRoomStatistics from "../components/examiner/ExamRoomStatistics";
import ExamGradingVideo from "../components/examiner/ExamGradingVideo";

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
          path="/exam/:examId"
          component={ExamAdd}
          title="Cập nhật đề thi"
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
        <PrivateRoute
          role={role}
          path="/exam-grading/:id"
          component={ExamGrading}
          title="Chấm thi"
        />
        <PrivateRoute
          role={role}
          path="/my-info"
          component={AccountInfo}
          title="Thông tin tài khoản"
        />
        <PrivateRoute
          role={role}
          path="/examroom/:examId/records"
          component={ExamTests}
          title="Danh sách bài thi"
        />
        <PrivateRoute
          role={role}
          path="/course"
          component={Course}
          title="Môn học"
        />
        <PrivateRoute
          role={role}
          path="/examroom/:examId/stats"
          component={ExamRoomStatistics}
          title="Báo cáo tổng hợp"
        />
        <PrivateRoute
          role={role}
          path="/exam-grading/:id/video"
          component={ExamGradingVideo}
          title="Báo cáo tổng hợp"
        />
      </Router>
    </ExaminerLayout>
  );
};

export default ExaminerDashboard;
