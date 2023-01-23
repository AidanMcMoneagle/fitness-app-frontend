import React, { useState, useReducer, useContext, useEffect } from "react";
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
  if (action.type === "EXERCISE_ADDED") {
    // if this is the first exercise. the id will be an empty string.
    if (state.exercises[0].value) {
      return {
        ...state,
        exercises: [
          ...state.exercises,
          {
            id: action.payload.id,
            value: action.payload.value,
          },
        ],
      };
    } else {
      return {
        ...state,
        exercises: [
          {
            id: action.payload.id,
            value: action.payload.value,
          },
        ],
      };
    }
  }

  if (action.type === "EDIT_EXERCISE") {
    const stateWithItemToEditRemoved = state.exercises.filter((exercise) => {
      return action.payload.id !== exercise.id;
    });
    return {
      ...state,
      exercises: [
        ...stateWithItemToEditRemoved,
        {
          id: action.payload.id,
          value: action.payload.value,
        },
      ],
    };
  }

  if (action.type === "DELETE_EXERCISE") {
    const newExercisesState = state.exercises.filter((exercise) => {
      return exercise.id !== action.payload;
    });
    if (newExercisesState.length !== 0) {
      return {
        ...state,
        exercises: [...newExercisesState],
      };
    } else {
      return {
        ...state,
        exercises: [
          {
            value: "",
            id: "",
          },
        ],
      };
    }
  }

  if (action.type === "ADD_WORKOUT_NAME") {
    const workoutName = action.payload;
    return {
      ...state,
      workoutName,
    };
  }

  if (action.type === "EDIT_WORKOUT_NAME") {
    return {
      ...state,
      workoutName: "",
    };
  }
};

const NewWorkout = () => {
  // contains the state of the number of exercises on the page
  const [exerciseNumber, setExerciseNumber] = useState([]);

  const [formIsValid, setFormIsValid] = useState(false);

  const [workoutName, setWorkoutName] = useState("");

  // holds the state of the formData we will send to the client. Form validity is not managed here.
  const [formData, dispatch] = useReducer(inputReducer, {
    workoutName: "",
    exercises: [
      {
        value: "",
        id: "",
      },
    ],
  });

  const { error, isLoading, sendRequest, clearError } =
    useHttpClientCustomHook();

  const auth = useContext(AuthContext);

  const history = useHistory();

  // creates a new element in the exerciseNumber array. UUID will be used to remove element from array when deleting exercise.
  const addExercise = () => {
    const newList = [...exerciseNumber, uuidv4()];
    setExerciseNumber(newList);
  };

  const deleteExercise = (id) => {
    // loops through exerciseNumber Array and creates new Array with the deleted exercise not included.
    const newList = exerciseNumber.filter((element) => {
      return element !== id;
    });
    setExerciseNumber(newList);

    dispatch({
      type: "DELETE_EXERCISE",
      payload: id,
    });
  };

  const addExerciseData = (id, value) => {
    const hasExerciseBeenAdded = formData.exercises.find((exercise) => {
      return exercise.id === id;
    });
    setFormIsValid(true);
    if (!hasExerciseBeenAdded) {
      dispatch({
        type: "EXERCISE_ADDED",
        payload: {
          id,
          value,
        },
      });
    } else
      dispatch({
        type: "EDIT_EXERCISE",
        payload: {
          id,
          value,
        },
      });
  };

  useEffect(() => {
    console.log(formData);
    console.log(exerciseNumber);
    console.log(formIsValid);
  }, [formData, exerciseNumber, formIsValid]);

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
      history.push("/myworkouts");
      // need to redirect somewhere. Potentially to the my workouts page.
    } catch (e) {}
  };

  const workoutTitleSubmitHandler = (e) => {
    e.preventDefault();
    if (!formData.workoutName)
      dispatch({ type: "ADD_WORKOUT_NAME", payload: workoutName });
    else {
      dispatch({ type: "EDIT_WORKOUT_NAME" });
      setWorkoutName("");
    }
  };

  return (
    <React.Fragment>
      {isLoading && <LoadingSpinner />}
      {error && <ErrorModal error={error} clearError={clearError} />}
      <h3 className="page-title">New Workout</h3>
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
            className={`workoutName-input ${
              formData.workoutName ? "fill-input-workoutName" : ""
            }`}
            readOnly={formData.workoutName ? true : false}
          ></input>
          <button disabled={!workoutName} className="add-workoutname-btn">
            {formData.workoutName ? "EDIT" : "ADD"}
          </button>
        </form>
      </Card>
      <ExerciseList
        exerciseNumber={exerciseNumber}
        addExerciseData={addExerciseData}
        deleteExercise={deleteExercise}
        setFormIsValid={setFormIsValid}
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
            disabled={
              !formIsValid ||
              formData.exercises.length !== exerciseNumber.length ||
              !formData.workoutName ||
              !formData.exercises[0].value
            }
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
