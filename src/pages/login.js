import React from "react";
import { Router } from "@reach/router";
import Login from "../components/common/Login";

const LoginPage = () => {
  return (
      <Router>
        <Login path="/login" />
      </Router>
  );
};
export default LoginPage;