import React, { useEffect, useState } from "react";
import { navigate } from "gatsby";
import { useLocation } from "@reach/router";
import queryString from "query-string";
import { EXAMINEE_ROLE } from "../../utils/roles";
// Component
import NavBar from "../common/NavBar";

// Data
import mockData from "../../mockData/examtest.json";

const ExamTakerPage = () => {
  const [data, setData] = useState(null);
  const location = useLocation();
  useEffect(() => {
    const queriedExamId = queryString.parse(location.search)?.id;
    if (queriedExamId) {
      // Set data by requesting questionaire with current test id from server
      setData(mockData["examtest"]);
    }
    if (!queriedExamId) {
      navigate(`/${EXAMINEE_ROLE}`);
    }
  }, []);

  const renderExamTaker = () => {
    return (
      <div className="uk-padding uk-height-1-1" style={{ overflowY: "auto" }}>
        <div
          className="uk-card uk-card-default uk-grid-collapse uk-child-width-1-1 uk-margin-small uk-card-hover"
          uk-grid=""
        >
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
            <button className="uk-button uk-button-primary">Nộp Bài</button>
          </p>
        </div>
      </div>
    );
  };

  return (
    <div
      className="uk-flex uk-flex-row"
      style={{ height: "100vh", overflow: "hidden" }}
    >
      <NavBar />
      <div className="uk-background-muted uk-width-4-5">
        {data ? renderExamTaker() : <span uk-spinner="ratio: 4.5"></span>}
      </div>
    </div>
  );
};

export default ExamTakerPage;
