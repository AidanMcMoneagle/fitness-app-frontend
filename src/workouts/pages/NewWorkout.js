import React, { useState, useReducer, useContext } from "react";
import { HiOutlinePlusCircle } from "react-icons/hi";
import { v4 as uuidv4 } from "uuid";
import useHttpClientCustomHook from "../../shared/hooks/useHttpClientCustomHook";
import AuthContext from "../../shared/context/auth-context";

import ExerciseList from "../components/ExerciseList";

import "./NewWorkout.css";

const inputReducer = (state, action) => {
  if (action.type === "EXERCISE ADDED") {
    // if this is the first exercise. the id will be an empty string.
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
    return newState;
  }
};

const NewWorkout = () => {
  const [exerciseNumber, setExerciseNumber] = useState([]); // useState to control the state of the number of exercises on the page

  const [formIsValid, setFormIsValid] = useState(false);

  const [formData, dispatch] = useReducer(inputReducer, []);

  const { error, isLoading, sendRequest, clearError } =
    useHttpClientCustomHook();

  const auth = useContext(AuthContext);

  // creates a new element in the array. UUID will be used to remove element from array when deleting exercise.
  const addExercise = () => {
    const newList = [...exerciseNumber, uuidv4()];
    setExerciseNumber(newList);
    setFormIsValid(false);
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

  const onInput = (id, value) => {
    const hasExerciseBeenAdded = formData.find((exercise) => {
      return exercise.id === id;
    });
    setFormIsValid(true);
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

  // need to ensure we send the token. Can be used to authenticate user. We then extract the userId from the token.
  const workoutSubmitHandler = async () => {
    console.log(formData);
    try {
      const responseData = await sendRequest(
        "http://localhost:5000/api/workouts/new",
        "POST",
        JSON.stringify(formData),
        {
          "Content-Type": "application/json",
          Authorization: "Bearer " + auth.token,
        }
      );
      console.log(responseData);
      // need to redirect somewhere. Potentially to the my workouts page.
    } catch (e) {}
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
        <button
          onClick={workoutSubmitHandler}
          disabled={!formIsValid || formData.length !== exerciseNumber.length}
        >
          Create Workout
        </button>
      )}
    </section>
  );
};

export default NewWorkout;
