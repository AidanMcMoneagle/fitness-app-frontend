import React from "react";

import ExerciseVideos from "./ExerciseVideos";
import Modal from "../../shared/components/UIElements/Modal";

const ExerciseVideoModal = (props) => {
  // need the exercise name to put in header
  const { closeVideoModal, exerciseName } = props;

  return (
    <Modal
      show
      header={`${exerciseName} Video Tutorial`}
      onCancel={closeVideoModal}
    >
      <ExerciseVideos exerciseName={exerciseName} />
    </Modal>
  );
};

export default ExerciseVideoModal;
