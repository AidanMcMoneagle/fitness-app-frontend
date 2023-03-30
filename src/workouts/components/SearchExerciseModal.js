import React, { useState } from "react";
import Modal from "../../shared/components/UIElements/Modal";
import SearchExercise from "./SearchExercise";

import "./SearchExerciseModal.css";
//opens modal and in the modal

const SearchExerciseModal = (props) => {
  const { setIsSearchingExercise, addExerciseFromSearch } = props;

  // exercise is an object with properties name, type, muscle, equipment, instruction, difficulty. 
  const [exercise, setExercise] = useState(undefined);

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
