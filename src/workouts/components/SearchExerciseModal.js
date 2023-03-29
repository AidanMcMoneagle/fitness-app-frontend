import React, { useState } from "react";
import Modal from "../../shared/components/UIElements/Modal";
import SearchExercise from "./SearchExercise";

import "./SearchExerciseModal.css";
//opens modal and in the modal

const SearchExerciseModal = (props) => {
  const { setIsSearchingExercise, addExerciseFromSearch } = props;

  const [exercise, setExercise] = useState("");

  const closeSearchModal = () => {
    setIsSearchingExercise(false);
  };

  // passes data up to parent
  const addExercise = () => {
    addExerciseFromSearch(exercise);
  };

  const passExerciseToParent = (value) => {
    setExercise(value);
  };

  return (
    <Modal
      show
      header={"Exercise Search"}
      footer={
        <div className="exercise_search-add-btn">
          <button onClick={addExercise}>ADD EXERCISE</button>
        </div>
      }
      onCancel={closeSearchModal}
    >
      <SearchExercise passExerciseToParent={passExerciseToParent} />
    </Modal>
  );
};

export default SearchExerciseModal;
