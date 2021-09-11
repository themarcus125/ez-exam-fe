import styled from "styled-components";

export const ResponsiveFlexWrapper = styled.div`
  display: flex;
  @media only screen and (max-width: 640px) {
    display: inline-block;
  }
`;

export const ResponsiveButtonsWrapper = styled.div`
  display: flex;
  @media only screen and (max-width: 640px) {
    display: inline-block;
    .uk-padding {
      padding: 0;
      padding-top: 16px;
    }
  }
`;

export const ResponsiveGradingQuestionsWrapper = styled.div`
  display: flex;
  .extended-margin-left {
    margin-left: 36px;
  }
  div {
    height: 56px;
    padding-top: 8px;
    align-items: center;
  }
  @media only screen and (max-width: 640px) {
    display: block;

    .extended-margin-left {
      margin-left: 0px;
    }
  }
`;

export const VideoWrapper = styled.div`
  flex: 3;
  @media only screen and (max-width: 640px) {
    height: 400px;
  }
`;
