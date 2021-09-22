import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import { ToastContainer, toast } from "react-toastify";
import EssayQuestionBlock from "./EssayQuestionBlock";
import MultipleChoiceQuestionBlock from "./MultipleChoiceQuestionBlock";
import { questionType, questionLevel } from "../../utils/constants";
import { postAPIWithToken } from "../../utils/api";
import { getUser } from "../../utils/auth";
import ControlBar from "./ControlBar";

import { getAPIWithToken } from "../../utils/api";
import { getToken } from "../../utils/auth";
import LoadingOverlay from "../common/LoadingOverlay";

const token = getUser()?.tk ?? "";

const QuestionAdd = () => {
  const [type, setType] = useState(questionType.MULTIPLE_CHOICE);
  const [level, setLevel] = useState(questionLevel.EASY);
  const [essayQuestions, setEssayQuestions] = useState([]);
  const [multipleChoiceQuestions, setMultipleChoiceQuestions] = useState([]);
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(-1);
  const [loading, setLoading] = useState(false);
  const multipleChoiceRefs = useRef([]);
  const essayRefs = useRef([]);
  const count = useRef(0);
  const hasError = useRef(false);

  const buttonClass = (t) =>
    `uk-button uk-padding uk-padding-remove-vertical ${
      type === t ? "uk-button-primary" : "uk-button-link"
    }`;

  const loadCourses = async () => {
    setLoading(true);
    const token = await getToken();
    const res = await getAPIWithToken(
      "/chuyende/layDanhSachChuyenDe?trangThai=1&limit=9999",
      token,
    );
    setCourses(res.data.dsChuyenDe);
    setSelectedCourse(res.data.dsChuyenDe?.[0].id ?? -1);
    setLoading(false);
  };

  useEffect(() => {
    loadCourses();
  }, []);

  const onToggle = (passedType) => {
    if (passedType !== type) {
      setType(passedType);
    }
  };

  const onChangeLevel = (e) => {
    setLevel(e.target.value);
  };

  const onChangeCourse = (e) => {
    setSelectedCourse(e.target.value);
  };

  const clearQuestions = (type) => {
    if (type === questionType.ESSAY) {
      setEssayQuestions([]);
      essayRefs.current = [];
    } else if (type === questionType.MULTIPLE_CHOICE) {
      setMultipleChoiceQuestions([]);
      multipleChoiceRefs.current = [];
    }
  };

  const onAddNewQuestion = () => {
    count.current += 1;
    if (type === questionType.MULTIPLE_CHOICE) {
      setMultipleChoiceQuestions([...multipleChoiceQuestions, count.current]);
    } else {
      setEssayQuestions([...essayQuestions, count.current]);
    }
  };

  const onRemoveQuestion = (id, type) => {
    if (type === questionType.ESSAY) {
      setEssayQuestions(essayQuestions.filter((question) => question !== id));
    } else {
      setMultipleChoiceQuestions(
        multipleChoiceQuestions.filter((question) => question !== id),
      );
    }
  };

  const onSave = async () => {
    hasError.current = false;
    let refs = [];
    if (type === questionType.MULTIPLE_CHOICE) {
      refs = multipleChoiceRefs.current;
    } else if (type === questionType.ESSAY) {
      refs = essayRefs.current;
    }

    const questionList = refs.reduce((arr, ref) => {
      if (ref !== null) {
        const data = ref.getData();
        if (data.error) {
          hasError.current = true;
          toast.error(data.error);
          return;
        }

        arr.push(data);
        return arr;
      }
    }, []);

    if (hasError.current) {
      return;
    }

    if (selectedCourse === -1) {
      toast.error("Không có môn học");
      return;
    }

    if (questionList.length === 0) {
      toast.error("Không có câu hỏi");
      return;
    }

    try {
      const res = await postAPIWithToken(
        "/cauhoi/themDanhSachCauHoi",
        {
          maChuyenDe: selectedCourse,
          loaiCauHoi: type,
          doKho: level,
          dsCauHoi: questionList,
        },
        token,
      );
      if (res.status === 200) {
        toast.success(
          `Thêm câu hỏi ${
            type === questionType.ESSAY ? "tự luận" : "trắc nghiệm"
          } thành công`,
        );
        clearQuestions(type);
      }
    } catch (err) {
      toast.error("Thêm câu hỏi thất bại.");
    }
  };

  return (
    <>
      <div className="uk-flex uk-flex-column uk-flex-1">
        <div className="uk-flex uk-flex-row uk-height-1-1">
          <ToastContainer
            autoClose={3000}
            position={toast.POSITION.TOP_RIGHT}
          />
          <button
            className={buttonClass(questionType.MULTIPLE_CHOICE)}
            onClick={() => onToggle(questionType.MULTIPLE_CHOICE)}
          >
            Trắc nghiệm
          </button>
          <button
            className={buttonClass(questionType.ESSAY)}
            onClick={() => onToggle(questionType.ESSAY)}
          >
            Tự luận
          </button>
        </div>
        <div
          className="uk-padding uk-height-1-1 uk-flex-1"
          style={{ overflowY: "auto" }}
        >
          <ControlBar
            title="Thêm câu hỏi"
            controlRow={() => (
              <>
                <div className="uk-text">
                  <FilterLabel>Môn học</FilterLabel>
                  <div className="uk-display-inline-block">
                    <FilterSelector
                      className="uk-select uk-width-1-1"
                      style={{
                        border: "solid 0.5px #666",
                      }}
                      value={selectedCourse}
                      onChange={onChangeCourse}
                    >
                      {/* <option>Phần mềm</option> */}
                      {courses?.map((course) => {
                        return (
                          <option key={course.id} value={course.id}>
                            {course.tenChuyenDe}
                          </option>
                        );
                      })}
                    </FilterSelector>
                  </div>
                </div>
                <div className="uk-text-right">
                  <FilterLabel>Mức độ</FilterLabel>
                  <div className="uk-display-inline-block">
                    <FilterSelector
                      className="uk-select uk-width-1-1"
                      style={{
                        border: "solid 0.5px #666",
                      }}
                      value={level}
                      onChange={onChangeLevel}
                    >
                      <option value={questionLevel.EASY}>Dễ</option>
                      <option value={questionLevel.MEDIUM}>Trung bình</option>
                      <option value={questionLevel.HARD}>Khó</option>
                    </FilterSelector>
                  </div>
                </div>
              </>
            )}
          />

          {type === questionType.MULTIPLE_CHOICE ? (
            <div>
              {multipleChoiceQuestions.map((question, index) => {
                return (
                  <MultipleChoiceQuestionBlock
                    key={question}
                    ref={(element) =>
                      (multipleChoiceRefs.current[index] = element)
                    }
                    onRemove={() =>
                      onRemoveQuestion(question, questionType.MULTIPLE_CHOICE)
                    }
                  />
                );
              })}
            </div>
          ) : (
            <div>
              {essayQuestions.map((question, index) => {
                return (
                  <EssayQuestionBlock
                    key={question}
                    ref={(element) => (essayRefs.current[index] = element)}
                    onRemove={() =>
                      onRemoveQuestion(question, questionType.ESSAY)
                    }
                  />
                );
              })}
            </div>
          )}

          <div className="uk-text-right uk-padding">
            <button
              className="uk-button"
              style={{ backgroundColor: "#32d296", color: "#FFFFFF" }}
              onClick={onAddNewQuestion}
            >
              Thêm mới
            </button>
          </div>

          <div className="uk-text-center uk-padding">
            <button
              className="uk-button"
              style={{ backgroundColor: "#32d296", color: "#FFFFFF" }}
              onClick={onSave}
            >
              Lưu
            </button>
          </div>
        </div>
      </div>
      <LoadingOverlay isLoading={loading} />
    </>
  );
};

export default QuestionAdd;

const FilterSelector = styled.select`
  width: 200px;
`;

const FilterLabel = styled.span`
  margin-right: 20px;
  @media (max-width: 1000px) {
    display: block;
    margin-right: 0;
    margin-bottom: 10px;
  }
`;
