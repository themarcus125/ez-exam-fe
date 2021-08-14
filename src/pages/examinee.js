import React from "react";
import { Router } from "@reach/router";
import ExamineeLayout from "../layout/ExamineeLayout";
import { EXAMINEE_ROLE } from "../utils/roles";
import MainCourses from "../components/examinee/MainCourses";
import ExamTaker from "../components/examinee/ExamTaker";
import PrivateRoute from "../components/common/PrivateRoute";
import ExamineeHome from "../components/examinee/ExamineeHome";
import ExamineeRoom from "../components/examinee/ExamineeRoom";

const ExamineeDashboard = () => {
  const role = EXAMINEE_ROLE;
  return (
    <ExamineeLayout>
      <Router basepath={`/${role}`}>
        <PrivateRoute
          role={role}
          path="/"
          component={ExamineeHome}
          title="Trang chủ"
        />
        <PrivateRoute
          role={role}
          path="/exam-taker"
          component={ExamTaker}
          title="Vào thi"
        />
        <PrivateRoute
          role={role}
          path="/exam-room"
          component={ExamineeRoom}
          title="Phòng thi"
        />
      </Router>
    </ExamineeLayout>
  );
};

export default ExamineeDashboard;
