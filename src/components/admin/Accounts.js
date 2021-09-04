import React, { useEffect, useState, useRef } from "react";
import { Link } from "gatsby";
import { ToastContainer, toast } from "react-toastify";

import PaginationButtonGroup from "../common/PaginationButtonGroup";
import { getUser } from "../../utils/auth";
import { getAPIWithToken } from "../../utils/api";
import { userType, userStatus } from "../../utils/constants";
import ControlBar from "../common/ControlBar";

const USER_PER_PAGE = 6;

const AdminAccounts = () => {
  const [users, setUsers] = useState([]);
  const [type, setType] = useState(userType.GIAOVIEN);
  const [status, setStatus] = useState(userStatus.ACTIVE);
  const [searchString, setSearchString] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const numOfPage = useRef(1);

  const getData = async () => {
    try {
      const token = getUser()?.tk ?? "";
      if (token) {
        setLoading(true);
        const response = await getAPIWithToken(
          `/users?quyen=${type}&&trangthai=${status}&&timkiem=${searchString}`,
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
      toast.error("Đã có lỗi xảy ra trong quá trình lấy danh sách tài khoản.");
    }
  };

  useEffect(() => {
    getData();
  }, [type, status]);

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

  const onChangeType = (e) => {
    setType(e.target.value);
  };

  const onChangeStatus = (e) => {
    setStatus(e.target.value);
  };

  const onChangeSearch = (e) => {
    setSearchString(e.target.value);
  };

  const onSearch = () => {
    getData();
  };

  return (
    <div
      className="uk-padding uk-padding-remove-top uk-padding-remove-bottom uk-height-1-1"
      style={{ overflowY: "auto" }}
    >
      <ToastContainer autoClose={3000} position={toast.POSITION.TOP_RIGHT} />
      <ControlBar
        title="Danh sách tài khoản"
        controlRow={() => (
          <>
            <div className="uk-width-1-3@l uk-display-inline-block">
              <span className="uk-display-inline-block uk-width-1-4">
                Loại tài khoản
              </span>
              <div className="uk-display-inline-block uk-width-3-4">
                <select
                  className="uk-select uk-width-1-1"
                  style={{
                    border: "solid 0.5px #666",
                  }}
                  onChange={onChangeType}
                  value={type}
                  onBlur={() => {}}
                >
                  <option value={userType.GIAOVIEN}>Giáo viên</option>
                  <option value={userType.SINHVIEN}>Học sinh</option>
                </select>
              </div>
            </div>

            <div className="uk-width-1-3@l uk-display-inline-block">
              <span className="uk-display-inline-block uk-width-1-4">
                Trạng thái
              </span>
              <div className="uk-display-inline-block uk-width-3-4">
                <select
                  className="uk-select uk-width-1-1"
                  style={{
                    border: "solid 0.5px #666",
                  }}
                  onChange={onChangeStatus}
                  value={status}
                  onBlur={() => {}}
                >
                  <option value={userStatus.ACTIVE}>Đang hoạt động</option>
                  <option value={userStatus.INACTIVE}>Ngừng hoạt động</option>
                </select>
              </div>
            </div>

            <div className="uk-width-1-3@l uk-display-inline-block">
              <div className="uk-flex uk-flex-right uk-flex-middle uk-height-1-1">
                <Link
                  to="add"
                  className="uk-button uk-margin-right"
                  style={activeButton}
                >
                  Thêm mới
                </Link>
                <Link
                  to="add-from-file"
                  className="uk-button"
                  style={activeButton}
                >
                  Thêm từ tập tin
                </Link>
              </div>
            </div>
          </>
        )}
        isSearchEnabled={true}
        searchPlaceholder="Tìm kiếm (Mã tài khoản hoặc họ tên)"
        searchString={searchString}
        onSearchStringChanged={onChangeSearch}
        onSearchButtonClicked={onSearch}
      />
      {loading && <div className="uk-flex uk-flex-center" uk-spinner=""></div>}
      <div className="uk-margin-top">
        <table className="uk-table uk-table-striped uk-table-middle">
          <thead>
            <tr>
              <th className="uk-width-small">Mã tài khoản</th>
              <th className="uk-width-large">Họ tên</th>
              <th>Loại tài khoản</th>
              <th>Trạng thái</th>
              <th className="uk-width-small"></th>
            </tr>
          </thead>
          <tbody>
            {!loading &&
              users[currentPage - 1]?.map((user) => {
                const role = user.phan_quyen?.[0]?.quyen;
                return (
                  <tr key={user.tenDangNhap}>
                    <td data-label="Mã tài khoản">{user.tenDangNhap}</td>
                    <td data-label="Họ tên">{user.tenNguoiDung}</td>
                    <td data-label="Loại tài khoản">
                      {role === userType.GIAOVIEN ? "Giáo viên" : "Học sinh"}
                    </td>
                    <td data-label="Trạng thái">{`${
                      user.trangThai === 0 ? "Đang" : "Ngừng"
                    } hoạt động`}</td>
                    <td data-label="Tùy chỉnh">
                      <Link
                        title="Chỉnh sửa"
                        className="uk-icon-link uk-margin-small-right"
                        uk-icon="file-edit"
                        to={`/admin/account/${user.id}`}
                      ></Link>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
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
    </div>
  );
};

export default AdminAccounts;

const paginationButton = {
  width: 40,
};

const activeButton = {
  color: "#FFF",
  backgroundColor: "#32d296",
};
