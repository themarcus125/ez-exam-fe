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
      </Router>
    </AdminLayout>
  );
};

export default AdminDashboard;
