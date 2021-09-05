import React, { useState, useEffect } from "react";
import { Link } from "gatsby";
import { getAPIWithToken } from "../../utils/api";
import { getToken, getUser } from "../../utils/auth";
import Config from "../../utils/config";
import ControlBar from "./ControlBar";

const Course = () => {
  const [monHoc, setMonHoc] = useState([]);
  const [meta, setMeta] = useState(null);
  const [trangThai, setTrangThai] = useState(0);
  const [key, setKey] = useState("");
  const [loading, setLoading] = useState(false);
  let lstPage = [];

  const role = getUser()?.role ?? "";
  const url = Config.urlPath[role]?.url;

  const getMonHoc = async (crPage) => {
    setLoading(true);
    const token = await getToken();
    const lstMonHoc = await getAPIWithToken(
      `/chuyende/layDanhSachChuyenDe?limit=10&page=${crPage}&keyword=${
        key && key
      }&trangThai=${trangThai}`,
      token,
    );

    setMonHoc(lstMonHoc.data?.dsChuyenDe);
    setMeta(lstMonHoc.data?.meta);
    setLoading(false);
  };

  useEffect(async () => {
    await getMonHoc(1);
  }, []);

  for (let i = 1; i <= meta?.lastPage; i++) {
    lstPage.push(i);
  }

  const onChangeSearch = (e) => {
    setKey(e.target.value);
  };

  const onSearch = () => {
    getMonHoc(1);
  };

  return (
    <div
      className="uk-padding uk-padding-remove-top uk-padding-remove-bottom uk-height-1-1"
      style={{ overflowY: "auto" }}
    >
      <ControlBar
        title="DANH SÁCH MÔN HỌC"
        controlRow={() => (
          <>
            <div className="uk-flex uk-flex-row uk-flex-between uk-margin-bottom">
              <div className="uk-width-2-5 uk-flex uk-flex-between">
                <label className="uk-form-label uk-width-1-5 uk-flex uk-flex-middle">
                  Trạng thái
                </label>
                <select
                  className="uk-select"
                  value={trangThai}
                  onChange={(e) => setTrangThai(e.target.value)}
                >
                  <option value={0}>Tất cả</option>
                  <option value={1}>Đang sử dụng</option>
                  <option value={2}>Không sử dụng</option>
                </select>
              </div>

              {role === "admin" && (
                <button
                  className="uk-button"
                  style={{ backgroundColor: "#32d296", color: "#FFF" }}
                >
                  <Link
                    to="./add"
                    style={{ color: "#FFFFFF", textDecoration: "none" }}
                  >
                    Thêm mới
                  </Link>
                </button>
              )}
            </div>
          </>
        )}
        isSearchEnabled={true}
        searchPlaceholder="Tìm kiếm (Tên môn học)"
        searchString={key}
        onSearchStringChanged={onChangeSearch}
        onSearchButtonClicked={onSearch}
      />

      <div className="uk-margin-top">
        <table className="uk-table uk-table-striped uk-table-middle">
          <thead>
            <tr>
              <th className="uk-width-large">Mã môn học</th>
              <th className="uk-width-large">Môn học</th>
              <th className="uk-width-large">Trạng thái</th>
              {role === "admin" && <th className="uk-width-small"></th>}
            </tr>
          </thead>
          <tbody>
            {!loading &&
              monHoc?.length > 0 &&
              monHoc.map((item, index) => (
                <tr key={index}>
                  <td data-label="Mã môn học">{item.maChuyenDe}</td>
                  <td data-label="Môn học">{item.tenChuyenDe}</td>
                  <td data-label="Trạng thái">
                    {item.trangThai === 0 ? "Đang sử dụng" : "Không sử dụng"}
                  </td>
                  {role === "admin" && (
                    <td data-label="Tùy chỉnh">
                      <ul class="uk-subnav-pill">
                        <a
                          style={{
                            color: "#FFF",
                          }}
                        >
                          <span uk-icon="table"></span>
                        </a>
                        <div uk-dropdown="mode: click">
                          <ul class="uk-nav uk-dropdown-nav">
                            <li>
                              <Link to={`${url}/course/${item.id}`}>
                                Sửa thông tin
                              </Link>
                            </li>
                          </ul>
                        </div>
                      </ul>
                    </td>
                  )}
                </tr>
              ))}
          </tbody>
        </table>
        {loading && (
          <div className="uk-flex uk-flex-center" uk-spinner=""></div>
        )}
      </div>

      <ul className="uk-pagination uk-flex-center" uk-margin>
        <li
          className={meta?.currentPage === 1 ? "uk-disabled" : ""}
          onClick={() => {
            const page = meta?.currentPage - 1;
            getMonHoc(page);
          }}
        >
          <button className="uk-button uk-button-default uk-button-small">
            <span className="uk-icon" uk-icon="icon: chevron-left"></span>
          </button>
        </li>
        {lstPage.map((item, index) => (
          <li
            key={index}
            className={item === meta?.currentPage ? "uk-disabled" : ""}
            onClick={() => {
              getMonHoc(item);
            }}
          >
            <button
              className="uk-button uk-button-default uk-button-small"
              style={
                item === meta?.currentPage
                  ? {
                      width: 40,
                      color: "#FFF",
                      backgroundColor: "#32d296",
                    }
                  : { width: 40 }
              }
            >
              {item}
            </button>
          </li>
        ))}
        <li
          className={meta?.currentPage === meta?.lastPage ? "uk-disabled" : ""}
          onClick={() => {
            const page = meta?.currentPage + 1;
            getMonHoc(page);
          }}
        >
          <button className="uk-button uk-button-default uk-button-small">
            <span className="uk-icon" uk-icon="icon: chevron-right"></span>
          </button>
        </li>
      </ul>
    </div>
  );
};

export default Course;
