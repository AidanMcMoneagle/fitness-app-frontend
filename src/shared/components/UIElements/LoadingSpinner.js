import React from "react";
import ReactDOM from "react-dom";

import "./LoadingSpinner.css";

const LoadingSpinner = (props) => {
  const content = (
    <div className="loading-spinner__overlay" style={props.overLayStyle}>
      <div className="lds-dual-ring"></div>
    </div>
  );

  return ReactDOM.createPortal(
    content,
    document.getElementById("loading-spinner")
  );
};

export default LoadingSpinner;
