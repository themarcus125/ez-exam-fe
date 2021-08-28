import React, { useEffect, useState, useRef } from "react";
import { ToastContainer, toast } from "react-toastify";
import Modal, { showModal, hideModal } from "./Modal";

import PaginationButtonGroup from "./PaginationButtonGroup";
import { getToken } from "../../utils/auth";
import { getAPIWithToken, postAPIWithToken } from "../../utils/api";
import ControlBar from "./ControlBar";

const USER_PER_PAGE = 6;
const COURSE_PER_PAGE = 5;

const CourseAddExaminee = () => {
  const [users, setUsers] = useState([]);
  const [searchString, setSearchString] = useState("");
  const [userCourse, setUserCourse] = useState([]);
  const [allCourse, setAllCourse] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const numOfPage = useRef(1);
  const [currentPageCrs, setCurrentPageCrs] = useState(1);
  const numOfPageCrs = useRef(1);
  const [stdId, setStdId] = useState(null);
  const [stdName, setStdName] = useState("");
  const [addCourse, setAddCourse] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingMd, setLoadingMd] = useState(false);

  const getData = async () => {
    try {
      const token = await getToken();
      if (token) {
        setLoading(true);
        const response = await getAPIWithToken(
          `/users?quyen=sinhvien&&trangthai=0&&timkiem=${searchString}`,
          token,
        );
        numOfPage.current =
          Math.ceil(response.data.length / USER_PER_PAGE) || 1;
        const chunks = Array(numOfPage.current)
          .fill()
          .map((_, index) => index * USER_PER_PAGE)
          .map((begin) => response.data.slice(begin, begin + USER_PER_PAGE));
        setUsers(chunks);
        setCurrentPage(1);
        setLoading(false);
      }
    } catch (error) {
      toast.error("Đã có lỗi xảy ra trong quá trình lấy danh sách sinh viên.");
    }
  };

  const getAllCourse = async () => {
    try {
      const token = await getToken();
      if (token) {
        setLoadingMd(true);
        const response = await getAPIWithToken(
          `/chuyende/layDanhSachChuyenDe?trangThai=1&limit=999999`,
          token,
        );
        numOfPageCrs.current =
          Math.ceil(response.data.dsChuyenDe.length / COURSE_PER_PAGE) || 1;
        const chunks = Array(numOfPageCrs.current)
          .fill()
          .map((_, index) => index * COURSE_PER_PAGE)
          .map((begin) =>
            response.data.dsChuyenDe.slice(begin, begin + COURSE_PER_PAGE),
          );
        setAllCourse(chunks);
        setCurrentPageCrs(1);
        setLoadingMd(false);
      }
    } catch (error) {
      toast.error("Đã có lỗi xảy ra trong quá trình lấy danh sách môn học.");
    }
  };

  const getUserCourse = async (id) => {
    try {
      const token = await getToken();
      if (token) {
        setLoadingMd(true);
        const response = await getAPIWithToken(`/users/${id}/monhoc`, token);
        setUserCourse(response.data.mon_hoc);
        setLoadingMd(false);
      }
    } catch (error) {
      toast.error(
        "Đã có lỗi xảy ra trong quá trình lấy danh sách môn học của sinh viên.",
      );
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const onChangePage = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const onNext = () => {
    if (currentPage < numOfPage.current) {
      setCurrentPage(currentPage + 1);
    }
  };

  const onPrev = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const onChangePageCrs = (pageNumber) => {
    setCurrentPageCrs(pageNumber);
  };

  const onNextCrs = () => {
    if (currentPageCrs < numOfPageCrs.current) {
      setCurrentPageCrs(currentPageCrs + 1);
    }
  };

  const onPrevCrs = () => {
    if (currentPageCrs > 1) {
      setCurrentPageCrs(currentPageCrs - 1);
    }
  };

  const onChangeSearch = (e) => {
    setSearchString(e.target.value);
  };

  const onSearch = () => {
    getData();
  };

  const onSelectCourse = async (id, name) => {
    setStdId(id);
    setStdName(name);
    setAddCourse([]);
    await getUserCourse(id);
    await getAllCourse();
  };

  const onChangeCkb = (courseId) => {
    if (addCourse.includes(courseId)) {
      setAddCourse(addCourse.filter((x) => x != courseId));
    } else {
      addCourse.push(courseId);
    }
  };

  const onSave = async () => {
    const token = await getToken();
    try {
      await postAPIWithToken(
        "/users/monhoc",
        {
          maNguoiDung: stdId,
          maMonHoc: addCourse,
        },
        token,
      );
      toast.success("Thêm môn học cho sinh viên thành công");
      hideModal();
    } catch (error) {
      toast.error("Đã xảy ra lỗi. Không thể thêm môn học cho sinh viên");
    }
  };

  return (
    <div
      className="uk-padding uk-padding-remove-top uk-padding-remove-bottom uk-height-1-1"
      style={{ overflowY: "auto" }}
    >
      <ToastContainer autoClose={3000} position={toast.POSITION.TOP_RIGHT} />

      <ControlBar
        title="DANH SÁCH SINH VIÊN"
        controlRow={() => <></>}
        isSearchEnabled={true}
        searchPlaceholder="Tìm kiếm (Mã tài khoản hoặc họ tên)"
        searchString={searchString}
        onSearchStringChanged={onChangeSearch}
        onSearchButtonClicked={onSearch}
      />

      <div className="uk-margin-top">
        <table className="uk-table uk-table-striped uk-table-middle">
          <thead>
            <tr>
              <th className="uk-width-large">Mã sinh viên</th>
              <th className="uk-width-large">Tên sinh viên</th>
              <th className="uk-width-large">Email</th>
              <th className="uk-width-small"></th>
            </tr>
          </thead>
          <tbody>
            {!loading &&
              users[currentPage - 1]?.map((user) => {
                return (
                  <tr key={user.tenDangNhap}>
                    <td data-label="Mã sinh viên">{user.tenDangNhap}</td>
                    <td data-label="Tên sinh viên">{user.tenNguoiDung}</td>
                    <td data-label="Email">{user.email}</td>
                    <td data-label="Tùy chỉnh">
                      <span
                        uk-icon="plus-circle"
                        style={{ cursor: "pointer" }}
                        onClick={async () => {
                          showModal();
                          await onSelectCourse(user.id, user.tenNguoiDung);
                        }}
                      ></span>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
        {loading && (
          <div className="uk-flex uk-flex-center" uk-spinner=""></div>
        )}
      </div>
      <ul className="uk-pagination uk-flex-center" uk-margin="">
        <PaginationButtonGroup
          onChangePage={onChangePage}
          onNext={onNext}
          onPrev={onPrev}
          numOfPage={numOfPage.current}
          currentPage={currentPage}
        />
      </ul>

      <Modal
        title="Chọn môn học"
        description={`Sinh viên: ${stdName}`}
        onSave={onSave}
      >
        <div className="uk-margin-top">
          <table className="uk-table uk-table-striped uk-table-middle">
            <thead>
              <tr>
                <th className="uk-width-small">Mã môn học</th>
                <th className="uk-width-large">Tên môn học</th>
                <th className="uk-width-small"></th>
              </tr>
            </thead>
            <tbody>
              {!loadingMd &&
                allCourse[currentPageCrs - 1]?.map((item) => {
                  return (
                    <tr key={item.id}>
                      <td data-label="Mã môn học">{item.maChuyenDe}</td>
                      <td data-label="Tên môn học">{item.tenChuyenDe}</td>
                      <td data-label="Tùy chỉnh">
                        <input
                          className="uk-checkbox"
                          type="checkbox"
                          disabled={
                            userCourse.some((x) => x.id === item.id)
                              ? true
                              : false
                          }
                          defaultChecked={
                            userCourse.some((x) => x.id === item.id) ||
                            addCourse.includes(item.id)
                              ? true
                              : false
                          }
                          onChange={() => {
                            onChangeCkb(item.id);
                          }}
                        />
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
          {loadingMd && (
            <div className="uk-flex uk-flex-center" uk-spinner=""></div>
          )}
        </div>
        <ul className="uk-pagination uk-flex-center" uk-margin="">
          <PaginationButtonGroup
            onChangePage={onChangePageCrs}
            onNext={onNextCrs}
            onPrev={onPrevCrs}
            numOfPage={numOfPageCrs.current}
            currentPage={currentPageCrs}
          />
        </ul>
      </Modal>
    </div>
  );
};

export default CourseAddExaminee;
