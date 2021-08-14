import React, { useEffect, useState } from "react";
import { useLocation } from "@reach/router";
import queryString from "query-string";
import { navigate } from "../../utils/common";
import { EXAMINEE_ROLE } from "../../utils/roles";
import useWebcamRecorder from "../../hooks/useWebcamRecorder";
import useScreenRecorder from "../../hooks/useScreenRecorder";
import Countdown from 'react-countdown';
// Data
import mockData from "../../mockData/examtest.json";

const ExamTakerPage = () => {
  const [isPermissionApproved, setIsPermissionApproved] = useState(false);
  const [data, setData] = useState(null);
  const location = useLocation();

  const { isPermissionApproved: webcamApproved, webcamRecorderObject } =
    useWebcamRecorder();
  const { isPermissionApproved: screenRecApproved, screenRecorderObject } =
    useScreenRecorder();

  useEffect(() => {
    if (webcamApproved && screenRecApproved) {
      setIsPermissionApproved(true);
    }
  }, [webcamApproved, screenRecApproved]);

  useEffect(() => {
    if (isPermissionApproved) {
      const queriedExamId = queryString.parse(location.search)?.id;
      if (queriedExamId) {
        // Set data by requesting questionaire with current test id from server
        setData(mockData["examtest"]);
      }
      if (!queriedExamId) {
        navigate(`/examinee/exam-taker`);
      }
    }
  }, [isPermissionApproved]);

  // useEffect(() => {
  //   // Set data by requesting questionaire with current test id from server
  //   setData(mockData["examtest"]);
  // }, []);

  const onSubmit = () => {
    webcamRecorderObject.stop();
    screenRecorderObject.stop();
    navigate(`/examinee/exam-taker`);
  };

  // Renderer callback with condition
  const renderer = ({ hours, minutes, seconds, completed }) => {
    if (completed) {
      // Render a completed state
      return "";
    } else {
      // Render a countdown
      return <span>{hours}:{minutes}:{seconds}</span>;
    }
  };

  const renderExamTaker = () => {
    return (
      <div className="uk-padding-small uk-height-1-1" style={{ overflowY: "auto" }}>
        <div
          className="uk-card uk-card-default uk-grid-collapse uk-margin-small uk-card-hover"
          uk-grid=""
        >
          <div className="uk-card uk-card-default uk-card-body uk-width-3-4@m">
            <div className="uk-flex uk-flex-row">
              <h3 className="uk-card-title uk-width-1-1 uk-text-center uk-margin-medium-top">
                <b>ĐỀ KIỂM TRA TRẮC NGHIỆM</b>
              </h3>
            </div>
            {data.map((examtest) => {
              return (
                <div key={examtest.id}>
                  <div>
                    <div className="uk-card-body">
                      <div className="uk-form-label uk-card-title">
                        <b>
                          {examtest.stt}. {examtest.question}
                        </b>
                      </div>
                      <div className="uk-form-controls uk-margin-small-left">
                        <input className="uk-radio" type="radio" name="radio1" />{" "}
                        {examtest.answer.A}
                        <br />
                        <input
                          className="uk-radio"
                          type="radio"
                          name="radio1"
                        />{" "}
                        {examtest.answer.B}
                        <br />
                        <input
                          className="uk-radio"
                          type="radio"
                          name="radio1"
                        />{" "}
                        {examtest.answer.C}
                        <br />
                        <input
                          className="uk-radio"
                          type="radio"
                          name="radio1"
                        />{" "}
                        {examtest.answer.D}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
            <p className="uk-card-title uk-width-1-1 uk-text-center uk-margin-medium-bottom">
              <button className="uk-button uk-button-primary" onClick={onSubmit}>
                Nộp Bài
              </button>
            </p>
          </div>
          <div className="uk-card uk-card-default uk-card-body uk-width-1-4@m">
            <div className="uk-grid uk-padding-small">
              <div className="uk-width-1-1 uk-margin-bottom">
                <div className="uk-margin-medium">
                  <div className="">
                    <a className="uk-width-1-2@m">
                      <span uk-icon="clock"></span>
                    </a>
                    <Countdown className="uk-width-1-2@m"
                      date={Date.now() + (90 * 60000)}
                      intervalDelay={0}
                      precision={3}
                      renderer={renderer}
                    />
                  </div>
                  <div className="">
                    <label className="uk-form-label uk-margin-small-right"><b>Tên phòng thi</b></label>
                    <label className="uk-form-label">Tên phòng thi</label>
                  </div>
                  <div className="">
                    <label className="uk-form-label uk-margin-small-right"><b>Họ tên</b></label>
                    <label className="uk-form-label">Tên phòng thi</label>
                  </div>
                  <div className="">
                    <label className="uk-form-label uk-margin-small-right"><b>Tên đề thi</b></label>
                    <label className="uk-form-label">Tên phòng thi</label>
                  </div>
                  <div className="">
                    <label className="uk-form-label uk-margin-small-right"><b>Môn học</b></label>
                    <label className="uk-form-label">Tên phòng thi</label>
                  </div>
                  <div className="">
                    <label className="uk-form-label uk-margin-small-right"><b>Mã đề thi</b></label>
                    <label className="uk-form-label">Tên phòng thi</label>
                  </div>
                  <div className="">
                    <label className="uk-form-label uk-margin-small-right"><b>Số câu hỏi</b></label>
                    <label className="uk-form-label">Tên phòng thi</label>
                  </div>
                  <div className="">
                    <label className="uk-form-label uk-margin-small-right"><b>Thời gian làm bài</b></label>
                    <label className="uk-form-label">Tên phòng thi</label>
                  </div>
                  <div className="">
                    <label className="uk-form-label uk-margin-small-right"><b>Ngày thi</b></label>
                    <label className="uk-form-label">Tên phòng thi</label>
                  </div>
                  <div className="">
                    <label className="uk-form-label uk-margin-small-right"><b>Thời gian bắt đầu thi</b></label>
                    <label className="uk-form-label">Tên phòng thi</label>
                  </div>

                </div>
                <hr className="uk-divider-icon" />
                <div className="uk-margin-medium">
                  <div className="uk-flex uk-flex-between uk-margin-small-bottom">
                    <a class="uk-button uk-button-default uk-button-small" href="#">01</a>
                    <a class="uk-button uk-button-default uk-button-small" href="#">02</a>
                    <a class="uk-button uk-button-default uk-button-small" href="#">03</a>
                    <a class="uk-button uk-button-default uk-button-small" href="#">04</a>
                    <a class="uk-button uk-button-default uk-button-small" href="#">05</a>
                  </div>
                  <div className="uk-flex uk-flex-between uk-margin-small-bottom">
                    <a class="uk-button uk-button-default uk-button-small" href="#">06</a>
                    <a class="uk-button uk-button-default uk-button-small" href="#">07</a>
                    <a class="uk-button uk-button-default uk-button-small" href="#">08</a>
                    <a class="uk-button uk-button-default uk-button-small" href="#">09</a>
                    <a class="uk-button uk-button-default uk-button-small" href="#">10</a>
                  </div>
                </div>
                <hr className="uk-divider-icon" />
                <div className="uk-margin-small">
                  <div className="uk-flex uk-flex-center">
                    <label className="uk-form-label uk-text-center" ><b>Ghi chú</b></label>
                  </div>
                  <div class="uk-margin">
                    <textarea class="uk-textarea" rows="4" placeholder=""></textarea>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="uk-height-1-1 uk-background-muted">
      {/* {data ? renderExamTaker() : <span>fail</span>} */}
      {data ? renderExamTaker() : <span uk-spinner="ratio: 4.5"></span>}
    </div>
  );
};

export default ExamTakerPage;

const activeText = {
  color: "#FFF"
};