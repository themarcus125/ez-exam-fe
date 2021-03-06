import React, { useEffect, useState } from "react";
import { navigate } from "../../utils/common";
import { Link } from "gatsby";
import { getAPIWithToken } from "../../utils/api";
import { getToken } from "../../utils/auth";
import useWebcamRecorder from "../../hooks/useWebcamRecorder";
import useScreenRecorder from "../../hooks/useScreenRecorder";
import { ToastContainer, toast } from "react-toastify";

const CheckPermissRoom = ({ roomId }) => {
    const [isPermissionApproved, setIsPermissionApproved] = useState(false);
    const [loading, setLoading] = useState(true);
    const [roomName, setRoomName] = useState("");
    const [isDisabled, setIsDisabled] = useState(true);
    const { isPermissionApproved: webcamApproved, webcamRecorderObject } = useWebcamRecorder();
    const { isPermissionApproved: screenRecApproved, screenRecorderObject } = useScreenRecorder();

    useEffect(async () => {
        getExamRoom();
    }, []);

    useEffect(() => {
        if (webcamApproved && screenRecApproved) {
            setIsPermissionApproved(true);
        }
    }, [webcamApproved, screenRecApproved]);

    useEffect(() => {
        if (isPermissionApproved) {
            if (roomId) {
                // Set data by requesting questionaire with current test id from server
                setIsDisabled(false);
            }
            if (!roomId) {
                navigate(`/examinee/exam-room`);
            }
        }
    }, [isPermissionApproved]);

    const onClick = () => {
        webcamRecorderObject.stop();
        screenRecorderObject.stop();
        navigate(`/examinee/exam-taker/${roomId}`);
    };

    const getExamRoom = async () => {
        setLoading(true);
        const token = await getToken();
        if (token) {
            const tmp_lstExamRoom = await getAPIWithToken(
                `/phongthi?id=${roomId}`,
                token,
            );
            const objExamRoom = tmp_lstExamRoom?.data[0] ?? {};
            if (objExamRoom) {
                setRoomName(objExamRoom.maPhong);
            }
        }
        setLoading(false);
    };

    return (
        <div
            className="uk-padding uk-padding-remove-top uk-padding-remove-bottom uk-height-1-1"
            style={{ overflowY: "auto" }}
        >
            <ToastContainer
                autoClose={3000}
                position={toast.POSITION.TOP_RIGHT}
            />
            {!loading && (
                <div>
                    <p className="uk-text-large uk-text-center uk-text-bold uk-text-success">
                        Ph??ng thi: {roomName}
                    </p>
                    <div
                        className="uk-margin-bottom uk-flex uk-flex-row uk-flex-center"
                        style={{ marginLeft: 150, marginRight: 150 }}
                    >
                        <div className="uk-grid uk-margin-small uk-width-1-1 uk-flex uk-flex-row uk-flex-center" uk-grid="true">
                            <div className="uk-width-1-1 uk-text-left">
                                <label className="uk-form-label" style={{ fontSize: "large" }}>
                                    ????? ?????m b???o ch???t l?????ng thi v?? tr??nh c??c v???n ????? gian l???n thi c???. C??c sinh vi??n vui l??ng m??? Micro v?? Camera ????? gi???ng vi??n ki???m tra tr?????c khi thi. C??c sinh vi??n tu??n th??? ????ng quy t???c th?? m???i c?? th??? l??m b??i thi.
                                </label><br />
                                <label className="uk-form-label" style={{ fontSize: "large" }}>Trong qu?? tr??nh thi c??c th?? sinh:</label><br />
                                <label className="uk-form-label uk-margin-left" style={{ fontSize: "large" }}><b>B???t bu???c:</b></label><br />
                                <label className="uk-form-label" style={{ fontSize: "large" }}><b>+</b></label><br />
                                <label className="uk-form-label" style={{ fontSize: "large" }}><b>+</b></label><br />
                                <label className="uk-form-label uk-margin-left" style={{ fontSize: "large" }}><b>Kh??ng ???????c ph??p:</b></label><br />
                                <label className="uk-form-label" style={{ fontSize: "large" }}><b>+</b></label><br />
                                <label className="uk-form-label" style={{ fontSize: "large" }}><b>+</b></label><br />
                            </div>
                            <div className="uk-flex uk-flex-center examroom_permiss">
                                <span className="icon uk-margin-right uk-width-1-3@m" uk-icon="microphone"></span>
                                <span className="icon uk-width-1-3@m" uk-icon="video-camera"></span>
                            </div>
                            <div className="uk-flex uk-flex-center uk-width-1-1">
                                <button
                                    className={`uk-button`}
                                    style={{ backgroundColor: "#32d296", color: "#FFF" }}
                                    onClick={onClick}
                                    disabled={isDisabled}
                                >
                                    B???t ?????u l??m b??i
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            {loading && (
                <div className="uk-flex uk-flex-center" uk-spinner=""></div>
            )}
        </div>
    );
};

export default CheckPermissRoom;