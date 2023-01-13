import React from "react";
// each element in the array is a userWorkout
import UserWorkout from "./UserWorkout";

//userWorkoutsArray is an array of objects. each object represents a workout.
const UserWorkoutList = (props) => {
  const userWorkoutsArray = props.userWorkouts;
  console.log(userWorkoutsArray);
  return (
    <div>
      {userWorkoutsArray.map((workout, index) => {
        return (
          <div className="section-center">
            <h5>{`Workout Number ${index + 1}`}</h5>
            <UserWorkout key={workout._id} userWorkout={workout} />;
            <button onClick={props.deleteHandler(workout._id)}>
              DELETE WORKOUT
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default UserWorkoutList;
