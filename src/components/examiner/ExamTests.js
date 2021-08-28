import React, { useEffect, useState, useRef } from "react";
import styled, { css } from "styled-components";
import moment from "moment";
import { Link } from "gatsby";

import ControlBar from "../common/ControlBar";
import PaginationButtonGroup from "../common/PaginationButtonGroup";

import { getAPIWithToken } from "../../utils/api";
import { getToken } from "../../utils/auth";

const EXAM_PER_PAGE = 6;

const ExamTests = ({ examId }) => {
  const [exams, setExams] = useState([]);
  const [key, setKey] = useState("");
  const [course, setCourse] = useState("");
  const [examDate, setExamDate] = useState("");
  const [roomId, setRoomId] = useState("");
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const numOfPage = useRef(1);

  const loadData = async () => {
    setLoading(true);
    const token = await getToken();
    const response = await getAPIWithToken(
      `/phongthi/${examId}/baithi?timkiem=${key}`,
      token,
    );
    setCourse(response?.data?.tenMonHoc ?? "");
    setExamDate(response?.data?.ngayThi);
    setRoomId(response?.data?.maPhong);
    numOfPage.current =
      Math.ceil(response.data.baiThi.length / EXAM_PER_PAGE) || 1;
    const chunks = Array(numOfPage.current)
      .fill()
      .map((_, index) => index * EXAM_PER_PAGE)
      .map((begin) => response.data.baiThi.slice(begin, begin + EXAM_PER_PAGE));
    setExams(chunks);
    setCurrentPage(1);
    setLoading(false);
  };

  useEffect(() => {
    loadData();
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

  return (
    <div className="uk-padding">
      <ControlBar
        title="Danh sách bài thi"
        controlRow={() => (
          <div
            className="uk-flex uk-child-width-expand@s uk-margin-bottom"
            uk-grid="true"
          >
            <span>
              <Title>Môn học</Title>
              <Value>{course}</Value>
            </span>
            <span>
              <Title>Ngày thi</Title>
              <Value>{moment(examDate).format("DD/MM/YYYY")}</Value>
            </span>
            <span>
              <Title>Phòng thi</Title>
              <Value>{roomId}</Value>
            </span>
          </div>
        )}
        isSearchEnabled={true}
        searchString={key}
        onSearchStringChanged={(e) => {
          setKey(e.target.value);
        }}
        onSearchButtonClicked={() => loadData()}
      />
      {loading && <div className="uk-flex uk-flex-center" uk-spinner=""></div>}
      <div className="uk-margin-top uk-overflow-auto">
        <table className="uk-table uk-table-striped uk-table-middle">
          <thead>
            <tr>
              <th className="uk-width-medium">MSSV</th>
              <th className="uk-width-large">Họ tên</th>
              <th className="uk-width-large">Mã đề</th>
              <th className="uk-width-large">Thời gian bắt đầu thi</th>
              <th className="uk-width-large">Thời gian nộp bài</th>
              <th className="uk-width-medium"></th>
            </tr>
          </thead>
          <tbody>
            {!loading &&
              exams[currentPage - 1]?.map((exam, index) => (
                <tr key={exam.maCTPhong}>
                  <td>{exam.tenDangNhap}</td>
                  <td>{exam.tenNguoiDung}</td>
                  <td>{exam.maDe}</td>
                  <td>
                    {exam.thoiGianBatDauLamBai
                      ? moment(exam.thoiGianBatDauLamBai).format(
                          "HH:mm DD/MM/YYYY",
                        )
                      : "Chưa làm bài"}
                  </td>
                  <td>
                    {exam.thoiGianNopBai
                      ? moment(exam.thoiGianNopBai).format("HH:mm DD/MM/YYYY")
                      : "Chưa làm bài"}
                  </td>
                  <td>
                    <ul className="uk-subnav-pill">
                      <a
                        style={{
                          color: "#FFF",
                        }}
                      >
                        <span uk-icon="table"></span>
                      </a>
                      <div uk-dropdown="mode: click">
                        <ul className="uk-nav uk-dropdown-nav">
                          <li>
                            {!!exam.thoiGianBatDauLamBai &&
                            !!exam.thoiGianNopBai ? (
                              <Link
                                to={`/examiner/exam-grading/${exam.maCTPhong}`}
                              >
                                Xem chi tiết
                              </Link>
                            ) : (
                              <a>Xem chi tiết</a>
                            )}
                          </li>
                        </ul>
                      </div>
                    </ul>
                  </td>
                </tr>
              ))}
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

export default ExamTests;

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
