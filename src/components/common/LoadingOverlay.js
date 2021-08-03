import React from "react";

const LoadingOverlay = ({ isLoading }) => {
  return isLoading ? (
    <div className="uk-position-cover uk-overlay uk-overlay-default uk-flex uk-flex-center uk-flex-middle">
      <span uk-spinner="ratio: 4.5"></span>
    </div>
  ) : null;
};

export default LoadingOverlay;
