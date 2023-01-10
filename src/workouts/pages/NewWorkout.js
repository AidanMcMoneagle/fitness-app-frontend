import React, { useState, useReducer, useEffect } from "react";
import { HiOutlinePlusCircle } from "react-icons/hi";
import { v4 as uuidv4 } from "uuid";

import ExerciseList from "../components/ExerciseList";

import "./NewWorkout.css";

const inputReducer = (state, action) => {
  if (action.type === "EXERCISE ADDED") {
    return [
      ...state,
      {
        id: action.payload.id,
        value: action.payload.value,
      },
    ];
  }

  if (action.type === "EDIT EXERCISE") {
    const stateWithItemToEditRemoved = state.filter((exercise) => {
      return action.payload.id !== exercise.id;
    });
    return [
      ...stateWithItemToEditRemoved,
      {
        id: action.payload.id,
        value: action.payload.value,
      },
    ];
  }

  if (action.type === "DELETE EXERCISE") {
    const newState = state.filter((exercise) => {
      return exercise.id !== action.payload;
    });
    console.log(newState);
    return newState;
  }
};

const NewWorkout = () => {
  const [exerciseNumber, setExerciseNumber] = useState([]); // useState to control the state of the number of exercises on the page

  const [formData, dispatch] = useReducer(inputReducer, []);

  // creates a new element in the array. UUID will be used to remove element from array when deleting exercise.
  const addExercise = () => {
    const newList = [...exerciseNumber, uuidv4()];
    setExerciseNumber(newList);
  };

  const deleteExercise = (id) => {
    const newList = exerciseNumber.filter((element) => {
      return element !== id;
    });
    setExerciseNumber(newList);

    const exerciseToBeDeleted = formData.find((exercise) => {
      return exercise.id === id;
    });

    if (exerciseToBeDeleted) {
      dispatch({
        type: "DELETE EXERCISE",
        payload: id,
      });
    }
  };

  useEffect(() => {
    console.log(formData);
  }, [formData]);

  const onInput = (id, value) => {
    const hasExerciseBeenAdded = formData.find((exercise) => {
      return exercise.id === id;
    });
    if (!hasExerciseBeenAdded) {
      dispatch({
        type: "EXERCISE ADDED",
        payload: {
          id,
          value,
        },
      });
    } else
      dispatch({
        type: "EDIT EXERCISE",
        payload: {
          id,
          value,
        },
      });
  };

  const workoutSubmitHandler = () => {
    console.log(formData);
    //send this data to the backend
  };

  return (
    <section className="section-center">
      <h3>NEW WORKOUT</h3>
      <ExerciseList
        exerciseNumber={exerciseNumber}
        onInput={onInput}
        deleteExercise={deleteExercise}
      />
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
