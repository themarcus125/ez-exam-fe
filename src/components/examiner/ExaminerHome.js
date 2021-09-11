import React from "react";
import { ResponsiveFlexWrapper, VideoWrapper } from "../../utils/ui";

const ExaminerHome = () => {
  return (
    <div className="uk-padding" style={{ flexGrow: 1 }}>
      <ResponsiveFlexWrapper className="uk-height-1-1">
        <div
          className="uk-padding uk-padding-remove-vertical"
          style={{ flex: 2 }}
        >
          <h2 className="uk-text-success">Tổng quan phần mềm</h2>
          <p className="uk-margin-remove-bottom uk-text-large">
            Là giáo viên bạn có thể:
          </p>
          <ul className="uk-margin-remove-top uk-text-large">
            <li>Tạo/Xem danh sách câu hỏi</li>
            <li>Tạo/Xem danh sách đề thi</li>
            <li>Tạo/Xem danh sách phòng thi</li>
            <li>Xem và chấm điểm các bài thi của sinh viên</li>
          </ul>
          <small>
            Nếu có trục trặc xin vui lòng liện hệ someone.something@gmail.com
          </small>
        </div>
        <div style={{ flex: 3, height: "400px" }}>
          <iframe
            title="clip"
            src="https://www.youtube.com/embed/dQw4w9WgXcQ"
            frameBorder="0"
            uk-video="automute: true"
            style={{
              display: "block",
              width: "100%",
              height: "100%",
              flexGrow: 1,
            }}
          ></iframe>
        </div>
      </ResponsiveFlexWrapper>
    </div>
  );
};

export default ExaminerHome;
