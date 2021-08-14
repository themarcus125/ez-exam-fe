import React, { useEffect, useState, useRef } from "react";
import { Link } from "gatsby";
import moment from "moment";
import { getAPIWithToken } from "../../utils/api";
import { getToken, getUser } from "../../utils/auth";
import Config from "../../utils/config";

const ExamRoom = () => {
    const [lstExamRoom, setLstExamRoom] = useState([]);

    return (
        <div
            className="uk-padding uk-padding-remove-top uk-padding-remove-bottom uk-height-1-1"
            style={{ overflowY: "auto" }}
        >
            <p className="uk-text-large uk-text-center uk-text-bold uk-text-success">
                Danh sách phòng thi
            </p>
            <div
                className="uk-flex uk-flex-row uk-flex-between uk-margin-bottom"
                style={{ marginLeft: 100, marginRight: 100 }}
            >
                <div className="uk-grid-column-small uk-grid-row-large uk-child-width-1-3@s uk-text-center" uk-grid="true">
                    <div>
                        <div className="uk-card uk-card-default uk-card-body uk-flex uk-flex-row uk-flex-between">
                            <a className="uk-width-1-3@m">
                                <span uk-icon="home"></span>
                            </a>
                            <hr class="uk-divider-vertical"></hr>
                            <div className="uk-width-2-3@m">
                                <label className="uk-form-label uk-margin-small-right"><b>Tên phòng thi</b></label>
                                <label className="uk-form-label">Tên phòng thi</label>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className="uk-card uk-card-default uk-card-body">Item</div>
                    </div>
                    <div>
                        <div className="uk-card uk-card-default uk-card-body">Item</div>
                    </div>
                    <div>
                        <div className="uk-card uk-card-default uk-card-body">Item</div>
                    </div>
                    <div>
                        <div className="uk-card uk-card-default uk-card-body">Item</div>
                    </div>
                    <div>
                        <div className="uk-card uk-card-default uk-card-body">Item</div>
                    </div>
                    <div>
                        <div className="uk-card uk-card-default uk-card-body">Item</div>
                    </div>
                    <div>
                        <div className="uk-card uk-card-default uk-card-body">Item</div>
                    </div>
                    <div>
                        <div className="uk-card uk-card-default uk-card-body">Item</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ExamRoom;