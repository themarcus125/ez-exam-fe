export const navBarCategories = {
  giaovien: [
    {
      title: "Ngân hàng câu hỏi",
      path: "",
      subCategories: [
        {
          title: "Thêm câu hỏi",
          path: "/questionaire/add",
        },
        {
          title: "Danh sách môn học",
          path: "/",
        },
        {
          title: "Danh sách đã lưu",
          path: "/",
        },
      ],
    },
    {
      title: "Quản lý đề thi",
      path: "",
      subCategories: [
        {
          title: "Danh sách đề thi",
          path: "/exam",
        },
        {
          title: "Tạo đề thi",
          path: "/exam/add",
        },
      ],
    },
    {
      title: "Quản lý phòng thi",
      path: "",
      subCategories: [
        {
          title: "Danh sách phòng thi",
          path: "/examroom",
        },
        {
          title: "Tạo phòng thi",
          path: "/examroom/add",
        },
      ],
    },

    {
      title: "Kiểm tra kết quả thi",
      path: "/",
    },
    {
      title: "Thống kê",
      path: "/",
    },
  ],
  sinhvien: [
    {
      title: "Thực hiệm kiểm tra",
      path: "/",
    },
    {
      title: "Xem kết quả kiểm tra",
      path: "/",
    },
  ],
  admin: [
    {
      title: "Ngân hàng câu hỏi",
      path: "",
      subCategories: [
        {
          title: "Thêm câu hỏi",
          path: "/questionaire/add",
        },
        {
          title: "Danh sách môn học",
          path: "/",
        },
        {
          title: "Danh sách đã lưu",
          path: "/",
        },
      ],
    },
    {
      title: "Quản lý đề thi",
      path: "",
      subCategories: [
        {
          title: "Danh sách đề thi",
          path: "/exam",
        },
        {
          title: "Tạo đề thi",
          path: "/exam/add",
        },
      ],
    },
    {
      title: "Quản lý phòng thi",
      path: "",
      subCategories: [
        {
          title: "Danh sách phòng thi",
          path: "/examroom",
        },
        {
          title: "Tạo phòng thi",
          path: "/examroom/add",
        },
      ],
    },

    {
      title: "Kiểm tra kết quả thi",
      path: "/",
    },
    {
      title: "Thống kê",
      path: "/",
    },
    {
      title: "Môn học",
      path: "/",
    },
    {
      title: "Tài khoản",
      path: "/account",
    },
  ],
};

export const userRoleToPath = {
  giaovien: "examiner",
  sinhvien: "examinee",
  admin: "admin",
};

export const questionType = {
  multipleChoice: "MULTIPLE_CHOICE",
  essay: "ESSAY",
  MULTIPLE_CHOICE: 1,
  ESSAY: 2,
};

export const userType = {
  SINHVIEN: "sinhvien",
  GIAOVIEN: "giaovien",
  ADMIN: "admin",
};

export const userStatus = {
  ACTIVE: 0,
  INACTIVE: 1,
};

export const questionLevel = {
  EASY: 1,
  MEDIUM: 2,
  HARD: 3,
};
