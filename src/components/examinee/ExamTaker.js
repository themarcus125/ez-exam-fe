import React, { useState } from "react";
import { navigate } from "gatsby";
import { handleLogin, isLoggedIn, isBrowser } from "../../utils/auth";
import { EXAMINEE_ROLE } from "../../utils/roles";

// Component
import NavBar from "../common/NavBar";

// Data
import mockData from "../../mockData/examtest.json";

const ExamTakerPage = () => {
    const role = EXAMINEE_ROLE;

    //   if (isBrowser && isLoggedIn(role)) {
    //     navigate(`/${EXAMINEE_ROLE}`);
    //     return <></>;
    //   }
    const data = mockData["examtest"];

    const renderExamTaker = () => {
        return (
            <div className="uk-padding uk-height-1-1" style={{ overflowY: "auto" }}>
                <div className="uk-card uk-card-default uk-grid-collapse uk-child-width-1-1 uk-margin-small uk-card-hover"
                    uk-grid=""
                >
                    <div className="uk-flex uk-flex-row">
                        <h3 className="uk-card-title uk-width-1-1 uk-text-center uk-margin-medium-top"><b>ĐỀ KIỂM TRA TRẮC NGHIỆM</b></h3>
                    </div>
                    {data.map((examtest) => {
                        return (
                            <div
                                key={examtest.id}
                            >
                                <div>
                                    <div className="uk-card-body">
                                        <div className="uk-form-label uk-card-title"><b>{examtest.stt}. {examtest.question}</b></div>
                                        <div className="uk-form-controls uk-margin-small-left">
                                            <input className="uk-radio" type="radio" name="radio1" /> {examtest.answer.A}<br />
                                            <input className="uk-radio" type="radio" name="radio1" /> {examtest.answer.B}<br />
                                            <input className="uk-radio" type="radio" name="radio1" /> {examtest.answer.C}<br />
                                            <input className="uk-radio" type="radio" name="radio1" /> {examtest.answer.D}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                    <p className="uk-card-title uk-width-1-1 uk-text-center uk-margin-medium-bottom">
                        <button class="uk-button uk-button-primary">Nộp Bài</button>
                    </p>
                    {/* <button class="uk-button uk-button-primary uk-width-1-1 uk-margin-large-left uk-margin-large-right uk-margin-small-bottom">Nộp Bài</button> */}
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
            <div className="uk-background-muted uk-width-4-5">{renderExamTaker()}</div>
        </div>
    );
};

export default ExamTakerPage;
