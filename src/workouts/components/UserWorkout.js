import React, {
  useState,
  useCallback,
  useReducer,
  useEffect,
  useContext,
} from "react";
import { useHistory, Link } from "react-router-dom";
import UserExercise from "./UserExercise";
import Modal from "../../shared/components/UIElements/Modal";
import useHttpClientCustomHook from "../../shared/hooks/useHttpClientCustomHook";
import AuthContext from "../../shared/context/auth-context";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";

import "./UserWorkout.css";

// need a link here to view workout progress.
// this will redirect to the my progress page. In the link it will contain the workout id. This will allow when the page loads to only display info for certain workout. Get workout progress.

// we want to have a reducer here. This reducer will hold all info for workout. Will be an array of objects. Each obj

/*[{
    exerciseId: 
    exerciseSets: [
            weightforSet1, weightforSet2, weightforSet3
        ]
    }
}, 
]
*/

const inputReducer = (state, action) => {
  if (action.type === "EXERCISE_ADDED") {
    return [
      ...state,
      {
        exerciseId: action.payload.id,
        exerciseName: action.payload.name,
        exerciseSets: action.payload.value,
      },
    ];
  }
};

const UserWorkout = (props) => {
  const { userWorkout, deleteHandler } = props;
  console.log(userWorkout);

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [inTrackingMode, setIsTrackingMode] = useState(false);
  const [numberOfSetHeaders, setNumberOfSetHeaders] = useState([]);

  // if allExercises have been tracked i.e. every set input has been populated we change state to true and render button to submit data.
  const [areAllExercisesTracked, setAreAllExercisesTracked] = useState(false);

  const [inputState, dispatch] = useReducer(inputReducer, []);

  const { error, isLoading, sendRequest, clearError } =
    useHttpClientCustomHook();

  const auth = useContext(AuthContext);

  const history = useHistory();

  const openDeleteModal = () => {
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
  };

  const openTrackingMode = () => {
    setIsTrackingMode(!inTrackingMode);
  };

  // every single time the page re renders I want to check if all inputs have been filled. I have to check if the length of the inputState is equal to the number of exercises in the workout. I have access to userWorkout. Once I do this I can enable the button to submit the workout.
  useEffect(() => {
    if (inputState && inputState.length !== userWorkout.exercises.length) {
      return;
    } else {
      setAreAllExercisesTracked(true);
    }
  }, [inputState, userWorkout.exercises.length]);

  //function is passed down to UserExercise component. Used to pass number of sets to UserWorkout so we can dynamically change the number of input headers in the table for each workout.
  const passNumberOfSetInputs = useCallback(
    (inputArray) => {
      if (inputArray.length > numberOfSetHeaders.length) {
        setNumberOfSetHeaders(inputArray);
      } else {
        return;
      }
    },
    [numberOfSetHeaders.length]
  );

  const onInput = (id, value, name) => {
    dispatch({
      type: "EXERCISE_ADDED",
      payload: {
        id,
        name,
        value,
      },
    });
  };

  // want to redirect somewhere once we have submitted. Need to ensure we sent the workout Id. Should include this in the url. Important so we can ensure we adding tracked workouts.
  const submitWorkoutTrackingData = async () => {
    console.log(inputState);
    try {
      const responseData = await sendRequest(
        `http://localhost:5000/api/trackworkouts/${userWorkout._id}`,
        "POST",
        JSON.stringify({
          exerciseWeights: inputState,
        }),
        {
          "Content-Type": "application/json",
          Authorization: "Bearer " + auth.token,
        }
      );
      console.log(responseData);
      history.push("/");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <React.Fragment>
      {isLoading && <LoadingSpinner />}
      {error && <ErrorModal error={error} clearError={clearError} />}
      {isDeleteModalOpen && (
        <Modal
          show
          header={"WARNING!"}
          footer={
            <div>
              <button onClick={() => deleteHandler(userWorkout._id)}>
                Yes
              </button>
              <button onClick={closeDeleteModal}>No</button>
            </div>
          }
        >
          <p>
            Are you sure you want to delete this workout? If you delete this
            workout all associated progress will also be deleted.
          </p>
        </Modal>
      )}
      <h5>{`Workout Number ${props.index + 1}`}</h5>
      <form>
        <table class="workout-table">
          <thead>
            <tr>
              <th>Exercise</th>
              <th>Repetitions</th>
              <th>Sets</th>
              {inTrackingMode &&
                numberOfSetHeaders.length > 0 &&
                numberOfSetHeaders.map((input, index) => {
                  return (
                    <th className="track-input" key={index}>{`Set ${
                      index + 1
                    }`}</th>
                  );
                })}
              {inTrackingMode && numberOfSetHeaders.length > 0 && <th></th>}
            </tr>
          </thead>
          <tbody>
            {userWorkout.exercises.map((exercise) => {
              return (
                <tr>
                  <UserExercise
                    key={exercise._id}
                    exercise={exercise}
                    inTrackingMode={inTrackingMode}
                    passNumberOfSetInputs={passNumberOfSetInputs}
                    numberOfSetHeaders={numberOfSetHeaders}
                    onInput={onInput}
                  />
                </tr>
              );
            })}
          </tbody>
        </table>
      </form>
      <button onClick={openDeleteModal}>DELETE WORKOUT</button>
      <button onClick={openTrackingMode}>TRACK WORKOUT</button>
      {areAllExercisesTracked && (
        <button onClick={submitWorkoutTrackingData}>SUBMIT NUMBERS</button>
      )}
      <Link exact to={`/${userWorkout._id}/myprogress`}>
        <button>View Workout Progress</button>
      </Link>
    </React.Fragment>
  );
};

export default UserWorkout;
