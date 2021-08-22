import React from "react";
import { ResponsiveFlexWrapper } from "../../utils/ui";

const AdminHome = () => {
  return (
    <div className="uk-padding" style={{ flexGrow: 1 }}>
      <ResponsiveFlexWrapper className="uk-height-1-1">
        <div
          className="uk-padding uk-padding-remove-vertical"
          style={{ flex: 2 }}
        >
          <h2 className="uk-text-success">Hướng dẫn sử dụng phần mềm</h2>
          <p>
            Ứng dụng thi trắc nghiệm online là một hệ thống phần mềm tổ chức thi
            trắc nghiệm, thực hiện việc biên tập ngân hàng câu hỏi, tạo đề thi
            và kể cả chấm điểm
          </p>
          <div className="uk-padding uk-padding-remove-vertical uk-padding-remove-right">
            <p>
              Bước 1: Thông thường những phần mềm tạo đề thi trắc nghiệm trực
              tuyến có thể triển khai
            </p>
            <p>Bước 2: Những phần mềm được áp dụng đa dạng từ các trường học</p>
            <p>
              Bước 3: Hệ thống thi trắc nghiệm online đã giúp đỡ không ít cho
              việc tổ chức thi hiện nay, đem lại những hiệu quả ưu việt
            </p>
          </div>
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

export default AdminHome;
