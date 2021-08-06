import React from "react";
import { getAPIWithToken, postAPIWithToken } from "../utils/api";
import { handleLogin, getUserRole } from "../utils/auth";
const ExamRoomAdd = () => {
    const [lstSubject, setLstSubject] = useState(null);

    useEffect(() => {
        console.log('useEffect has been called!');
        let tmp_lstSubject = getAPIWithToken("/chuyende/monhocnguoidung");
        console.log('tmp_lstSubject',tmp_lstSubject);
        setLstSubject(tmp_lstSubject);
        console.log('lstSubject',lstSubject);
    }, []);

    const onSubmit = async (e) => {
        e.preventDefault();
    };
    return (
        <div className="uk-padding uk-padding-remove-top uk-padding-remove-bottom uk-height-1-1"
            style={{ overflowY: "auto" }}
        >
            <p className="uk-text-large uk-text-center uk-text-bold uk-text-success">
                Tạo phòng thi
            </p>

            <form className="uk-form-horizontal uk-margin-small" onSubmit={onSubmit}>
                <fieldset className="uk-fieldset">
                    <div class="uk-grid">
                        <div class="uk-width-1-2 uk-margin-bottom">
                            <div className="uk-margin">
                                <label className="uk-form-label" for="form-horizontal-text">
                                    Chọn ngày
                                </label>
                                <div className="uk-form-controls">
                                    <input className="uk-input uk-form-width-medium" type="date" format="DD-MM-YYYY" />
                                </div>
                            </div>
                        </div>
                        <div class="uk-width-1-2 uk-margin-bottom">
                        </div>
                        <div class="uk-width-1-2 uk-margin-bottom">
                            <div className="uk-margin">
                                <label className="uk-form-label" for="form-horizontal-text">
                                    Thời gian bắt đầu phòng
                                </label>
                                <div className="uk-form-controls">
                                    <input className="uk-input uk-form-width-small" type="time" />
                                </div>
                            </div>
                        </div>
                        <div class="uk-width-1-2 uk-margin-bottom">
                            <div className="uk-margin">
                                <label className="uk-form-label" for="form-horizontal-text">
                                    Thời gian bắt đầu thi
                                </label>
                                <div className="uk-form-controls">
                                    <input className="uk-input uk-form-width-small" type="time" />
                                </div>
                            </div>
                        </div>
                        <div class="uk-width-1-2 uk-margin-bottom">
                            <div className="uk-margin">
                                <label className="uk-form-label" for="form-horizontal-text">
                                    Môn học
                                </label>
                                <div className="uk-form-controls">
                                    <select className="uk-select">
                                        <option>Toán cao cấp B1</option>
                                        <option>Vật lý đại cương</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div class="uk-width-1-2 uk-margin-bottom">
                            <div className="uk-margin">
                                <label className="uk-form-label" for="form-horizontal-text">
                                    Mã bộ đề
                                </label>
                                <div className="uk-form-controls">
                                    <select className="uk-select">
                                        <option>103</option>
                                        <option>104</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div class="uk-width-1-2 uk-margin-bottom">
                            <div className="uk-margin">
                                <label className="uk-form-label" for="form-horizontal-text">
                                    Từ sinh viên
                                </label>
                                <div className="uk-form-controls">
                                    <select className="uk-select">
                                        <option>200001</option>
                                        <option>200031</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div class="uk-width-1-2 uk-margin-bottom">
                            <div className="uk-margin">
                                <label className="uk-form-label" for="form-horizontal-text">
                                    Đến sinh viên
                                </label>
                                <div className="uk-form-controls">
                                    <select className="uk-select">
                                        <option>200030</option>
                                        <option>200060</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div class="uk-width-1-2 uk-margin-bottom">
                            <div className="uk-margin">
                                <label className="uk-form-label" for="form-horizontal-text">
                                    Số lượng
                                </label>
                                <div className="uk-form-controls">
                                    <input className="uk-input uk-form-width-small" type="number" min="1" placeholder="1" disabled />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="uk-flex uk-flex-center">
                        <div className="uk-card-body">
                            <button
                                className="uk-button"
                                style={{ backgroundColor: "#32d296", color: "#FFF" }}
                            >
                                Lưu
                            </button>
                        </div>
                    </div>
                </fieldset>
            </form>
        </div>
    );
};

export default ExamRoomAdd;