import React, { useEffect, useState, useRef } from "react";
import { Link } from "gatsby";

import PaginationButtonGroup from "../common/PaginationButtonGroup";
import { getUser } from "../../utils/auth";
import { getAPIWithToken } from "../../utils/api";
import { userType, userStatus } from "../../utils/constants";

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
          `/nguoidung?quyen=${type}&&trangthai=${status}&&timkiem=${searchString}`,
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
      alert("Đã có lỗi xảy ra trong quá trình lấy danh sách tài khoản.");
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
      <p className="uk-text-large uk-text-center uk-text-bold uk-text-success">
        Danh sách tài khoản
      </p>
      <div className="uk-flex uk-flex-row uk-flex-between uk-margin-bottom">
        <div className="uk-width-1-4@s uk-display-inline-block">
          <span className="uk-display-inline-block uk-width-2-5">
            Loại tài khoản
          </span>
          <div className="uk-display-inline-block uk-width-3-5">
            <select
              className="uk-select uk-width-1-1"
              style={{
                border: "solid 0.5px #666",
              }}
              onChange={onChangeType}
              value={type}
            >
              <option value={userType.GIAOVIEN}>Giáo viên</option>
              <option value={userType.SINHVIEN}>Học sinh</option>
            </select>
          </div>
        </div>

        <div className="uk-width-1-4@s uk-display-inline-block">
          <span className="uk-display-inline-block uk-width-1-5 uk-margin-right">
            Trạng thái
          </span>
          <div className="uk-display-inline-block uk-width-3-5">
            <select
              className="uk-select uk-width-1-1"
              style={{
                border: "solid 0.5px #666",
              }}
              onChange={onChangeStatus}
              value={status}
            >
              <option value={userStatus.ACTIVE}>Đang hoạt động</option>
              <option value={userStatus.INACTIVE}>Ngừng hoạt động</option>
            </select>
          </div>
        </div>

        <div className="uk-width-1-4@s uk-display-inline-block">
          <div className="uk-flex uk-flex-right uk-flex-middle uk-height-1-1">
            <Link
              to="add"
              className="uk-button uk-margin-right"
              style={activeButton}
            >
              Thêm mới
            </Link>
            <Link to="add-from-file" className="uk-button" style={activeButton}>
              Thêm từ tập tin
            </Link>
          </div>
        </div>
      </div>
      <div className="uk-flex uk-flex-row uk-flex-center">
        <div className="uk-width-3-5 uk-flex uk-flex-between">
          <input
            className="uk-search-input uk-width-4-5"
            type="search"
            placeholder="Tìm kiếm (Mã tài khoản hoặc họ tên)"
            style={{
              border: "solid 0.5px #666",
              padding: 10,
            }}
            value={searchString}
            onChange={onChangeSearch}
          />
          <button className="uk-button" style={activeButton} onClick={onSearch}>
            Tìm kiếm
          </button>
        </div>
      </div>
      <div className="uk-margin-top" style={{ height: 400 }}>
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
                    <td>{user.tenDangNhap}</td>
                    <td>{user.tenNguoiDung}</td>
                    <td>
                      {role === userType.GIAOVIEN ? "Giáo viên" : "Học sinh"}
                    </td>
                    <td>{`${
                      user.trangThai === 0 ? "Đang" : "Ngừng"
                    } hoạt động`}</td>
                    <td>
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
