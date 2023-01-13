import React, { useEffect, useContext, useState } from "react";
import { Link } from "react-router-dom";
import useHttpClientCustomHook from "../../shared/hooks/useHttpClientCustomHook";
import AuthContext from "../../shared/context/auth-context";
import UserWorkoutList from "../components/UserWorkoutList";

// here we show all user workouts.
const MyWorkouts = () => {
  const { error, isLoading, sendRequest, clearError } =
    useHttpClientCustomHook();

  const [userWorkouts, setUserWorkouts] = useState(undefined);

  const auth = useContext(AuthContext);

  const deleteWorkoutHandler = async (workoutId) => {
    // send request to backend to delete workout.
    console.log(workoutId);
    // const response = await sendRequest(
    //   `http://localhost:5000/api/workouts/:${workoutId}`,
    //   "DELETE",
    //   null,
    //   {
    //     Authorization: "Bearer " + auth.token,
    //   }
    // );
    // console.log(response)
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
  }, [auth]); // not sure what to put in dependency array.

  return (
    <React.Fragment>
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
          />
        )}
      </div>
    </React.Fragment>
  );
};

export default MyWorkouts;
