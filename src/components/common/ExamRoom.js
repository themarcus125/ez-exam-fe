import React, { useEffect, useState } from "react";
import { getAPIWithToken, postAPIWithToken } from "../../utils/api";
import { getToken } from "../../utils/auth";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from 'moment';

const ExamRoom = () => {
    const [lstExamRoom, setLstExamRoom] = useState(null);
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [lstSubject, setLstSubject] = useState(null);
    const [subject, setSubject] = useState("");
    const [search, setSearch] = useState("");

    useEffect(async () => {
        const token = await getToken();
        let tmp_lstSubject = await getAPIWithToken("/chuyende/monhocnguoidung", token);
        setLstSubject(tmp_lstSubject.data);
        let tmp_lstExamRoom = await getAPIWithToken(`/phongthi`, token);
        setLstExamRoom(tmp_lstExamRoom.data);
    }, []);
    const handleChangeSubject = (e) => {
        setSubject(e.target.value);
    };
    const handleChangeStartDate = (date) => {
        setStartDate(date);
    };
    const handleChangeEndDate = (date) => {
        setEndDate(date);
    };
    const handleChangeSearch = (e) => {
        setSearch(e.target.value);
    };
    const onSearch = async (e) => {
        e.preventDefault();
        const token = await getToken();
        const tmp_Search = await getAPIWithToken(`/phongthi?timkiem=${search}&mamonhoc=${subject}&tungay=${moment(startDate).format("YYYY-MM-DD")}&denngay=${moment(endDate).format("YYYY-MM-DD")}`, token);
        setLstExamRoom(tmp_Search.data);
    };

    return (
        <div
            className="uk-padding uk-padding-remove-top uk-padding-remove-bottom uk-height-1-1"
            style={{ overflowY: "auto" }}
        >
            <p className="uk-text-large uk-text-center uk-text-bold uk-text-success">
                Danh sách phòng thi
            </p>
            <div className="uk-flex uk-flex-row uk-flex-between uk-margin-bottom" style={{ marginLeft: 50, marginRight: 50 }}>
                <div className="uk-width-1-4@s uk-display-inline-block">
                    <span className="uk-display-inline-block uk-width-2-5">
                        Môn học
                    </span>
                    <div className="uk-display-inline-block uk-width-3-5">
                        <select className="uk-select uk-width-1-1"
                            style={{
                                border: "solid 0.5px #666",
                            }}
                            onChange={handleChangeSubject}
                            value={subject}>
                            <option disabled></option>
                            {lstSubject ? lstSubject.map((item) => (
                                <option value={item.id}>{item.tenChuyenDe}</option>
                            )) : null}
                        </select>
                    </div>
                </div>

                <div className="uk-width-1-4@s uk-display-inline-block">
                    <span className="uk-display-inline-block uk-width-2-5">
                        Từ ngày
                    </span>
                    <div className="uk-display-inline-block uk-width-3-5">
                        <DatePicker className="uk-select uk-width-1-1"
                            style={{
                                border: "solid 0.5px #666"
                            }}
                            selected={startDate}
                            onChange={handleChangeStartDate}
                            selectsStart
                            startDate={startDate}
                            endDate={endDate}
                            dateFormat="dd/MM/yyyy"
                        />
                    </div>
                </div>
                <div className="uk-width-1-4@s uk-display-inline-block">
                    <span className="uk-display-inline-block uk-width-2-5">
                        Đến ngày
                    </span>
                    <div className="uk-display-inline-block uk-width-3-5">
                        <DatePicker className="uk-select uk-width-1-1"
                            style={{
                                border: "solid 0.5px #666"
                            }}
                            selected={endDate}
                            onChange={handleChangeEndDate}
                            selectsEnd
                            startDate={startDate}
                            endDate={endDate}
                            minDate={startDate}
                            dateFormat="dd/MM/yyyy"
                        />
                    </div>
                </div>
            </div>

            <div className="uk-flex uk-flex-row uk-flex-between uk-margin-bottom">
                <div className="uk-width-3-5 uk-flex uk-flex-between">
                    <input
                        className="uk-search-input uk-width-4-5"
                        type="search"
                        placeholder="Search"
                        value={search}
                        onChange={handleChangeSearch}
                        style={{
                            border: "solid 0.5px #666",
                        }}
                    />
                    <button className="uk-button" style={{ ...myButton, ...activeText }} onClick={onSearch}>
                        Tìm kiếm
                    </button>
                </div>

                <button className="uk-button" style={{ ...myButton, ...activeText }}>
                    Báo cáo tổng hợp
                </button>
            </div>
            <div className="uk-margin-top uk-overflow-auto" style={{ height: 400 }}>
                <table className="uk-table uk-table-striped uk-table-middle">
                    <thead>
                        <tr>
                            <th className="uk-width-small">Mã phòng</th>
                            <th className="uk-width-large">Môn học</th>
                            <th className="uk-width-small">Mã bộ đề</th>
                            <th className="uk-width-small">Số lượng</th>
                            <th className="uk-width-medium">Ngày thi</th>
                            <th className="uk-width-medium">Thời gian bắt đầu phòng</th>
                            <th className="uk-width-medium">Thời gian bắt đầu thi</th>
                            <th className="uk-width-small"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {lstExamRoom ? lstExamRoom.map((item) => (
                            <tr key={item.id}>
                                <td value={item.maPhong}>{item.tenPhong}</td>
                                <td value={item.maMonHoc}>{item.tenMonHoc}</td>
                                <td value={item.maBoDe}>{item.tenBoDe}</td>
                                <td>{item.siSo}</td>
                                <td>{moment(item.ngayThi).format("DD/MM/YYYY")}</td>
                                <td>{item.thoiGianBatDauPhong}</td>
                                <td>{item.thoiGianBatDauThi}</td>
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
                        )) : null}
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