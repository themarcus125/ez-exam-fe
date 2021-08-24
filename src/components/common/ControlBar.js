import React from "react";
import styled from "styled-components";

const ControlBarWrapper = styled.div`
  .title {
    font-size: 22px;
  }
  .search-bar {
    height: 40px;
  }
  .search-button {
    color: #fff;
    background-color: #32d296;
    margin-left: 20px;
    width: 150px;
  }
`;

const ControlBar = ({
  title,
  controlRow,
  isSearchEnabled,
  searchPlaceholder = "Tìm kiếm",
  searchString,
  onSearchStringChanged,
  onSearchButtonClicked,
}) => {
  return (
    <ControlBarWrapper>
      <p className="title uk-text-large uk-text-uppercase uk-text-center uk-text-bold uk-text-success">
        {title}
      </p>
      <br />
      <div className="uk-child-width-expand@m uk-flex" uk-grid="">
        {controlRow()}
      </div>
      {isSearchEnabled ? (
        <div className="uk-padding uk-padding-remove-horizontal">
          <div className="search-bar uk-flex uk-flex-between">
            <input
              className="uk-search-input black-border"
              type="search"
              placeholder={searchPlaceholder}
              style={{
                padding: 10,
              }}
              value={searchString}
              onChange={onSearchStringChanged}
            />
            <button
              className="search-button uk-button"
              onClick={onSearchButtonClicked}
            >
              Tìm kiếm
            </button>
          </div>
        </div>
      ) : null}
      <div className="uk-margin-top" />
    </ControlBarWrapper>
  );
};

export default ControlBar;
