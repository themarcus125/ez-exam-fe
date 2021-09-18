import React from "react";
import { ToastContainer, toast } from "react-toastify";

const ExamGradingVideo = () => {
  return (
    <div className="uk-padding">
      <p className="title uk-text-large uk-text-uppercase uk-text-bold uk-text-center uk-text-success">
        Kiểm tra video
      </p>
      <ToastContainer autoClose={3000} position={toast.POSITION.TOP_RIGHT} />
      <div className="uk-flex uk-flex-column">
        <div className="uk-flex uk-flex-row uk-flex-1">
          <div className="uk-flex uk-flex-1 uk-padding uk-padding-remove-top uk-padding-remove-bottom">
            <div
              style={{ backgroundColor: "black", height: 400, width: "100%" }}
            />
          </div>
          <div className="uk-flex uk-flex-1 uk-flex-column">
            <div className="uk-flex uk-flex-1 uk-flex-column">
              <p className="uk-text-bold uk-margin-remove-bottom">
                Thông tin report
              </p>
              <ul>
                <li>00:30:54 - Có tiếng động</li>
                <li>00:33:54 - Có tiếng động</li>
              </ul>
            </div>
          </div>
        </div>
        <div className="uk-flex uk-flex-row">
          <div className="uk-flex uk-flex-1 uk-padding uk-padding-remove-top uk-padding-remove-bottom" />
          <div className="uk-flex uk-flex-1 uk-padding uk-padding-remove-right uk-padding-remove-left uk-flex-center">
            <button className="uk-button uk-button-danger uk-margin-large-right">
              Hủy kết quả
            </button>
            <button
              className="uk-button"
              style={{ backgroundColor: "#32d296", color: "#FFFFFF" }}
            >
              Tải thông tin report
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExamGradingVideo;
