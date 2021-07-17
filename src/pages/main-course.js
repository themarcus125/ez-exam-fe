import React from "react";
import { Link } from "gatsby";
import moment from "moment";
import mockData from "../mockData/data.json";

const mainCoursePage = () => {
  const data = mockData["test"];

  const renderTests = () => {
    return (
      <div className="uk-padding">
        {data.map((test) => {
          return (
            <div
              key={test.id}
              className="uk-card uk-card-default uk-grid-collapse uk-child-width-1-1 uk-margin uk-card-hover"
              uk-grid
            >
              <div>
                <div className="uk-card-body">
                  <div className="uk-flex uk-flex-row uk-margin-small">
                    <h3 className="uk-card-title uk-width-3-4">{test.name}</h3>
                    <p className="uk-flex uk-flex-1 uk-flex-right uk-margin-remove-top">{`Examiner: ${test.examiner}`}</p>
                  </div>
                  <div className="uk-flex uk-flex-row uk-flex-between uk-flex-bottom">
                    <p className="uk-margin-remove-bottom">{`${moment(
                      test.date,
                    ).format("MMMM Do YYYY, hh:mm a")} - Participants: ${
                      test.numOfExaminees
                    }`}</p>
                    <Link className="uk-button uk-background-muted uk-text-primary">
                      Go to Test
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className="uk-background-muted" style={{ height: "100vh" }}>
      {renderTests()}
    </div>
  );
};

export default mainCoursePage;
