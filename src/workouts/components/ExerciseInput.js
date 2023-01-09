import React, { useState, useReducer, useEffect } from "react";

const inputReducer = (state, action) => {
  if (action.type === "ADD EXCERCISE") {
    return {
      ...state,
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

  const [exerciseState, dispatch] = useReducer(inputReducer, {});

  // need to pass up the exercise data to NewWorkout where it can be submitted. Need to pass the data to a function that has been passed down from the parent as props. Important that when we send the data we include the index.

  const { onInput } = props;
  const { id, value } = exerciseState;
  useEffect(() => {
    if (exerciseState.value) {
      console.log(exerciseState);
      onInput(id, value);
    }
  }, [id]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch({
      type: "ADD EXCERCISE",
      payload: {
        exerciseName,
        repetitions,
        sets,
        id: props.index,
      },
    });
  };

  return (
    <form onSubmit={submitHandler}>
      <div>
        <label htmlFor="exercise">Exercise</label>
        <input
          type="text"
          id="exercise"
          value={exerciseName}
          onChange={(e) => setExerciseName(e.target.value)}
        />
        <label htmlFor="reps"></label>
      </div>
      <div>
        <label htmlFor="reps">Reps</label>
        <input
          className="input-reps-box"
          type="text"
          id="exercise"
          value={repetitions}
          onChange={(e) => setRepetitions(e.target.value)}
        />
      </div>
      <div>
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
        <button type="submit">Add Excercise</button>
      )}
      {/* When button is clicked form for individual exercise is Submitted. We manage the state of this form using useReducer*/}
    </form>
  );
};

export default ExerciseInput;
