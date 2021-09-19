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
          <h3 className="uk-text-success uk-text-bold uk-text-uppercase uk-flex uk-flex-center">
            Hướng dẫn sử dụng phần mềm
          </h3>
          <p>
            Phần mềm EzExam là một ứng dụng thi online, hỗ trợ tổ chức thi trắc
            nghiệm, thực hiện việc biên tập ngân hàng câu hỏi, tạo đề thi, chấm
            thi, quản lý tài khoản, ...
          </p>
          <p className="uk-margin-remove-bottom">
            Các chức năng trong phân hệ giáo viên:
          </p>
          <p className="uk-margin-remove-bottom uk-text-bold">
            - Ngân hàng câu hỏi
          </p>
          <ul className="uk-margin-remove-top">
            <li>
              Thêm câu hỏi: Thêm mới các câu hỏi tự luận và trắc nghiệm vào ngân
              hàng câu hỏi
            </li>
            <li>
              Danh sách câu hỏi: Xem danh sách các câu hỏi tự luận và trắc
              nghiệm trong ngân hàng câu hỏi
            </li>
          </ul>
          <p className="uk-margin-remove-bottom uk-text-bold">
            - Quản lý đề thi
          </p>
          <ul className="uk-margin-remove-top">
            <li>
              Tạo đề thi: Tạo đề thi bằng cách thêm mới câu hỏi hoặc sử dụng lại
              các câu hỏi có sẵn trong ngân hàng câu hỏi, cho phép nhập điểm và
              tạo bộ đề
            </li>
            <li>
              Danh sách đề thi: Xem danh sách các đề thi, cho phép tạo bản sao,
              xem chi tiết, sửa hoặc xóa đề thi chưa được sử dụng
            </li>
          </ul>
          <p className="uk-margin-remove-bottom uk-text-bold">
            - Quản lý phòng thi thi
          </p>
          <ul className="uk-margin-remove-top">
            <li>
              Tạo phòng thi: Tạo mới phòng thi, cho phép xem danh sách các sinh
              viên của môn học
            </li>
            <li>
              Danh sách phòng thi: Xem danh sách các phòng thi, cho phép xem báo
              cáo tổng hợp và sửa thông tin phòng thi khi chưa sử dụng, xem danh
              sách các bài thi của sinh viên, chấm điểm và xem video report quá
              trình thi của sinh viên
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

export default ExaminerHome;
