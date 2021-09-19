import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import UIKit from "uikit/dist/js/uikit.min.js";

import LoadingOverlay from "../common/LoadingOverlay";

import { getAPIWithToken, putAPIWithToken } from "../../utils/api";
import { getToken } from "../../utils/auth";
import { navigate } from "../../utils/common";

const ExamGradingVideo = ({ id }) => {
  const [webcamVideoSrc, setWebcamVideoSrc] = useState("");
  const [screenVideoSrc, setScreenVideoSrc] = useState("");
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(false);

  const loadData = async () => {
    setLoading(true);
    const token = await getToken();

    const response = await getAPIWithToken(
      `/baithi/kiemTraVideo?maCTPhong=${id}`,
      token,
    );

    setWebcamVideoSrc(response?.data?.urlWebcam ?? "");
    setScreenVideoSrc(response?.data?.urlScreen ?? "");
    setLogs(response?.data?.logs ?? []);
    setLoading(false);
  };

  useEffect(() => {
    loadData();
  }, []);

  const onCancelResult = async () => {
    const token = await getToken();

    const response = await putAPIWithToken(`/baithi/huyKetQuaThi`, token, {
      maCTPhong: id,
    });

    if (response.status !== 200) {
      toast.error("Đã có lỗi xảy ra. Vui lòng thử lại sau");
      return;
    }

    toast.success("Hủy kết quả thi thành công!");
    navigate("/examiner/examroom");
  };

  return (
    <>
      <div className="uk-padding">
        <p className="title uk-text-large uk-text-uppercase uk-text-bold uk-text-center uk-text-success">
          Kiểm tra video
        </p>
        <ToastContainer autoClose={3000} position={toast.POSITION.TOP_RIGHT} />
        <div className="uk-flex uk-flex-column">
          <div className="uk-flex uk-flex-row uk-flex-1">
            <div className="uk-flex uk-flex-column uk-flex-1 uk-padding uk-padding-remove-top uk-padding-remove-bottom">
              {!!screenVideoSrc && (
                <video
                  className="uk-margin-bottom"
                  width={"100%"}
                  controls
                  src={screenVideoSrc}
                >
                  Your browser does not support the video tag.
                </video>
              )}
              {!!webcamVideoSrc && (
                <video width={"100%"} controls src={webcamVideoSrc}>
                  Your browser does not support the video tag.
                </video>
              )}
            </div>
            <div className="uk-flex uk-flex-1 uk-flex-column">
              <div className="uk-flex uk-flex-1 uk-flex-column">
                <p className="uk-text-bold uk-margin-remove-bottom">
                  Thông tin report
                </p>
                <ul>
                  {logs.map((log) => {
                    return <li key={log.display}>{log.display}</li>;
                  })}
                </ul>
              </div>
            </div>
          </div>
          <div className="uk-flex uk-flex-row">
            <div className="uk-flex uk-flex-1 uk-padding uk-padding-remove-top uk-padding-remove-bottom" />
            <div className="uk-flex uk-flex-1 uk-padding uk-padding-remove-right uk-padding-remove-left uk-flex-center">
              <button
                className="uk-button uk-button-danger uk-margin-large-right"
                onClick={() => {
                  UIKit.modal.labels = { ok: "Đồng ý", cancel: "Không" };
                  UIKit.modal
                    .confirm("Bạn có chắc chắn muốn hủy kết quả?")
                    .then(onCancelResult, () => {});
                }}
              >
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
      <LoadingOverlay isLoading={loading} />
    </>
  );
};

export default ExamGradingVideo;
