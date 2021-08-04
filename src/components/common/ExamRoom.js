import React from "react";
import { Link } from "gatsby";


const ExamRoom = () => {
    return (
        <div
            className="uk-padding uk-padding-remove-top uk-padding-remove-bottom uk-height-1-1"
            style={{ overflowY: "auto" }}
        >
            <p className="uk-text-large uk-text-center uk-text-bold uk-text-success">
                Danh sách phòng thi
            </p>
            <div className="uk-flex uk-flex-row uk-flex-between uk-margin-bottom" style={{ marginLeft: 200, marginRight: 200 }}>
                <div className="uk-width-1-3@s uk-display-inline-block">
                    <span className="uk-display-inline-block uk-width-2-5">
                        Môn học
                    </span>
                    <div className="uk-display-inline-block uk-width-3-5">
                        <select
                            className="uk-select uk-width-1-1"
                            style={{
                                border: "solid 0.5px #666",
                            }}
                        >
                            <option>Toán cao cấp B1</option>
                            <option>Vật lý đại cương</option>
                        </select>
                    </div>
                </div>

                <div className="uk-width-1-3@s uk-display-inline-block">
                    <span className="uk-display-inline-block uk-width-2-5">
                        Năm học
                    </span>
                    <div className="uk-display-inline-block uk-width-3-5">
                        <select
                            className="uk-select uk-width-1-1"
                            style={{
                                border: "solid 0.5px #666",
                            }}
                        >
                            <option>2020</option>
                            <option>2021</option>
                        </select>
                    </div>
                </div>
            </div>

            <div className="uk-flex uk-flex-row " style={{ marginLeft: 200 }}>
                <div className="uk-width-3-5 uk-flex uk-flex-between">
                    <input
                        className="uk-search-input uk-width-4-5"
                        type="search"
                        placeholder="Search"
                        style={{
                            border: "solid 0.5px #666",
                        }}
                    />
                    <button className="uk-button" style={{ ...myButton, ...activeText }}>
                        Tìm kiếm
                    </button>
                </div>
            </div>
            <div className="uk-margin-top uk-overflow-auto" style={{ height: 400 }}>
                <table className="uk-table uk-table-striped uk-table-middle">
                    <thead>
                        <tr>
                            <th className="uk-width-small">Mã phòng</th>
                            <th className="uk-width-large">Môn học</th>
                            <th className="uk-width-small">Mã bộ đề</th>
                            <th className="uk-width-medium">Từ sinh viên</th>
                            <th className="uk-width-medium">Đến sinh  viên</th>
                            <th className="uk-width-small">Số lượng</th>
                            <th className="uk-width-medium">Ngày thi</th>
                            <th className="uk-width-medium">Thời gian bắt đầu phòng</th>
                            <th className="uk-width-medium">Thời gian bắt đầu thi</th>
                            <th className="uk-width-small"></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>P01</td>
                            <td>Toán cao cấp B1</td>
                            <td>103</td>
                            <td>200001</td>
                            <td>200030</td>
                            <td>30</td>
                            <td>12/07/2021</td>
                            <td>08:00</td>
                            <td>10:00</td>
                            <td>
                                <nav
                                    id="navbar"
                                    className="uk-navbar-container"
                                >
                                    <div className="uk-navbar-left uk-margin-small-left">
                                        <ul className="uk-navbar-nav">
                                            <li className="uk-flex uk-flex-middle">
                                                <a>
                                                    <span uk-icon="table"></span>
                                                </a>
                                                <div className="uk-navbar-dropdown">
                                                    <ul className="uk-nav uk-navbar-dropdown-nav">
                                                        <li>
                                                            <a>Xem báo cáo</a>
                                                        </li>
                                                        <li>
                                                            <a>Xem chi tiết</a>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </li>
                                        </ul>
                                    </div>
                                </nav>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <ul className="uk-pagination uk-flex-center" uk-margin>
                <li>
                    <button className="uk-button uk-button-default uk-button-small">
                        <span className="uk-icon" uk-icon="icon: chevron-left"></span>
                    </button>
                </li>
                <li className="uk-disabled">
                    <button
                        className="uk-button uk-button-default uk-button-small"
                        style={{
                            ...paginationButton,
                            ...activeText,
                            ...myButton,
                        }}
                    >
                        1
                    </button>
                </li>
                <li>
                    <button
                        className="uk-button uk-button-default uk-button-small"
                        style={paginationButton}
                    >
                        2
                    </button>
                </li>
                <li>
                    <button
                        className="uk-button uk-button-default uk-button-small"
                        style={paginationButton}
                    >
                        3
                    </button>
                </li>
                <li>
                    <button className="uk-button uk-button-default uk-button-small">
                        <span className="uk-icon" uk-icon="icon: chevron-right"></span>
                    </button>
                </li>
            </ul>
        </div>
    );
};

export default ExamRoom;

const paginationButton = {
    width: 40,
};

const activeText = {
    color: "#FFF",
};

const myButton = {
    backgroundColor: "#32d296",
};