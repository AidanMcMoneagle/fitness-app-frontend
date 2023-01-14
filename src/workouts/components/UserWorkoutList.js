import React, { useState } from "react";
// each element in the array is a userWorkout
import UserWorkout from "./UserWorkout";
import Modal from "../../shared/components/UIElements/Modal";

//userWorkoutsArray is an array of objects. each object represents a workout.
const UserWorkoutList = (props) => {
  const userWorkoutsArray = props.userWorkouts;
  const { deleteHandler } = props;
  console.log(userWorkoutsArray);

  {
    /* <button onClick={() => deleteHandler(workout._id)}> */
  }

  return (
    <React.Fragment>
      <div>
        {userWorkoutsArray.map((workout, index) => {
          return (
            <div className="section-center">
              <h5>{`Workout Number ${index + 1}`}</h5>
              <UserWorkout
                key={workout._id}
                userWorkout={workout}
                deleteHandler={deleteHandler}
              />
              ;
            </div>
          );
        })}
      </div>
    </React.Fragment>
  );
};

export default UserWorkoutList;
