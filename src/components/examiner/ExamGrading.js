import React, { useEffect, useState, useRef } from "react";
import { Link } from "gatsby";
import styled, { css } from "styled-components";
import moment from "moment";
import { ToastContainer, toast } from "react-toastify";

import LoadingOverlay from "../common/LoadingOverlay";

import { getAPIWithToken, putAPIWithToken } from "../../utils/api";
import { getToken } from "../../utils/auth";
import { questionType } from "../../utils/constants";

const ExamGrading = () => {
  const [test, setTest] = useState({});
  const [loading, setloading] = useState(true);
  const [dsCauHoiTL, setDSCauHoiTL] = useState([]);
  const tongDiemTL = useRef(0);
  const tongDiemTN = useRef(0);

  const loadData = async () => {
    setloading(true);
    const token = await getToken();
    const response = await getAPIWithToken(
      `/baithi/layChiTietBaiThi?maCTPhong=331`,
      token,
    );
    console.log(response);
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
          };
        }),
    );
    setTest(response.data);
    setloading(false);
  };

  const onSubmit = async () => {
    if (!test?.soLuongTuLuan) {
      toast.info("Không có câu hỏi tự luận");
      return;
    }

    // const token = await getToken();
    // const res = await putAPIWithToken(
    //   `/baithi/suaKetQuaThi`,
    //   {
    //     // maCTPhong: 313,
    //     // diemTracNghiem: test?.diemTracNghiem,
    //     // diemTuLuan: 1,
    //     // baiThi:[
    //     //     {
    //     //         idBaiThi: 2,
    //     //         diemDatDuoc: 1
    //     //     }
    //     // ]
    //   },
    //   token,
    // );
  };

  const gradeEssayQuestion = (e, idBaiThi) => {
    const index = dsCauHoiTL.findIndex(
      (cauHoi) => cauHoi.idBaiThi === idBaiThi,
    );

    setDSCauHoiTL([
      ...dsCauHoiTL.slice(0, index),
      {
        ...dsCauHoiTL[index],
        diemDatDuoc: +e.target.value,
      },
      ...dsCauHoiTL.slice(index + 1),
    ]);
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div className="uk-padding">
      <p className="uk-text-large uk-text-center uk-text-bold uk-text-success">
        Bài thi của sinh viên
      </p>
      <ToastContainer autoClose={3000} position={toast.POSITION.TOP_RIGHT} />
      <div
        className="uk-flex uk-child-width-expand@s uk-margin-bottom"
        uk-grid="true"
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
            const diem = dsCauHoiTL.find(
              (cauHoi) => cauHoi.idBaiThi === idBaiThi,
            );
            return (
              <div key={id} className="uk-margin-bottom">
                <QuestionRow className="uk-flex">
                  <span className="uk-flex uk-flex-1 uk-margin-right">
                    {`${viTri}. ${noiDung}`}
                  </span>
                  <MarkContainer className="uk-flex uk-flex-middle">
                    <PointInput
                      className="uk-input"
                      value={diem}
                      type="number"
                      onChange={(e) => gradeEssayQuestion(e, idBaiThi)}
                    />
                    <Line>/</Line>
                    <span>1 điểm</span>
                  </MarkContainer>
                </QuestionRow>
                <div
                  className="uk-panel uk-panel-scrollable"
                  style={{ resize: "none", height: 200 }}
                >
                  <p>{dapAnTL}</p>
                </div>
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
              <Value>{`${test?.diemTuLuan?.toFixed(
                2,
              )} / ${tongDiemTL.current.toFixed(2)} điểm`}</Value>
            </td>
          </tr>
          <tr>
            <td>
              <Title>Tổng điểm</Title>
            </td>
            <td>
              <Value>{`${test?.diem} / ${(
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
