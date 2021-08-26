import React, { useEffect, useState } from "react";
import { navigate } from "../../utils/common";
import { Link } from "gatsby";
import { getAPIWithToken } from "../../utils/api";
import { getToken } from "../../utils/auth";
import useWebcamRecorder from "../../hooks/useWebcamRecorder";
import useScreenRecorder from "../../hooks/useScreenRecorder";

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
            {!loading && (
                <div>
                    <p className="uk-text-large uk-text-center uk-text-bold uk-text-success">
                        Phòng thi: {roomName}
                    </p>
                    <div
                        className="uk-margin-bottom uk-flex uk-flex-row uk-flex-center"
                        style={{ marginLeft: 150, marginRight: 150 }}
                    >
                        <div className="uk-grid uk-margin-small uk-width-1-1 uk-flex uk-flex-row uk-flex-center" uk-grid="true">
                            <div className="uk-width-1-1 uk-text-left">
                                <label className="uk-form-label" style={{ fontSize: "large" }}>
                                    Để đảm bảo chất lượng thi và tránh các vấn đề gian lận thi cử. Các sinh viên vui lòng mở Micro và Camera để giảng viên kiểm tra trước khi thi. Các sinh viên tuân thử đúng quy tắc thì mới có thể làm bài thi.
                                </label><br />
                                <label className="uk-form-label" style={{ fontSize: "large" }}>Trong quá trình thi các thí sinh:</label><br />
                                <label className="uk-form-label uk-margin-left" style={{ fontSize: "large" }}><b>Bắt buộc:</b></label><br />
                                <label className="uk-form-label" style={{ fontSize: "large" }}><b>+</b></label><br />
                                <label className="uk-form-label" style={{ fontSize: "large" }}><b>+</b></label><br />
                                <label className="uk-form-label uk-margin-left" style={{ fontSize: "large" }}><b>Không được phép:</b></label><br />
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
                                    Bắt đầu làm bài
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