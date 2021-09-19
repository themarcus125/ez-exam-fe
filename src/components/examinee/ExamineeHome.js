import React from "react";
import { ResponsiveFlexWrapper } from "../../utils/ui";

const ExamineeHome = () => {
  return (
    <div className="uk-padding" style={{ flexGrow: 1 }}>
      <ResponsiveFlexWrapper className="uk-height-1-1">
        <div
          className="uk-padding uk-padding-remove-vertical"
          style={{ flex: 2 }}
        >
          <h3 className="uk-text-success uk-text-bold uk-text-uppercase uk-flex uk-flex-center">
            Hướng dẫn sử dụng phần mềm
          </h3>
          <p>
            Phần mềm EzExam là một ứng dụng thi online, hỗ trợ tổ chức thi trắc
            nghiệm, thực hiện việc biên tập ngân hàng câu hỏi, tạo đề thi, chấm
            thi, quản lý tài khoản, ...
          </p>
          <p className="uk-margin-remove-bottom">
            Các chức năng trong phân hệ sinh viên:
          </p>
          <ul className="uk-margin-bottom">
            <li className="uk-margin-bottom">
              <b>Phòng thi</b>: Xem danh sách các phòng thi hiện có, khi đến
              thời gian bắt đầu phòng thi, sinh viên có thể vào phòng thi để chờ
              và kiểm tra Microphone, Webcam, khi đến thời gian bắt đầu làm bài
              sinh viên tiến hành làm bài theo quy định
            </li>
            <li className="uk-margin-bottom">
              <b>Xem kết quả kiểm tra</b>: Xem danh sách điểm của các bài thi
            </li>
          </ul>
          <small>
            Nếu có trục trặc xin vui lòng liện hệ qlqtpm.20hcb@gmail.com
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

export default ExamineeHome;
