import React, { useEffect, useState } from "react";
import styled, { css } from "styled-components";
import moment from "moment";

import ControlBar from "../common/ControlBar";
import LoadingOverlay from "../common/LoadingOverlay";

import { getAPIWithToken } from "../../utils/api";
import { getToken } from "../../utils/auth";

const defaultScoreboard = [
  {
    diem: 10,
    soLuong: 0,
  },
  {
    diem: 9,
    soLuong: 0,
  },
  {
    diem: 8,
    soLuong: 0,
  },
  {
    diem: 7,
    soLuong: 0,
  },
  {
    diem: 6,
    soLuong: 0,
  },
  {
    diem: 5,
    soLuong: 0,
  },
  {
    diem: 4,
    soLuong: 0,
  },
  {
    diem: 3,
    soLuong: 0,
  },
  {
    diem: 2,
    soLuong: 0,
  },
  {
    diem: 1,
    soLuong: 0,
  },
];

const ExamRoomStatistics = ({ examId }) => {
  const [data, setData] = useState({});
  const [leaderBoard, setLeaderBoard] = useState([]);
  const [scoreBoard, setScoreBoard] = useState(defaultScoreboard);
  const [loading, setLoading] = useState(false);

  const loadData = async () => {
    setLoading(true);
    const token = await getToken();

    const res = await getAPIWithToken(`/phongthi/${examId}/baocao`, token);
    const { data = {} } = res;
    const { thongKeDiem = [], baiThi = [] } = data;
    setData(data);

    const current_scoreBoard = [...scoreBoard];
    thongKeDiem.forEach((item) => {
      const { diem, soLuong } = item;
      const parsedPoint = Number(diem);
      const isInteger = Math.floor(parsedPoint) === parsedPoint;
      let index = -1;

      if (isInteger) {
        index = current_scoreBoard.findIndex(
          (element) => element.diem === parsedPoint,
        );
      } else {
        const basePoint = Math.floor(parsedPoint);
        index = current_scoreBoard.findIndex(
          (element) => element.diem === basePoint,
        );
      }

      if (index !== -1) {
        current_scoreBoard[index].soLuong += soLuong;
      }
    });
    setScoreBoard(current_scoreBoard);

    const testWithPoint = [...baiThi.filter((test) => !!test.diem)];
    let sortedTests = testWithPoint
      .sort((firstObj, secondObj) => {
        return -(Number(firstObj.diem) - Number(secondObj.diem));
      })
      .slice(0, 5);
    let prevNumber = Number(sortedTests[0]?.diem);
    let rank = 1;
    sortedTests = sortedTests.map((test) => {
      const point = Number(test.diem);
      if (point === prevNumber) {
        return {
          ...test,
          rank,
        };
      }

      rank += 1;
      prevNumber = point;
      return {
        ...test,
        rank,
      };
    });
    setLeaderBoard(sortedTests);
    setLoading(false);
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <>
      <div className="uk-padding">
        <ControlBar
          title="Báo cáo tổng hợp"
          controlRow={() => (
            <div
              className="uk-flex uk-child-width-expand@s uk-margin-bottom uk-flex-middle"
              uk-grid="true"
              style={{ marginTop: 0 }}
            >
              <span>
                <Title>Tổng số sinh viên:</Title>
                <Value>{data?.tongSinhVien}</Value>
              </span>
              <span>
                <Title>Số sinh viên vào phòng:</Title>
                <Value>{data?.soSinhVienVaoPhong}</Value>
              </span>
              <span>
                <Title>Số bài thi:</Title>
                <Value>{data?.soBaiThi}</Value>
              </span>
              <span>
                <Title>Phòng thi:</Title>
                <Value>{data?.maPhong}</Value>
              </span>
              <span className="uk-width-auto@m">
                <button className="uk-button">Tải file báo cáo</button>
              </span>
            </div>
          )}
        />

        <table className="uk-table uk-table-striped uk-table-divider">
          <thead>
            <tr>
              <th className="uk-width-small">MSSV</th>
              <th className="uk-width-large">Họ tên</th>
              <th>Mã đề</th>
              <th>Thời gian bắt đầu thi</th>
              <th>Thời gian nộp bài</th>
              <th className="uk-width-small">Điểm</th>
              <th>Xếp hạng</th>
            </tr>
          </thead>
          <tbody>
            {leaderBoard.map((row) => {
              return (
                <tr key={row.maCTPhong}>
                  <td>{row.tenDangNhap}</td>
                  <td>{row.tenNguoiDung}</td>
                  <td>{row.maDe}</td>
                  <td>
                    {moment(row.thoiGianBatDauLamBai).format(
                      "DD/MM/YYYY - HH:mm",
                    )}
                  </td>
                  <td>
                    {moment(row.thoiGianNopBai).format("DD/MM/YYYY - HH:mm")}
                  </td>
                  <td>{row.diem}</td>
                  <td>{row.rank}</td>
                </tr>
              );
            })}
          </tbody>
        </table>

        {!loading && (
          <div className="uk-flex uk-flex-center">
            <table className="uk-table uk-width-1-5 uk-table-striped uk-table-divider">
              <thead>
                <tr>
                  <th>Điểm</th>
                  <th>Số bài thi</th>
                </tr>
              </thead>
              <tbody>
                {scoreBoard.map((row) => {
                  return (
                    <tr key={row.diem}>
                      <td>{row.diem}</td>
                      <td>{row.soLuong}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
      <LoadingOverlay isLoading={loading} />
    </>
  );
};

export default ExamRoomStatistics;

const Title = styled.span`
  color: #000;
  margin-right: 5px;
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
