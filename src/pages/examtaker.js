import React from "react";
import { Router } from "@reach/router";
import ExamTakerLayout from "../layout/ExamTakerLayout";
import { EXAMINEE_ROLE } from "../utils/roles";
import ExamTaker from "../components/examinee/ExamTaker";
import Login from "../components/examinee/Login";
import PrivateRoute from "../components/common/PrivateRoute";

const ExamineeDashboard = () => {
  const role = EXAMINEE_ROLE;
  return (
    <ExamTakerLayout>
        <PrivateRoute path="/examtaker" component={ExamTaker} />
    </ExamTakerLayout>
  );
};

export default ExamineeDashboard;
