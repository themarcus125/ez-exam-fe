import React, { useEffect, useState, useRef } from "react";
import { Link } from "gatsby";
import styled, { css } from "styled-components";
import moment from "moment";
import { ToastContainer, toast } from "react-toastify";

import LoadingOverlay from "../common/LoadingOverlay";
import EssayQuestionBlock from "../common/EssayQuestionBlock";

import { getAPIWithToken, putAPIWithToken } from "../../utils/api";
import { getToken } from "../../utils/auth";
import { questionType } from "../../utils/constants";

const ExamGrading = ({ id }) => {
  const [test, setTest] = useState({});
  const [loading, setloading] = useState(true);
  const [dsCauHoiTL, setDSCauHoiTL] = useState([]);
  const [note, setNote] = useState("");
  const [diemTL, setDiemTL] = useState(0);
  const tongDiemTL = useRef(0);
  const tongDiemTN = useRef(0);

  const loadData = async () => {
    setloading(true);
    const token = await getToken();
    const response = await getAPIWithToken(
      `/baithi/layChiTietBaiThi?maCTPhong=${id}`,
      token,
    );
    if (response.message === "error") {
      toast.error("Thí sinh chưa tham gia kì thi");
      return;
    }

    const {
      diemTungCauTracNghiem,
      diemTungCauTuLuan,
      soLuongTracNghiem,
      soLuongTuLuan,
      dsCauhoi,
      diemTuLuan,
      ghiChuKetQua,
    } = response.data;
    tongDiemTL.current = diemTungCauTuLuan * soLuongTuLuan;
    tongDiemTN.current = diemTungCauTracNghiem * soLuongTracNghiem;
    setDSCauHoiTL(
      dsCauhoi
        .filter((cauHoi) => cauHoi.loaiCauHoi === questionType.ESSAY)
        .map((cauHoi) => {
          return {
            idBaiThi: cauHoi.idBaiThi,
            diemDatDuoc: cauHoi.diemDatDuoc,
            diemToiDa: cauHoi.diemTungCau,
          };
        }),
    );
    setTest(response.data);
    setDiemTL(diemTuLuan);
    setNote(ghiChuKetQua ?? "");
    setloading(false);
  };

  const onSubmit = async () => {
    if (!test?.soLuongTuLuan && !note) {
      toast.info("Không có câu hỏi tự luận");
      return;
    }

    const token = await getToken();
    // TODO: need to add note
    const res = await putAPIWithToken(
      `/baithi/suaKetQuaThi`,
      {
        maCTPhong: +id,
        diemTracNghiem: test?.diemTracNghiem,
        diemTuLuan: diemTL,
        ghiChuKetQua: note,
        baiThi: dsCauHoiTL.map((question) => {
          return {
            idBaiThi: question.idBaiThi,
            diemDatDuoc: question.diemDatDuoc,
          };
        }),
      },
      token,
    );
    const response = await res.json();
    if (response.message === "successful") {
      toast.success("Cập nhật điểm thi thành công");
      return;
    }
    toast.error("Đã có lỗi xảy ra");
  };

  const gradeEssayQuestion = (e, idBaiThi) => {
    const index = dsCauHoiTL.findIndex(
      (cauHoi) => cauHoi.idBaiThi === idBaiThi,
    );
    if (index === -1) {
      return;
    }

    const question = dsCauHoiTL[index];
    if (+e.target.value > question.diemToiDa) {
      return;
    }

    const dsCauHoiTL_updated = [
      ...dsCauHoiTL.slice(0, index),
      {
        ...dsCauHoiTL[index],
        diemDatDuoc: +e.target.value,
      },
      ...dsCauHoiTL.slice(index + 1),
    ];
    setDSCauHoiTL(dsCauHoiTL_updated);
    setDiemTL(
      dsCauHoiTL_updated.reduce((prev, current) => {
        return current.diemDatDuoc + prev;
      }, 0),
    );
  };

  useEffect(() => {
    loadData();
  }, []);

  const onChangeNote = (e) => {
    setNote(e.target.value);
  };

  return (
    <div className="uk-padding">
      <p className="title uk-text-large uk-text-uppercase uk-text-bold uk-text-center uk-text-success">
        Bài thi của sinh viên
      </p>
      <ToastContainer autoClose={3000} position={toast.POSITION.TOP_RIGHT} />
      <div
        className="uk-flex uk-child-width-expand@s uk-margin-bottom"
        uk-grid="true"
        style={{ marginTop: 0 }}
      >
        <span>
          <Title>MSSV</Title>
          <Value>{test?.mssv}</Value>
        </span>
        <span>
          <Title>Họ tên</Title>
          <Value>{test?.tenNguoiDung}</Value>
        </span>
        <span>
          <Title>Phòng thi</Title>
          <Value>{test?.maPhong}</Value>
        </span>
      </div>
      <div
        className="uk-flex uk-child-width-expand@s uk-margin-bottom"
        uk-grid="true"
        style={{ marginTop: 0 }}
      >
        <span>
          <Title>Ngày thi</Title>
          <Value>{moment(test?.ngayThi).format("DD/MM/YYYY")}</Value>
        </span>
        <span>
          <Title>Thời gian bắt đầu thi</Title>
          <Value>{moment(test?.thoiGianBatDauLamBai).format("HH:mm")}</Value>
        </span>
        <span>
          <Title>Thời gian nộp bài</Title>
          <Value>{moment(test?.thoiGianNopBai).format("HH:mm")}</Value>
        </span>
      </div>
      <div className="uk-margin-bottom">
        <Title lineBreak>Ghi chú của sinh viên</Title>
        <Value>{test?.ghiChu}</Value>
      </div>
      <div className="uk-margin-bottom">
        <Title lineBreak>Ghi chú của giảng viên</Title>
        <textarea
          className="uk-textarea"
          rows="5"
          style={{ resize: "none", marginTop: 10 }}
          value={note}
          onChange={onChangeNote}
        ></textarea>
      </div>

      {test?.dsCauhoi?.map((question) => {
        const {
          loaiCauHoi,
          dsDapAn = [],
          viTri,
          noiDung,
          dapAnTL,
          diemDatDuoc,
          diemTungCau,
          id,
          idBaiThi,
        } = question;
        switch (loaiCauHoi) {
          case questionType.MULTIPLE_CHOICE:
            return (
              <div key={id} className="uk-margin-bottom">
                <QuestionRow className="uk-flex">
                  <span className="uk-flex uk-flex-1 uk-margin-right">
                    {`${viTri}. ${noiDung}`}
                  </span>
                  <MarkContainer className="uk-flex uk-flex-middle">
                    <PointInput
                      className="uk-input"
                      value={diemDatDuoc}
                      readOnly
                    />
                    <Line>/</Line>
                    <span>{`${diemTungCau} điểm`}</span>
                  </MarkContainer>
                </QuestionRow>
                <div>
                  {dsDapAn.map((answer) => {
                    return (
                      <AnswerRow
                        key={answer.id}
                        className="uk-flex uk-flex-row"
                        correct={answer.loaiDapAn === 1}
                      >
                        <div>
                          <input
                            className="uk-radio"
                            type="radio"
                            checked={answer.thiSinhChon}
                            readOnly
                          />
                        </div>
                        <AnswerText>{answer.noiDung}</AnswerText>
                      </AnswerRow>
                    );
                  })}
                </div>
              </div>
            );
          case questionType.ESSAY:
            const cauHoi = dsCauHoiTL.find(
              (cauHoi) => cauHoi.idBaiThi === idBaiThi,
            );
            const diem = cauHoi?.diemDatDuoc ?? 0;
            const diemToiDa = cauHoi?.diemToiDa ?? 0;
            return (
              <div key={id} className="uk-margin-bottom">
                <QuestionRow className="uk-flex uk-margin-small-bottom">
                  <span
                    dangerouslySetInnerHTML={{
                      __html: `${viTri}. ${noiDung}`,
                    }}
                    className="uk-flex uk-flex-1 uk-margin-right"
                  >
                    {/* {`${viTri}. ${noiDung}`} */}
                  </span>
                  <MarkContainer className="uk-flex uk-flex-middle">
                    <PointInput
                      className="uk-input input-no-arrow"
                      value={diem}
                      type="number"
                      onChange={(e) => gradeEssayQuestion(e, idBaiThi)}
                    />
                    <Line>/</Line>
                    <span>{`${diemToiDa} điểm`}</span>
                  </MarkContainer>
                </QuestionRow>
                {/* <div
                  className="uk-panel uk-panel-scrollable"
                  style={{ resize: "none", height: 200 }}
                >
                  <p>{dapAnTL}</p>
                </div> */}
                <EssayQuestionBlock
                  publicButtonDisabled
                  readOnly
                  defaultQuestionProp={dapAnTL}
                  hideHeader
                />
              </div>
            );
          default:
            return null;
        }
      })}

      <table className="uk-table-small">
        <thead></thead>
        <tbody>
          <tr>
            <td>
              <Title>Điểm trắc nghiệm</Title>
            </td>
            <td>
              <Value>{`${test?.diemTracNghiem?.toFixed(
                2,
              )} / ${tongDiemTN.current.toFixed(2)} điểm`}</Value>
            </td>
          </tr>
          <tr>
            <td>
              <Title>Điểm tự luận</Title>
            </td>
            <td>
              <Value>{`${diemTL.toFixed(2)} / ${tongDiemTL.current.toFixed(
                2,
              )} điểm`}</Value>
            </td>
          </tr>
          <tr>
            <td>
              <Title>Tổng điểm</Title>
            </td>
            <td>
              <Value>{`${(test?.diemTracNghiem + diemTL).toFixed(2)} / ${(
                tongDiemTN.current + tongDiemTL.current
              ).toFixed(2)} điểm`}</Value>
            </td>
          </tr>
          <tr>
            <td colSpan={2}>
              {/* <Link>Kiểm tra video</Link> */}
              <span>Kiểm tra video</span>
            </td>
          </tr>
        </tbody>
      </table>

      <div className="uk-text-center">
        <button
          className="uk-button"
          style={{ backgroundColor: "#32d296", color: "#FFFFFF" }}
          onClick={onSubmit}
        >
          Lưu
        </button>
      </div>
      <LoadingOverlay isLoading={loading} />
    </div>
  );
};

export default ExamGrading;

const Title = styled.span`
  color: #000;
  margin-right: 5px;
  font-weight: bold;
  @media (max-width: 1024px) {
    display: block;
  }
  ${(props) =>
    props.lineBreak &&
    css`
      display: block;
    `}
`;

const Value = styled.span`
  color: #808080;
`;

const MarkContainer = styled.span`
  border: 1px solid black;
  padding: 5px 20px;
`;

const Line = styled.span`
  padding: 0px 10px;
`;

const PointInput = styled.input`
  width: 50px;
  text-align: right;
  height: 25px;
`;

const AnswerText = styled.span`
  color: #000;
  margin-left: 5px;
`;

const AnswerRow = styled.div`
  margin-bottom: 5px;
  ${(props) =>
    props.correct &&
    css`
      background: #32d296;
    `}
`;

const QuestionRow = styled.div`
  margin-bottom: 5px;
`;
