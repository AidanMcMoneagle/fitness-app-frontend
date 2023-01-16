import React, { useState, useReducer, useEffect } from "react";
import { FaTimes, FaEdit, FaTrash, FaAdd } from "react-icons/fa";
import { HiPlus } from "react-icons/hi";

import "./ExerciseInput.css";

const inputReducer = (state, action) => {
  if (action.type === "ADD/EDIT EXERCISE") {
    return {
      id: action.payload.id,
      value: {
        exerciseName: action.payload.exerciseName,
        repetitions: action.payload.repetitions,
        sets: action.payload.sets,
      },
    };
  }
};

const ExerciseInput = (props) => {
  const [exerciseName, setExerciseName] = useState("");
  const [repetitions, setRepetitions] = useState("");
  const [sets, setSets] = useState("");
  const [hasExerciseBeenAdded, setHasExerciseBeenAdded] = useState(false); // change the style of the input text if has already been added. Maybe turn box to green.

  // useReducer to manage the state of each exercise (name, reps, sets)
  const [exerciseState, dispatch] = useReducer(inputReducer, {});

  // need to pass up exercise data to NewWorkout where it can be submitted. Need to pass the data to a function that has been passed down from the parent as props. Important that when we send the data we include the id. Allows us to edit and delete later if required.

  const { onInput } = props;
  const { id, value } = exerciseState;

  // onInupt function is called which sends id and exercise data to NewWorkout. Here it is added to the state of the entire form.
  useEffect(() => {
    if (exerciseState.value) {
      console.log(exerciseState);
      onInput(id, value);
      setHasExerciseBeenAdded(true);
    }
  }, [id, value]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch({
      type: "ADD/EDIT EXERCISE",
      payload: {
        exerciseName,
        repetitions,
        sets,
        id: props.id,
      },
    });
  };

  const { deleteExercise } = props;
  const deleteExerciseHandler = (e) => {
    e.preventDefault();
    deleteExercise(props.id);
  };

  return (
    <form
      onSubmit={submitHandler}
      className={hasExerciseBeenAdded ? "exercise-added" : "exercise-not-added"}
    >
      <div className="exercise-header">
        <h4>{`Exercise ${props.index + 1}`}</h4>
        <div className="btn-container">
          <button
            type="submit"
            className={exerciseState.value ? `edit-btn` : `add-btn`}
            disabled={!exerciseName || !repetitions || !sets}
          >
            {!exerciseState.value ? <HiPlus /> : <FaEdit />}
          </button>
          <button className="delete-btn" onClick={deleteExerciseHandler}>
            <FaTrash />
          </button>
        </div>
      </div>
      <div className={`exercise-form-control`}>
        <label htmlFor="exercise">Exercise</label>
        <input
          className="input-exerciseName"
          type="text"
          id="exercise"
          value={exerciseName}
          onChange={(e) => setExerciseName(e.target.value)}
        />
        <label htmlFor="reps"></label>
      </div>
      <div className={"exercise-form-control"}>
        <label htmlFor="reps">Reps</label>
        <input
          className="input-reps"
          type="number"
          min="1"
          id="exercise"
          value={repetitions}
          onChange={(e) => setRepetitions(e.target.value)}
        />
      </div>
      <div className={`exercise-form-control`}>
        <label htmlFor="sets">Sets</label>
        <input
          className="input-sets"
          type="number"
          id="sets"
          min="1"
          value={sets}
          onChange={(e) => setSets(e.target.value)}
        />
      </div>
    </form>
  );
};

export default ExerciseInput;
