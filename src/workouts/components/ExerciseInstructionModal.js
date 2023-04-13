import React from "react";

import Modal from "../../shared/components/UIElements/Modal";

import "./ExerciseInstructionModal.css";

const ExerciseInstructionModal = (props) => {
  const { instructions, closeInstructionModal, exerciseName } = props;

  return (
    <Modal
      show
      header={`Exercise Instructions - ${exerciseName}`}
      onCancel={closeInstructionModal}
      contentClass="exercise-instruction-content"
      footerStyle={{ display: "none" }}
    >
      {instructions}
    </Modal>
  );
};

export default ExerciseInstructionModal;
