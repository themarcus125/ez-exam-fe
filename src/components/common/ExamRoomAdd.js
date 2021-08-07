import React, { useEffect, useState } from "react";
import { getAPIWithToken, postAPIWithToken } from "../../utils/api";
import { getToken } from "../../utils/auth";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ExamRoomAdd = () => {
    const [dateExam, setDateExam] = useState("");
    const [hourExamRoom, setHourExamRoom] = useState("");
    const [hourStartExam, setHourStartExam] = useState("");
    const [lstSubject, setLstSubject] = useState(null);
    const [subject, setSubject] = useState("");
    const [lstCodeExam, setLstCodeExam] = useState(null);
    const [codeExam, setCodeExam] = useState("");
    const [lstStudent, setLstStudent] = useState(null);
    const [fromStudent, setFromStudent] = useState("");
    const [toStudent, setToStudent] = useState("");
    const [amount, setAmount] = useState("");

    useEffect(async () => {
        const token = await getToken();
        let tmp_lstSubject = await getAPIWithToken("/chuyende/monhocnguoidung", token);
        setLstSubject(tmp_lstSubject.data);

        let tmp_lstCodeExam = await getAPIWithToken("/dethi/layDanhSachBoDeThi", token);
        setLstCodeExam(tmp_lstCodeExam.data.dsDeThi);
    }, []);

    const handleChangeSubject = async (e) => {
        setSubject(e.target.value);
        const tmp_subject = lstSubject.find(element => element.id = e.target.value);
        if (tmp_subject) {
            setLstStudent(tmp_subject.nguoi_dung);
            setFromStudent(tmp_subject.nguoi_dung[0]);
            setToStudent(tmp_subject.nguoi_dung[tmp_subject.nguoi_dung.length - 1]);
            setAmount(tmp_subject.nguoi_dung.length);
        } else {
            setLstStudent([]);
            setFromStudent(null);
            setToStudent(null);
            setAmount(0);
        }
    };
    const handleChangeDateExam = async (e) => {
        setDateExam(e.target.value);
    };
    const handleChangeHourExamRoom = async (e) => {
        setHourExamRoom(e.target.value);
    };
    const handleChangeHourStartExam = async (e) => {
        setHourStartExam(e.target.value);
    };
    const handleChangeCodeExam = async (e) => {
        setCodeExam(e.target.value);
    };
    const handleChangeFromStudent = async (e) => {
        setFromStudent(e.target.value);
    };
    const handleChangeToStudent = async (e) => {
        setToStudent(e.target.value);
    };
    const handleChangeAmount = async (e) => {
        setAmount(e.target.value);
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        const token = await getToken();
        try {
            const res = await postAPIWithToken("/phongthi", {
                tenPhong: "Phòng 99",
                ngayThi: dateExam,
                thoiGianBatDauPhong: hourExamRoom,
                thoiGianBatDauThi: hourStartExam,
                maBoDe: codeExam,
                maMonHoc: subject,
                tuMaND: fromStudent,
                denMaND: toStudent
            }, token);
            if (res.status === 200) {
                toast.success("Tạo phòng thành công !!!");
            }
        } catch (err) {
            toast.error("Đã có lỗi xảy ra khi lưu !!!");
        }
    };
    return (
        <div className="uk-padding uk-padding-remove-top uk-padding-remove-bottom uk-height-1-1"
            style={{ overflowY: "auto" }}
        >
            <p className="uk-text-large uk-text-center uk-text-bold uk-text-success">
                Tạo phòng thi
            </p>

            <ToastContainer
                autoClose={3000}
                position={toast.POSITION.TOP_RIGHT}
            />

            <form className="uk-form-horizontal uk-margin-small" onSubmit={onSubmit}>
                <fieldset className="uk-fieldset">
                    <div class="uk-grid">
                        <div class="uk-width-1-2 uk-margin-bottom">
                            <div className="uk-margin">
                                <label className="uk-form-label" for="form-horizontal-text">
                                    Chọn ngày
                                </label>
                                <div className="uk-form-controls">
                                    <input
                                        className="uk-input uk-form-width-medium"
                                        type="date"
                                        format="DD-MM-YYYY"
                                        value={dateExam}
                                        onChange={handleChangeDateExam}
                                    />
                                </div>
                            </div>
                        </div>
                        <div class="uk-width-1-2 uk-margin-bottom">
                        </div>
                        <div class="uk-width-1-2 uk-margin-bottom">
                            <div className="uk-margin">
                                <label className="uk-form-label" for="form-horizontal-text">
                                    Thời gian bắt đầu phòng
                                </label>
                                <div className="uk-form-controls">
                                    <input
                                        className="uk-input uk-form-width-small"
                                        type="time"
                                        value={hourExamRoom}
                                        onChange={handleChangeHourExamRoom}
                                    />
                                </div>
                            </div>
                        </div>
                        <div class="uk-width-1-2 uk-margin-bottom">
                            <div className="uk-margin">
                                <label className="uk-form-label" for="form-horizontal-text">
                                    Thời gian bắt đầu thi
                                </label>
                                <div className="uk-form-controls">
                                    <input
                                        className="uk-input uk-form-width-small"
                                        type="time"
                                        value={hourStartExam}
                                        onChange={handleChangeHourStartExam}
                                    />
                                </div>
                            </div>
                        </div>
                        <div class="uk-width-1-2 uk-margin-bottom">
                            <div className="uk-margin">
                                <label className="uk-form-label" for="form-horizontal-text">
                                    Môn học
                                </label>
                                <div className="uk-form-controls">
                                    <select className="uk-select" onChange={handleChangeSubject} value={subject}>
                                        <option disabled></option>
                                        {lstSubject ? lstSubject.map((item) => (
                                            <option value={item.id}>{item.tenChuyenDe}</option>
                                        )) : null}
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div class="uk-width-1-2 uk-margin-bottom">
                            <div className="uk-margin">
                                <label className="uk-form-label" for="form-horizontal-text">
                                    Mã bộ đề
                                </label>
                                <div className="uk-form-controls">
                                    <select className="uk-select" onChange={handleChangeCodeExam} value={codeExam}>
                                        <option disabled></option>
                                        {lstCodeExam ? lstCodeExam.map((item) => (
                                            <option value={item.maBoDe}>{item.maDe}</option>
                                        )) : null}
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div class="uk-width-1-2 uk-margin-bottom">
                            <div className="uk-margin">
                                <label className="uk-form-label" for="form-horizontal-text">
                                    Từ sinh viên
                                </label>
                                <div className="uk-form-controls">
                                    <select className="uk-select" onChange={handleChangeFromStudent} value={fromStudent}>
                                        {lstStudent ? lstStudent.map((item) => (
                                            <option value={item.id}>{item.tenDangNhap} - {item.tenNguoiDung}</option>
                                        )) : null}
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div class="uk-width-1-2 uk-margin-bottom">
                            <div className="uk-margin">
                                <label className="uk-form-label" for="form-horizontal-text">
                                    Đến sinh viên
                                </label>
                                <div className="uk-form-controls">
                                    <select className="uk-select" onChange={handleChangeToStudent} value={toStudent}>
                                        {lstStudent ? lstStudent.map((item) => (
                                            <option value={item.id}>{item.tenDangNhap} - {item.tenNguoiDung}</option>
                                        )) : null}
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div class="uk-width-1-2 uk-margin-bottom">
                            <div className="uk-margin">
                                <label className="uk-form-label" for="form-horizontal-text">
                                    Số lượng
                                </label>
                                <div className="uk-form-controls">
                                    <input className="uk-input uk-form-width-small"
                                        type="number"
                                        min="0"
                                        placeholder="0"
                                        value={amount}
                                        onChange={handleChangeAmount}
                                        disabled />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="uk-flex uk-flex-center">
                        <div className="uk-card-body">
                            <button
                                className="uk-button"
                                style={{ backgroundColor: "#32d296", color: "#FFF" }}
                            >
                                Lưu
                            </button>
                        </div>
                    </div>
                </fieldset>
            </form>
        </div>
    );
};

export default ExamRoomAdd;