import React, { useState, useContext, useEffect } from "react";
import { useParams, Link } from "react-router-dom";

import useHttpClientCustomHook from "../../shared/hooks/useHttpClientCustomHook";
import AuthContext from "../../shared/context/auth-context";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import ExerciseProgressList from "../components/ExerciseProgressList";

const MyProgress = () => {
  const { workoutId } = useParams();
  const auth = useContext(AuthContext);

  const [workoutData, setWorkoutData] = useState(undefined);

  // whenever the state in the custom hook changes the component using the custom hook will be re rendered.
  const { error, isLoading, sendRequest, clearError } =
    useHttpClientCustomHook();

  useEffect(() => {
    const getWorkoutProgress = async () => {
      try {
        const responseData = await sendRequest(
          `http://localhost:5000/api/trackworkouts/${workoutId}`,
          "GET",
          null,
          {
            Authorization: "Bearer " + auth.token,
          }
        );
        setWorkoutData(responseData.workOutProgress); // array of objects. each object represents new instance of tracked workout.
      } catch (e) {
        console.log(e);
      }
    };
    getWorkoutProgress();
    //we want to send a request to end point to get workout tracking progress for the provided workout id.
  }, [auth.token, sendRequest, workoutId]);

  return (
    <React.Fragment>
      {isLoading && <LoadingSpinner />}
      {error && <ErrorModal error={error} clearError={clearError} />}
      {workoutData && workoutData.length === 0 && (
        <div className="section-center">
          {
            "You Currently have not tracked progress for this workout. To view workout progress please add workoutData.... "
          }
          <button>
            <Link exact to="/myworkouts">
              VIEW WORKOUTS
            </Link>
          </button>
        </div>
      )}
      {workoutData && workoutData.length > 0 && (
        <ExerciseProgressList workoutData={workoutData} />
      )}
    </React.Fragment>
  );
};

export default MyProgress;
