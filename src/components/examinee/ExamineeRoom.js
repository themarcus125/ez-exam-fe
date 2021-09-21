import React, { useEffect, useState } from "react";
import moment from "moment";
import { Link } from "gatsby";
import { navigate } from "../../utils/common";
import { getAPIWithToken } from "../../utils/api";
import { getToken } from "../../utils/auth";
import { ToastContainer, toast } from "react-toastify";

const ExamRoom = () => {
  const [loading, setLoading] = useState(true);
  const [lstExamRoom, setLstExamRoom] = useState([]);
  useEffect(async () => {
    setLoading(true);
    const token = await getToken();
    const tmp_lstExamRoom = await getAPIWithToken("/sinhvien/phongthi", token);
    setLstExamRoom(tmp_lstExamRoom.data);
    setLoading(false);
  }, []);

  const onClickJoinRoom = async (objExamRoom) => {
    const token = await getToken();
    const timeSystem = await getAPIWithToken("/hethong/thoigian", token);
    if (Date.parse(new Date(timeSystem?.data?.ngayGio)) >=
      Date.parse(
        moment(moment(objExamRoom.ngayThi).format("DD/MM/YYYY") + " " +
          objExamRoom.thoiGianBatDauPhong, "DD/MM/YYYY hh:mm"),
      )) {
      navigate(`/examinee/exam-taker/${objExamRoom.id}`);
    }
    else {
      toast.warning("Chưa đến thời gian vào phòng !!!");
    }
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
      <p className="title uk-text-large uk-text-uppercase uk-text-center uk-text-bold uk-text-success">
        Danh sách phòng thi
      </p>
      <div
        className="uk-margin-bottom"
        style={{ marginLeft: 80, marginRight: 80 }}
      >
        <div
          className="uk-grid-column-small uk-grid-row-large uk-child-width-1-3@s uk-text-center"
          uk-grid="true"
        >
          {!loading &&
            lstExamRoom?.map((item) => {
              return (
                <div key={item.id}>
                  <a
                    // to={`/examinee/exam-taker/${item.id}`}
                    onClick={() => onClickJoinRoom(item)}
                    style={{ "textDecoration": "none" }}
                  >
                    <div className="uk-card uk-card-default uk-flex uk-flex-row uk-flex-between examineeroom_grid">
                      <span
                        className="icon uk-width-1-3@m"
                        uk-icon="home"
                      ></span>
                      <hr className="uk-divider-vertical"></hr>
                      <div className="uk-width-2-3@m">
                        <div>
                          <label
                            className="uk-form-label uk-margin-small-right"
                            style={{ fontSize: "large" }}
                          >
                            <b>{item.tenPhong}</b>
                          </label>
                        </div>
                        <div>
                          <label className="uk-form-label uk-margin-small-right">
                            Ngày thi:
                          </label>
                          <label className="uk-form-label">
                            <b>{moment(item.ngayThi).format("DD/MM/YYYY")}</b>
                          </label>
                        </div>
                        <div>
                          <label className="uk-form-label uk-margin-small-right">
                            Môn học:
                          </label>
                          <label className="uk-form-label">
                            <b>{item.tenMonHoc}</b>
                          </label>
                        </div>
                        <div>
                          <label className="uk-form-label uk-margin-small-right">
                            Giờ thi:
                          </label>
                          <label className="uk-form-label">
                            <b>{item.thoiGianBatDauThi}</b>
                          </label>
                        </div>
                      </div>
                    </div>
                  </a>
                </div>
              );
            })}
        </div>
      </div>
      {loading && <div className="uk-flex uk-flex-center" uk-spinner=""></div>}
    </div>
  );
};

export default ExamRoom;
