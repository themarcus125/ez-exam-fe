import React from "react";
import { Router } from "@reach/router";
import AdminLayout from "../layout/AdminLayout";
import { ADMIN_ROLE, EXAMINER_ROLE } from "../utils/roles";
import AdminHome from "../components/admin/AdminHome";
import Accounts from "../components/admin/Accounts";
import AccountForm from "../components/admin/AccountForm";
import PrivateRoute from "../components/common/PrivateRoute";
import Exam from "../components/common/Exam";
import ExamAdd from "../components/common/ExamAdd";
import AccountFromFile from "../components/admin/AccountFromFile";
import Question from "../components/common/Question";
import QuestionAdd from "../components/common/QuestionAdd";
import QuestionList from "../components/common/QuestionList";
import ExamRoom from "../components/common/ExamRoom";
import Course from "../components/common/Course";
import CourseAdd from "../components/common/CourseAdd";

const AdminDashboard = () => {
  const role = ADMIN_ROLE;
  return (
    <AdminLayout>
      <Router basepath={`/${role}`}>
        <PrivateRoute
          role={role}
          path="/"
          component={AdminHome}
          title="Trang chủ"
        />
        <PrivateRoute
          role={role}
          path="/account"
          component={Accounts}
          title="Tài khoản"
        />
        <PrivateRoute
          role={role}
          path="/account/add"
          component={AccountForm}
          title="Thêm tài khoản"
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
          path="/account/add-from-file"
          component={AccountFromFile}
          title="Thêm tài khoản từ file"
        />
        <PrivateRoute
          role={role}
          path="/account/:userId"
          component={AccountForm}
          title="Chỉnh sửa tài khoản"
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
          path="/examroom"
          component={ExamRoom}
          title="Phòng thi"
        />
        <PrivateRoute
          role={role}
          path="/course"
          component={Course}
          title="Môn học"
        />
        <PrivateRoute
          role={role}
          path="/course/add"
          component={CourseAdd}
          title="Thêm môn học"
        />
        <PrivateRoute
          role={role}
          path="/course/:courseId"
          component={CourseAdd}
          title="Cập nhật môn học"
        />
      </Router>
    </AdminLayout>
  );
};

export default AdminDashboard;
