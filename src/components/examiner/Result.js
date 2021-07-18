import React from "react";

// Component
import NavBar from "../common/NavBar";

// Data
import MockData from "../../mockData/data.json";

const Result = () => {
  let numberOfCorrectAnswer = 0;
  const examineeAnswer = MockData["examineeAnswer"];
  const quiz = MockData["quiz"].map((item, index) => {
    const studentAnswer = examineeAnswer[index];
    if (studentAnswer === item.correctAnswerIndex) {
      numberOfCorrectAnswer++;
    }
    return {
      ...item,
      studentAnswer,
    };
  });

  const renderResult = () => {
    return (
      <div className="uk-padding uk-height-1-1" style={{ overflowY: "auto" }}>
        {renderScore()}
        {quiz.map((item) => {
          return (
            <div
              key={item.id}
              className="uk-card uk-card-default uk-grid-collapse uk-child-width-1-1 uk-margin uk-card-hover"
              uk-grid=""
            >
              <div>
                <div className="uk-card-body">
                  <div className="uk-flex uk-flex-row uk-margin-small">
                    <h3 className="uk-card-title uk-width-5-6">
                      {item.question}
                    </h3>
                    <div className="uk-flex uk-flex-1 uk-flex-right uk-flex-top uk-margin-remove-top">
                      <button
                        className="uk-button uk-button-default"
                        type="button"
                        uk-toggle={`target: .toggle-${item.id}`}
                      >
                        Details
                      </button>
                    </div>
                  </div>
                  <p
                    className={`toggle-${item.id} ${
                      item.studentAnswer === item.correctAnswerIndex
                        ? "uk-text-success"
                        : "uk-text-danger"
                    }`}
                  >
                    {item.answer[item.studentAnswer]}
                  </p>
                  <p className={`toggle-${item.id}`} hidden>
                    {item.answer.map((answer, index) => {
                      return (
                        <p
                          key={answer}
                          className="uk-padding-small"
                          style={
                            index === item.studentAnswer &&
                            item.studentAnswer !== item.correctAnswerIndex
                              ? {
                                  backgroundColor: "#f0506e",
                                  color: "#FFFFFF",
                                }
                              : index === item.correctAnswerIndex
                              ? {
                                  backgroundColor: "#32d296",
                                  color: "#FFFFFF",
                                }
                              : {}
                          }
                        >
                          {answer}
                        </p>
                      );
                    })}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
        {renderVideoPlayback()}
        {renderAudioPlayback()}
      </div>
    );
  };

  const renderScore = () => {
    return <h3>{`Correct answer: ${numberOfCorrectAnswer}/${quiz.length}`}</h3>;
  };

  const renderVideoPlayback = () => {
    return <h3>Video playback</h3>;
  };

  const renderAudioPlayback = () => {
    return <h3>Audio playback</h3>;
  };

  return (
    <div
      className="uk-flex uk-flex-row"
      style={{ height: "100vh", overflow: "hidden" }}
    >
      <NavBar />
      <div className="uk-background-muted uk-width-4-5">{renderResult()}</div>
    </div>
  );
};

export default Result;
