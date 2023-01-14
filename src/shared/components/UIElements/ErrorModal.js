import React from "react";

import Modal from "./Modal";

const ErrorModal = (props) => {
  return (
    <Modal
      onCancel={props.clearError} // we need this to shut the model window. Will be clearError
      header="An Error Occurred!"
      show={!!props.error} // double bang converts value to a boolean then returns the opposite of the resulting boolean value
      footer={<button onClick={props.clearError}>Okay</button>}
    >
      <p>{props.error}</p>
      {/* this is equal to props.children in Modal and is the error we want to display on the screen */}
    </Modal>
  );
};

export default ErrorModal;
