import React from "react";
import { Router } from "@reach/router";
import AdminLayout from "../layout/AdminLayout";
import { ADMIN_ROLE, EXAMINER_ROLE } from "../utils/roles";
import Home from "../components/admin/Home";
import Accounts from "../components/admin/Accounts";
import AccountForm from "../components/admin/AccountForm";
import PrivateRoute from "../components/common/PrivateRoute";
import Exam from "../components/common/Exam";
import ExamAdd from "../components/common/ExamAdd";
import AccountFromFile from "../components/admin/AccountFromFile";
import ExamRoom from "../components/common/ExamRoom";
import ExamRoomAdd from "../components/common/ExamRoomAdd";

const AdminDashboard = () => {
  const role = ADMIN_ROLE;
  return (
    <AdminLayout>
      <Router basepath={`/${role}`}>
        <PrivateRoute role={role} path="/" component={Home} title="Trang chủ" />
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
          path="/examroom/:roomId"
          component={ExamRoomAdd}
          title="Cập nhật phòng thi"
        />
        <PrivateRoute role={role} path="/examroom/:roomId" component={ExamRoomAdd} />
      </Router>
    </AdminLayout>
  );
};

export default AdminDashboard;
