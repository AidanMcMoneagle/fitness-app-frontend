import React, { useEffect, useContext, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import useHttpClientCustomHook from "../../shared/hooks/useHttpClientCustomHook";
import AuthContext from "../../shared/context/auth-context";
import UserWorkoutList from "../components/UserWorkoutList";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";

import "./MyWorkout.css";

// here we show all user workouts.
const MyWorkouts = () => {
  const { error, isLoading, sendRequest, clearError } =
    useHttpClientCustomHook();

  const [userWorkouts, setUserWorkouts] = useState(undefined);

  const [isViewingArchivedWorkouts, setIsViewingArchivedWorkouts] =
    useState(false);

  const auth = useContext(AuthContext);

  const deleteWorkoutHandler = async (workoutId) => {
    // send request to backend to delete workout.
    console.log(workoutId);
    try {
      await sendRequest(
        `http://localhost:5000/api/workouts/${workoutId}`,
        "DELETE",
        null,
        {
          Authorization: "Bearer " + auth.token,
        }
      );
      const newUserWorkoutArray = userWorkouts.filter((workout) => {
        return workoutId !== workout._id;
      });
      setUserWorkouts(newUserWorkoutArray);
    } catch (err) {}
  };

  const archiveWorkout = async (workoutId) => {
    try {
      const responseData = await sendRequest(
        `http://localhost:5000/api/workouts/archive/${workoutId}`,
        "PUT",
        null,
        {
          Authorization: "Bearer " + auth.token,
        }
      );
      const newUserWorkoutArray = userWorkouts.filter((workout) => {
        return workoutId !== workout._id;
      });
      setUserWorkouts(newUserWorkoutArray);
    } catch (e) {
      console.log(e);
    }
  };

  const unArchiveWorkout = async (workoutId) => {
    try {
      const responseData = await sendRequest(
        `http://localhost:5000/api/workouts/unarchive/${workoutId}`,
        "PUT",
        null,
        {
          Authorization: "Bearer " + auth.token,
        }
      );
      const newUserWorkoutArray = userWorkouts.filter((workout) => {
        return workoutId !== workout._id;
      });
      setUserWorkouts(newUserWorkoutArray);
    } catch (e) {
      console.log(e);
    }
  };

  const viewActiveWorkouts = () => {
    setIsViewingArchivedWorkouts(false);
  };

  const viewArchivedWorkouts = () => {
    setIsViewingArchivedWorkouts(true);
  };

  // we then want the re render the workout page with the workout that has been deleted removed.

  // send get request to /api/workouts/
  useEffect(() => {
    const fetchMyWorkouts = async () => {
      try {
        const responseData = await sendRequest(
          "http://localhost:5000/api/workouts/",
          "GET",
          null,
          {
            Authorization: "Bearer " + auth.token,
          }
        );
        console.log(responseData.foundWorkouts);
        setUserWorkouts([...responseData.foundWorkouts]);

        // setUserWorkouts(responseData.foundWorkouts);
      } catch (e) {
        console.log(e);
      }
    };
    fetchMyWorkouts();
  }, [auth.token, sendRequest, isViewingArchivedWorkouts]); // not sure what to put in dependency array.

  return (
    <React.Fragment>
      {isLoading && <LoadingSpinner />}
      {error && <ErrorModal error={error} clearError={clearError} />}
      {userWorkouts && (
        <div className="btn-container">
          <button
            className={
              isViewingArchivedWorkouts ? "not-active-page" : "active-page"
            }
            onClick={viewActiveWorkouts}
          >
            ACTIVE WORKOUTS
          </button>
          <button
            className={
              isViewingArchivedWorkouts ? "active-page" : "not-active-page"
            }
            onClick={viewArchivedWorkouts}
          >
            ARCHIVED WORKOUTS
          </button>
        </div>
      )}
      {userWorkouts && userWorkouts.length === 0 && (
        <div className="section-center">
          {"You Currently have not added any workouts, Please add one"}
          <button>
            <Link exact to="/workouts/new">
              ADD WORKOUT
            </Link>
          </button>
        </div>
      )}
      <div>
        {userWorkouts && (
          <UserWorkoutList
            userWorkouts={userWorkouts}
            deleteHandler={deleteWorkoutHandler}
            archiveWorkout={archiveWorkout}
            unArchiveWorkout={unArchiveWorkout}
            isViewingArchivedWorkouts={isViewingArchivedWorkouts}
          />
        )}
      </div>
    </React.Fragment>
  );
};

export default MyWorkouts;
