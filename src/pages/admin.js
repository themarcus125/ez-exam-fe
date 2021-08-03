import React from "react";
import { Router } from "@reach/router";
import AdminLayout from "../layout/AdminLayout";
import { ADMIN_ROLE, EXAMINER_ROLE } from "../utils/roles";
import Home from "../components/admin/Home";
import Accounts from "../components/admin/Accounts";
import AccountForm from "../components/admin/AccountForm";
import PrivateRoute from "../components/common/PrivateRoute";
import AccountFromFile from "../components/admin/AccountFromFile";

const AdminDashboard = () => {
  const role = ADMIN_ROLE;
  return (
    <AdminLayout>
      <Router basepath={`/${role}`}>
        <PrivateRoute role={role} path="/" component={Home} />
        <PrivateRoute role={role} path="/account" component={Accounts} />
        <PrivateRoute role={role} path="/account/add" component={AccountForm} />
        <PrivateRoute
          role={role}
          path="/account/add-from-file"
          component={AccountFromFile}
        />
        <PrivateRoute
          role={role}
          path="/account/:userId"
          component={AccountForm}
        />
      </Router>
    </AdminLayout>
  );
};

export default AdminDashboard;
