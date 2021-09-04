import React, { useState, useEffect, useRef } from "react";
import { questionLevel, questionType } from "../../utils/constants";
import ControlBar from "./ControlBar";
import QuestionTable from "./QuestionTable";

import { getAPIWithToken } from "../../utils/api";
import { getToken } from "../../utils/auth";

const Question = () => {
  const [level, setLevel] = useState(questionLevel.EASY);
  const [type, setType] = useState(questionType.MULTIPLE_CHOICE);
  const [currentCourse, setCurrentCourse] = useState(-1);
  const [courses, setCourses] = useState([]);
  const [searchString, setSearchString] = useState("");
  const [search, setSearch] = useState("");

  const loadData = async () => {
    const token = await getToken();
    const res = await getAPIWithToken(
      "/chuyende/layDanhSachChuyenDe?trangThai=1&limit=9999",
      token,
    );
    setCourses(res.data.dsChuyenDe);
    setCurrentCourse(+res.data.dsChuyenDe[0]?.id);
  };

  useEffect(() => {
    loadData();
  }, []);

  const onChangeLevel = (e) => {
    setLevel(e.target.value);
  };

  const onChangeType = (e) => {
    setType(e.target.value);
  };

  const onChangeCourse = (e) => {
    setCurrentCourse(e.target.value);
  };

  const onChangeSearch = (e) => {
    setSearchString(e.target.value);
  };

  const onSearch = () => {
    setSearch(searchString);
  };

  return (
    <div
      className="uk-padding uk-padding-remove-vertical uk-height-1-1"
      style={{ overflowY: "auto" }}
    >
      <ControlBar
        title="Danh sách câu hỏi"
        controlRow={() => (
          <>
            <div className="uk-width-1-3@l uk-display-inline-block">
              <span className="uk-display-inline-block uk-width-1-4">
                Môn học
              </span>
              <div className="uk-display-inline-block uk-width-3-4">
                <select
                  className="uk-select uk-width-1-1 black-border"
                  value={currentCourse}
                  onChange={onChangeCourse}
                >
                  {courses?.map((course) => {
                    return (
                      <option key={course.id} value={course.id}>
                        {course.tenChuyenDe}
                      </option>
                    );
                  })}
                </select>
              </div>
            </div>

            <div className="uk-width-1-3@l uk-display-inline-block">
              <span className="uk-display-inline-block uk-width-1-4">
                Loại câu hỏi
              </span>
              <div className="uk-display-inline-block uk-width-3-4">
                <select
                  className="uk-select uk-width-1-1 black-border"
                  value={type}
                  onChange={onChangeType}
                  onBlur={() => {}}
                >
                  <option value={questionType.MULTIPLE_CHOICE}>
                    Trắc nghiệm
                  </option>
                  <option value={questionType.ESSAY}>Tự luận</option>
                </select>
              </div>
            </div>

            <div className="uk-width-1-3@l uk-display-inline-block">
              <span className="uk-display-inline-block uk-width-1-4">
                Mức độ
              </span>
              <div className="uk-display-inline-block uk-width-3-4">
                <select
                  className="uk-select uk-width-1-1 black-border"
                  value={level}
                  onChange={onChangeLevel}
                  onBlur={() => {}}
                >
                  <option value={questionLevel.EASY}>Dễ</option>
                  <option value={questionLevel.MEDIUM}>Trung bình</option>
                  <option value={questionLevel.HARD}>Khó</option>
                </select>
              </div>
            </div>
          </>
        )}
        isSearchEnabled
        searchString={searchString}
        onSearchStringChanged={onChangeSearch}
        onSearchButtonClicked={onSearch}
      />

      <QuestionTable
        type={type}
        level={level}
        course={currentCourse}
        searchString={search}
      />
    </div>
  );
};

export default Question;
