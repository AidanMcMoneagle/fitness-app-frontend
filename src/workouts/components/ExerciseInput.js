import React, { useState, useReducer, useEffect } from "react";
import { FaEdit } from "react-icons/fa";
import { AiOutlineClose, AiOutlineCheck } from "react-icons/ai";

import "./ExerciseInput.css";

const inputReducer = (state, action) => {
  if (action.type === "ADD_EXERCISE") {
    return {
      id: action.payload.id,
      value: {
        exerciseName: action.payload.exerciseName,
        repetitions: action.payload.repetitions,
        sets: action.payload.sets,
      },
    };
  }
  if (action.type === "EDIT_EXERCISE") {
    return {};
  }
};

const ExerciseInput = (props) => {
  const [exerciseName, setExerciseName] = useState("");
  const [repetitions, setRepetitions] = useState("");
  const [sets, setSets] = useState("");
  const [exerciseSubmitted, setExerciseSubmitted] = useState(false); // change the style of the input text if has already been added. Maybe turn box to green.

  // useReducer to manage the state of each exercise (name, reps, sets)
  const [exerciseState, dispatch] = useReducer(inputReducer, {});

  // need to pass up exercise data to NewWorkout where it can be submitted. Need to pass the data to a function that has been passed down from the parent as props. Important that when we send the data we include the id. Allows us to edit and delete later if required.

  const { addExerciseData, setFormIsValid } = props;
  const { id, value } = exerciseState;

  // onInupt function is called which sends id and exercise data to NewWorkout. Here it is added to the state of the entire form. We only want to call when
  useEffect(() => {
    if (exerciseState.value) {
      addExerciseData(id, value);
    }
  }, [id, value]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (!exerciseSubmitted) {
      dispatch({
        type: "ADD_EXERCISE",
        payload: {
          exerciseName,
          repetitions,
          sets,
          id: props.id,
        },
      });
      setExerciseSubmitted(true);
    } else {
      dispatch({
        type: "EDIT_EXERCISE",
      });
      setFormIsValid(false);
      setExerciseName("");
      setRepetitions("");
      setSets("");
      setExerciseSubmitted(false);
    }
  };

  //WHEN WE EDIT EXERCISE WE NEED TO REMOVE STATE FROM PARENT IMMEDIATELY. call a function passed down from parent which dispatches an action to EXERCISE IN EDIT MODE this sets the value of the indiviudal exercises to undefined however important that we keep the Id. Also sets formValditiy to false.

  const { deleteExercise } = props;
  const deleteExerciseHandler = (e) => {
    e.preventDefault();
    deleteExercise(props.id);
  };

  return (
    <form onSubmit={submitHandler}>
      <div className="exercise-header">
        <h4 className="exercise-title">{`Exercise ${props.index + 1}`}</h4>
        <div className="exercise-btn-container">
          <button
            type="submit"
            className={
              exerciseState.value ? `exercise-edit-btn` : `exercise-add-btn`
            }
            disabled={!exerciseName || !repetitions || !sets}
          >
            {!exerciseState.value ? <AiOutlineCheck /> : <FaEdit />}
          </button>
          <button className="delete-btn" onClick={deleteExerciseHandler}>
            <AiOutlineClose />
          </button>
        </div>
      </div>
      <div className="exercise-form-control">
        <div className="exercise-input">
          <label htmlFor="exercise">Exercise</label>
          <input
            className={`input-exerciseName ${
              exerciseSubmitted ? "fill-input-exercise" : ""
            }`}
            type="text"
            id="exercise"
            value={exerciseName}
            onChange={(e) => setExerciseName(e.target.value)}
            readOnly={exerciseSubmitted ? true : false}
          />
        </div>
        <div className="exercise-input">
          <label htmlFor="reps">Reps</label>
          <input
            className={`input-reps ${
              exerciseSubmitted ? "fill-input-exercise" : ""
            }`}
            type="number"
            min="1"
            id="exercise"
            value={repetitions}
            onChange={(e) => setRepetitions(e.target.value)}
            readOnly={exerciseSubmitted ? true : false}
          />
        </div>
        <div className="exercise-input">
          <label htmlFor="sets">Sets</label>
          <input
            className={`input-sets ${
              exerciseSubmitted ? "fill-input-exercise" : ""
            }`}
            type="number"
            id="sets"
            min="1"
            value={sets}
            onChange={(e) => setSets(e.target.value)}
            readOnly={exerciseSubmitted ? true : false}
          />
        </div>
      </div>
    </form>
  );
};

export default ExerciseInput;
