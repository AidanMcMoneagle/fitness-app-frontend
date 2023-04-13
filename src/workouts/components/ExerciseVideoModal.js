import React from "react";

import ExerciseVideos from "./ExerciseVideos";
import Modal from "../../shared/components/UIElements/Modal";

const ExerciseVideoModal = (props) => {
  // need the exercise name to put in header
  const { closeVideoModal, exerciseName } = props;

  return (
    <Modal
      show
      header={`Video Tutorial - ${exerciseName}`}
      onCancel={closeVideoModal}
      footerStyle={{ display: "none" }}
    >
      <ExerciseVideos exerciseName={exerciseName} />
    </Modal>
  );
};

export default ExerciseVideoModal;
