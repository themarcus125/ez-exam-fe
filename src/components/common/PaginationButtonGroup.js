import React, { Fragment } from "react";

const PaginationButtonGroup = ({
  onPrev,
  onNext,
  onChangePage,
  numOfPage,
  currentPage,
}) => {
  return (
    <Fragment>
      <li className={`${currentPage === 1 ? "uk-disabled" : ""}`}>
        <button
          className="uk-button uk-button-default uk-button-small"
          onClick={onPrev}
        >
          <span className="uk-icon" uk-icon="icon: chevron-left"></span>
        </button>
      </li>
      {Array.from({ length: numOfPage }, (_, i) => i + 1).map((num) => {
        const isActiveButton = currentPage === num;
        return (
          <li key={num} className={`${isActiveButton ? "uk-disabled" : ""}`}>
            <button
              className="uk-button uk-button-default uk-button-small"
              style={{
                ...paginationButton,
                ...(isActiveButton && activeButton),
              }}
              onClick={() => onChangePage(num)}
            >
              {num}
            </button>
          </li>
        );
      })}
      <li className={`${currentPage === numOfPage ? "uk-disabled" : ""}`}>
        <button
          className="uk-button uk-button-default uk-button-small"
          onClick={onNext}
        >
          <span className="uk-icon" uk-icon="icon: chevron-right"></span>
        </button>
      </li>
    </Fragment>
  );
};

export default PaginationButtonGroup;

const paginationButton = {
  width: 40,
};

const activeButton = {
  color: "#FFF",
  backgroundColor: "#32d296",
};
