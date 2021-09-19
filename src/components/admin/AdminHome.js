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
          <h3 className="uk-text-success uk-text-bold uk-text-uppercase uk-flex uk-flex-center">
            Hướng dẫn sử dụng phần mềm
          </h3>
          <p>
            Phần mềm EzExam là một ứng dụng thi online, hỗ trợ tổ chức thi trắc
            nghiệm, thực hiện việc biên tập ngân hàng câu hỏi, tạo đề thi, chấm
            thi, quản lý tài khoản, ...
          </p>
          <p className="uk-margin-remove-bottom">
            Các chức năng trong phân hệ admin:
          </p>
          <div className="uk-margin-left">
            <p className="uk-margin-remove-bottom uk-text-bold">- Môn học</p>
            <ul className="uk-margin-remove-top">
              <li>
                Danh sách môn học: Xem danh sách môn học, cho phép thêm mới và
                sửa thông tin môn học
              </li>
              <li>
                Thêm môn học cho sinh viên: Cho phép thêm các môn học mà sinh
                viên đã đăng kí
              </li>
            </ul>
            <p>
              - <b>Tài khoản</b>: Xem danh sách tài khoản, thêm mới tài khoản
              bằng cách import từ file excel, cho phép sửa thông tin tài khoản
              và reset mật khẩu
            </p>
          </div>
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

export default AdminHome;
