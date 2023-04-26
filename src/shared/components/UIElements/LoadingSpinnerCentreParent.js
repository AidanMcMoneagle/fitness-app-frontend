import React from "react";
import ReactDOM from "react-dom";

import "./LoadingSpinner.css";

const LoadingSpinnerCentreParent = () => {
  const content = (
    <div className="loading-spinner__overlay__centre">
      <div className="lds-dual-ring"></div>
    </div>
  );

  return ReactDOM.createPortal(
    content,
    document.getElementById("loading-spinner")
  );
};

export default LoadingSpinnerCentreParent;
