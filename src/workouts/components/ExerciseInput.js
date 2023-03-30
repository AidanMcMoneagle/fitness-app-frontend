import React, { useState, useReducer, useEffect } from "react";
import SearchExerciseModal from "./SearchExerciseModal";
import { FaEdit } from "react-icons/fa";
import { AiOutlineClose, AiOutlineCheck } from "react-icons/ai";
import { HiOutlineSearch } from "react-icons/hi";

import "./ExerciseInput.css";

const inputReducer = (state, action) => {
  if (action.type === "ADD_EXERCISE") {
    return {
      id: action.payload.id,
      value: {
        exerciseName: action.payload.exerciseName,
        repetitions: action.payload.repetitions,
        sets: action.payload.sets,
        exerciseInstructions: action.payload.exerciseInstructions,
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
  const [exerciseInstructions, setExerciseInstructions] = useState("");
  const [exerciseSubmitted, setExerciseSubmitted] = useState(false); // used change the style of the input.

  const [isSearchingExercise, setIsSearchingExercise] = useState(false);

  // useReducer to manage the state of each exercise (name, reps, sets)
  const [exerciseState, dispatch] = useReducer(inputReducer, {});

  const { addExerciseData, editExerciseData } = props;
  const { id, value } = exerciseState;

  // where we also need to pass the exercise instructions.
  useEffect(() => {
    if (value) {
      addExerciseData(id, value);
    }
  }, [id, value, addExerciseData]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (!exerciseSubmitted) {
      dispatch({
        type: "ADD_EXERCISE",
        payload: {
          exerciseName,
          repetitions,
          sets,
          exerciseInstructions,
          id: props.id,
        },
      });
      setExerciseSubmitted(true);
    } else {
      dispatch({
        type: "EDIT_EXERCISE",
      });
      setExerciseName("");
      setRepetitions("");
      setSets("");
      setExerciseInstructions("");
      setExerciseSubmitted(false);
      editExerciseData(props.id);
    }
  };

  const { deleteExercise } = props;
  const deleteExerciseHandler = (e) => {
    e.preventDefault();
    deleteExercise(props.id);
  };

  const searchExercise = (e) => {
    e.preventDefault();
    setIsSearchingExercise(true);
  };

  // also neeed to pass full exercise details to database.
  const addExerciseFromSearch = (input) => {
    console.log("exercise details", input);
    setExerciseName(input.name);
    setExerciseInstructions(input.instructions);
    setIsSearchingExercise(false);
  };

  return (
    <React.Fragment>
      {isSearchingExercise && (
        <SearchExerciseModal
          setIsSearchingExercise={setIsSearchingExercise}
          addExerciseFromSearch={addExerciseFromSearch}
        />
      )}
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
            <button className="exercise-search-btn" onClick={searchExercise}>
              <HiOutlineSearch />
            </button>
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
    </React.Fragment>
  );
};

export default ExerciseInput;
