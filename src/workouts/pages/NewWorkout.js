import React, { useState, useReducer, useEffect } from "react";
import { HiOutlinePlusCircle } from "react-icons/hi";
import ExerciseList from "../components/ExerciseList";

import "./NewWorkout.css";

const inputReducer = (state, action) => {
  if (action.type === "EXERCISE ADDED") {
    return [
      ...state,
      {
        excerciseId: action.payload.id,
        value: action.payload.value,
      },
    ];
  }
};
const NewWorkout = () => {
  const [exerciseNumber, setExerciseNumber] = useState([]); // useState to control the state of the number of exercises on the page

  const [formData, dispatch] = useReducer(inputReducer, []);

  // addExercise Function adds a new Exercise Input component to the a
  const addExercise = () => {
    const newList = [...exerciseNumber, "Exercise"];
    setExerciseNumber(newList);
  };

  const workoutSubmitHandler = () => {
    console.log(formData);
    //send this data to the backend
  };

  useEffect(() => {
    if (formData.length > 0) {
      console.log(formData);
    }
  }, [formData]);

  const onInput = (id, value) => {
    dispatch({
      type: "EXERCISE ADDED",
      payload: {
        id,
        value,
      },
    });
  };

  return (
    <section className="section-center">
      <h3>NEW WORKOUT</h3>
      <ExerciseList exerciseNumber={exerciseNumber} onInput={onInput} />
      <div className="add-exercise-btn">
        <button onClick={addExercise}>
          <HiOutlinePlusCircle />
        </button>
      </div>
      {exerciseNumber.length > 0 && (
        <button onClick={workoutSubmitHandler}>Create Workout</button>
      )}
    </section>
  );
};

export default NewWorkout;
