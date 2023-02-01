import React, {
  useState,
  useReducer,
  useContext,
  useEffect,
  useCallback,
} from "react";
import { useHistory } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

import useHttpClientCustomHook from "../../shared/hooks/useHttpClientCustomHook";
import AuthContext from "../../shared/context/auth-context";
import ExerciseList from "../components/ExerciseList";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import Card from "../../shared/components/UIElements/Card";

import "./NewWorkout.css";

const inputReducer = (state, action) => {
  if (action.type === "ADD_EXERCISE_ID") {
    if (state.exercises[0].id) {
      return {
        ...state,
        exercises: [
          ...state.exercises,
          {
            id: action.payload,
            value: "",
          },
        ],
      };
    } else {
      return {
        ...state,
        exercises: [
          {
            id: action.payload,
            value: "",
          },
        ],
      };
    }
  }

  if (action.type === "EXERCISE_ADDED") {
    const newExerciseArray = state.exercises.map((exercise) => {
      if (exercise.id !== action.payload.id) {
        return exercise;
      } else {
        return {
          id: action.payload.id,
          value: action.payload.value,
        };
      }
    });
    return {
      ...state,
      exercises: newExerciseArray,
    };
  }

  if (action.type === "EXERCISE_EDITING") {
    const newExerciseArray = state.exercises.map((exercise) => {
      if (exercise.id !== action.payload.id) {
        return exercise;
      } else {
        return {
          id: action.payload.id,
          value: "",
        };
      }
    });
    return {
      ...state,
      exercises: newExerciseArray,
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

  // holds the state of the formData we will send to the server. Form validity is not managed here.
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
  // every time an exercise is added we add an id to the state of the exercise array.

  const addExercise = () => {
    const id = uuidv4();
    const newList = [...exerciseNumber, id];
    setExerciseNumber(newList);
    dispatch({ type: "ADD_EXERCISE_ID", payload: id });
  };

  const deleteExercise = (id) => {
    // loops through exerciseNumber Array and creates new array with the deleted exercise not included.
    const newList = exerciseNumber.filter((element) => {
      return element !== id;
    });
    setExerciseNumber(newList);
    dispatch({
      type: "DELETE_EXERCISE",
      payload: id,
    });
  };

  const addExerciseData = useCallback((id, value) => {
    dispatch({
      type: "EXERCISE_ADDED",
      payload: {
        id,
        value,
      },
    });
  }, []);

  // pass function down to exercise input, used to clear exercise value once edit button is clicked.
  const editExerciseData = (id) => {
    dispatch({
      type: "EXERCISE_EDITING",
      payload: {
        id,
      },
    });
  };

  const workoutSubmitHandler = async () => {
    try {
      await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}/workouts/new`,
        "POST",
        JSON.stringify(formData),
        {
          "Content-Type": "application/json",
          Authorization: "Bearer " + auth.token,
        }
      );
      history.push("/myworkouts");
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

  // We check the validity of the form every time the formData changes.
  useEffect(() => {
    let formValid = false;
    const isFormValid = () => {
      const element = formData.exercises.find((exercise) => {
        return exercise.value === "";
      });
      if (element) {
        return (formValid = false);
      } else {
        return (formValid = true);
      }
    };
    isFormValid();
    if (!formData.workoutName) {
      setFormIsValid(false);
    } else {
      setFormIsValid(formValid);
    }
  }, [formData]);

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
        editExerciseData={editExerciseData}
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
            disabled={!formIsValid}
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
