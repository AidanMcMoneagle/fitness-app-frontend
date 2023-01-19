import React, { useState, useReducer, useContext, useRef } from "react";
import { useHistory } from "react-router-dom";
import { HiOutlinePlusCircle } from "react-icons/hi";
import { v4 as uuidv4 } from "uuid";
import useHttpClientCustomHook from "../../shared/hooks/useHttpClientCustomHook";
import AuthContext from "../../shared/context/auth-context";

import ExerciseList from "../components/ExerciseList";

import "./NewWorkout.css";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import Card from "../../shared/components/UIElements/Card";

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
  // contains the state of the number of exercises on the page
  const [exerciseNumber, setExerciseNumber] = useState([]);

  const [formIsValid, setFormIsValid] = useState(false);

  const [workoutName, setWorkoutName] = useState("");

  const [formData, dispatch] = useReducer(inputReducer, []);

  const { error, isLoading, sendRequest, clearError } =
    useHttpClientCustomHook();

  const auth = useContext(AuthContext);

  const history = useHistory();

  // creates a new element in the exerciseNumber array. UUID will be used to remove element from array when deleting exercise.
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
      history.push("/workouts");
      // need to redirect somewhere. Potentially to the my workouts page.
    } catch (e) {}
  };

  const workoutTitleSubmitHandler = (e) => {
    e.preventDefault();
    // dispatch an action to add the workoutName to the formData.
  };

  return (
    <React.Fragment>
      {isLoading && <LoadingSpinner />}
      {error && <ErrorModal error={error} clearError={clearError} />}
      <h3 className="page-title">NEW WORKOUT</h3>
      <Card className="workout-title">
        <form
          onSubmit={workoutTitleSubmitHandler}
          className="workout-title-form"
        >
          <label htmlFor="workoutName">Workout Name</label>
          <input
            value={workoutName}
            id="workoutName"
            type="text"
            onChange={(e) => setWorkoutName(e.target.value)}
            className="workoutName-input"
          ></input>
          <button disabled={!workoutName} className="add-workoutname-btn">
            ADD NAME
          </button>
        </form>
      </Card>

      <ExerciseList
        exerciseNumber={exerciseNumber}
        onInput={onInput}
        deleteExercise={deleteExercise}
      />
      <div className="center">
        <button onClick={addExercise} className="add-exercise-btn">
          ADD EXERCISE
        </button>
      </div>
      {exerciseNumber.length > 0 && (
        <div className="center">
          <button
            onClick={workoutSubmitHandler}
            disabled={!formIsValid || formData.length !== exerciseNumber.length}
            className="create-workout-btn"
          >
            CREATE WORKOUT
          </button>
        </div>
      )}
    </React.Fragment>
  );
};

export default NewWorkout;
