import React, { useState } from "react";

const ExamAdd = () => {
  const [createQuestionaire, setCreateQuestionaire] = useState(false);

  return (
    <div className="uk-padding uk-padding-remove-top uk-padding-remove-bottom uk-height-1-1">
      <p className="uk-text-large uk-text-center uk-text-bold uk-text-success">
        Tạo đề thi
      </p>

      <form class="uk-form-horizontal uk-margin-large">
        <fieldset className="uk-fieldset">
          <div className="uk-margin">
            <label className="uk-form-label" for="form-horizontal-text">
              Tên đề thi
            </label>
            <div className="uk-form-controls">
              <input className="uk-input" type="text" />
            </div>
          </div>

          <div className="uk-margin">
            <label className="uk-form-label" for="form-horizontal-text">
              Môn học
            </label>
            <div className="uk-form-controls">
              <select className="uk-select">
                <option>Môn học A</option>
                <option>Môn học B</option>
              </select>
            </div>
          </div>

          <div className="uk-margin">
            <label className="uk-form-label" for="form-horizontal-text">
              Mức độ
            </label>
            <div className="uk-form-controls">
              <select className="uk-select">
                <option>Dễ</option>
                <option>Trung bình</option>
              </select>
            </div>
          </div>

          <div className="uk-margin">
            <label className="uk-form-label" for="form-horizontal-text">
              Thời gian làm bài
            </label>
            <div className="uk-form-controls">
              <input
                className="uk-input uk-form-width-small"
                type="number"
                min="1"
              />
              <span>phút</span>
            </div>
          </div>

          <div className="uk-margin">
            <label className="uk-form-label" for="form-horizontal-text">
              Ghi chú
            </label>
            <textarea
              className="uk-textarea"
              rows="5"
              placeholder="Textarea"
            ></textarea>
          </div>

          <div className="uk-flex uk-flex-center">
            <div className="uk-card-body">
              <button
                className="uk-button"
                style={{ backgroundColor: "#32d296", color: "#FFF" }}
              >
                Thêm mới câu hỏi
              </button>
            </div>

            <div className="uk-card-body uk-margin-left">
              <button
                className="uk-button"
                style={{ backgroundColor: "#32d296", color: "#FFF" }}
              >
                Chọn câu hỏi có sẵn
              </button>
            </div>
          </div>

          <div className="uk-margin uk-grid-small uk-child-width-auto uk-grid">
            <label>
              <input
                className="uk-checkbox"
                type="checkbox"
                onChange={(e) => setCreateQuestionaire(e.target.checked)}
              />{" "}
              Có tạo bộ đề không?
            </label>
          </div>

          <div className="uk-margin">
            <label className="uk-form-label" for="form-horizontal-text">
              Nhập mã bộ đề
            </label>
            <div className="uk-form-controls">
              <input
                className="uk-input"
                type="text"
                disabled={!createQuestionaire}
              />
            </div>
          </div>

          <div className="uk-margin">
            <label className="uk-form-label" for="form-horizontal-text">
              Số lượng
            </label>
            <div className="uk-form-controls">
              <input
                className="uk-input uk-form-width-small"
                type="number"
                min="1"
                placeholder="1"
                disabled={!createQuestionaire}
              />
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

export default ExamAdd;
