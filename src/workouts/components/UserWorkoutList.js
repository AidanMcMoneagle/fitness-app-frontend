import React, { useState } from "react";
// each element in the array is a userWorkout
import UserWorkout from "./UserWorkout";
import { v4 as uuidv4 } from "uuid";

//userWorkoutsArray is an array of objects. each object represents a workout.
const UserWorkoutList = (props) => {
  const userWorkoutsArray = props.userWorkouts;
  const { deleteHandler } = props;
  console.log(userWorkoutsArray);

  return (
    <React.Fragment>
      <div>
        {userWorkoutsArray.map((workout, index) => {
          return (
            <div className="section-center">
              <UserWorkout
                key={workout._id}
                userWorkout={workout}
                deleteHandler={deleteHandler}
                index={index}
              />
            </div>
          );
        })}
      </div>
    </React.Fragment>
  );
};

export default UserWorkoutList;
