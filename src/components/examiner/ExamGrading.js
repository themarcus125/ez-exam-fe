import React from "react";
import { Link } from "gatsby";
import styled, { css } from "styled-components";

const ExamGrading = () => {
  return (
    <div className="uk-padding">
      <p className="uk-text-large uk-text-center uk-text-bold uk-text-success">
        Bài thi của sinh viên
      </p>
      <div class="uk-flex uk-child-width-expand@s uk-margin-bottom" uk-grid>
        <span>
          <Title>MSSV</Title>
          <Value>200302</Value>
        </span>
        <span>
          <Title>Họ tên</Title>
          <Value>Nguyễn Ngọc Mai</Value>
        </span>
        <span>
          <Title>Phòng thi</Title>
          <Value>PT00343</Value>
        </span>
      </div>
      <div class="uk-flex uk-child-width-expand@s uk-margin-bottom" uk-grid>
        <span>
          <Title>Ngày thi</Title>
          <Value>12/07/2021</Value>
        </span>
        <span>
          <Title>Thời gian bắt đầu thi</Title>
          <Value>9:30</Value>
        </span>
        <span>
          <Title>Thời gian nộp bài</Title>
          <Value>11:30</Value>
        </span>
      </div>
      <div className="uk-margin-bottom">
        <Title lineBreak>Ghi chú</Title>
        <Value>
          Em không thể thêm phân số được Em không thể thêm phân số được Em không
          thể thêm phân số được Em không thể thêm phân số được Em không thể thêm
          phân số được Em không thể thêm phân số được Em không thể thêm phân số
          được Em không thể thêm phân số được
        </Value>
      </div>

      <div className="uk-margin-bottom">
        <QuestionRow className="uk-flex">
          <span className="uk-flex uk-flex-1 uk-margin-right">
            1. Đâu là ngôn ngữ lập trình?
          </span>
          <MarkContainer className="uk-flex uk-flex-middle">
            <PointInput className="uk-input" value="1" readOnly />
            <Line>/</Line>
            <span>1 điểm</span>
          </MarkContainer>
        </QuestionRow>
        <div>
          <AnswerRow className="uk-flex uk-flex-row">
            <div>
              <input className="uk-radio" type="radio" />
            </div>
            <AnswerText>Java</AnswerText>
          </AnswerRow>
        </div>
        <div
          className="uk-panel uk-panel-scrollable"
          style={{ resize: "none", height: 200 }}
        >
          <p>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book. It has survived not
            only five centuries, but also the leap into electronic typesetting,
            remaining essentially unchanged. It was popularised in the 1960s
            with the release of Letraset sheets containing Lorem Ipsum passages,
            and more recently with desktop publishing software like Aldus
            PageMaker including versions of Lorem Ipsum.
          </p>
          <p>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book. It has survived not
            only five centuries, but also the leap into electronic typesetting,
            remaining essentially unchanged. It was popularised in the 1960s
            with the release of Letraset sheets containing Lorem Ipsum passages,
            and more recently with desktop publishing software like Aldus
            PageMaker including versions of Lorem Ipsum.
          </p>
          <p>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book. It has survived not
            only five centuries, but also the leap into electronic typesetting,
            remaining essentially unchanged. It was popularised in the 1960s
            with the release of Letraset sheets containing Lorem Ipsum passages,
            and more recently with desktop publishing software like Aldus
            PageMaker including versions of Lorem Ipsum.
          </p>
        </div>
      </div>

      <table className="uk-table-small">
        <thead></thead>
        <tbody>
          <tr>
            <td>
              <Title>Điểm trắc nghiệm</Title>
            </td>
            <td>
              <Value>1/1 điểm</Value>
            </td>
          </tr>
          <tr>
            <td>
              <Title>Điểm tự luận</Title>
            </td>
            <td>
              <Value>1/2 điểm</Value>
            </td>
          </tr>
          <tr>
            <td>
              <Title>Tổng điểm</Title>
            </td>
            <td>
              <Value>2/3 điểm</Value>
            </td>
          </tr>
          <tr>
            <td colSpan={2}>
              <Link>Kiểm tra video</Link>
            </td>
          </tr>
        </tbody>
      </table>

      <div className="uk-text-center">
        <button
          className="uk-button"
          style={{ backgroundColor: "#32d296", color: "#FFFFFF" }}
        >
          Lưu
        </button>
      </div>
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
`;

const QuestionRow = styled.div`
  margin-bottom: 5px;
`;
