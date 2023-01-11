import React, { useState, useReducer, useEffect } from "react";

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

  // useReducer to manage the state of each excercise (name, reps, sets)
  const [exerciseState, dispatch] = useReducer(inputReducer, {});

  // need to pass up exercise data to NewWorkout where it can be submitted. Need to pass the data to a function that has been passed down from the parent as props. Important that when we send the data we include the id. Allows us to edit and delete later if required.

  const { onInput } = props;
  const { id, value } = exerciseState;

  // onInupt function is called which sends id and exercise data to NewWorkout. Here it is added to the state of the entire form.
  useEffect(() => {
    if (exerciseState.value) {
      console.log(exerciseState);
      onInput(id, value);
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
    <form onSubmit={submitHandler}>
      <span>
        <h4>{`Exercise ${props.index + 1}`}</h4>
      </span>
      <div className={`form-control-exercise`}>
        <label htmlFor="exercise">Exercise</label>
        <input
          type="text"
          id="exercise"
          value={exerciseName}
          onChange={(e) => setExerciseName(e.target.value)}
        />
        <label htmlFor="reps"></label>
      </div>
      <div className={"form-control-reps"}>
        <label htmlFor="reps">Reps</label>
        <input
          className="input-reps-box"
          type="text"
          id="exercise"
          value={repetitions}
          onChange={(e) => setRepetitions(e.target.value)}
        />
      </div>
      <div className={`form-control-sets`}>
        <label htmlFor="sets">Sets</label>
        <input
          className="input-sets-box"
          type="text"
          id="sets"
          value={sets}
          onChange={(e) => setSets(e.target.value)}
        />
      </div>
      {exerciseName && repetitions && sets && (
        <button type="submit">{!exerciseState.value ? "ADD" : "EDIT"}</button>
      )}
      <button onClick={deleteExerciseHandler}>DELETE</button>
    </form>
  );
};

export default ExerciseInput;
