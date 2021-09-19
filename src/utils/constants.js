export const navBarCategories = {
  giaovien: [
    {
      title: "Ngân hàng câu hỏi",
      path: "/questionaire",
      subCategories: [
        {
          title: "Thêm câu hỏi",
          path: "/questionaire/add",
        },
        {
          title: "Danh sách câu hỏi",
          path: "/questionaire",
        },
        {
          title: "Danh sách môn học",
          path: "/course",
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
  ],
  sinhvien: [
    {
      title: "Phòng thi",
      path: "/exam-room",
    },
    {
      title: "Xem kết quả kiểm tra",
      path: "/view-exam-result",
    },
  ],
  admin: [
    {
      title: "Môn học",
      path: "",
      subCategories: [
        {
          title: "Danh sách môn học",
          path: "/course",
        },
        {
          title: "Thêm môn học cho sinh viên",
          path: "/course/addexaminee",
        },
      ],
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
  ALL: -1,
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
