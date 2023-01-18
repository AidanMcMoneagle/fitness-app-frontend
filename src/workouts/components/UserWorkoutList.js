import React, { useState } from "react";
// each element in the array is a userWorkout
import UserWorkout from "./UserWorkout";
import { v4 as uuidv4 } from "uuid";

//userWorkoutsArray is an array of objects. each object represents a workout.
const UserWorkoutList = (props) => {
  const userWorkoutsArray = props.userWorkouts;
  const { isViewingArchivedWorkouts } = props;
  console.log(userWorkoutsArray);

  // here we distinguish between archived and not archived workouts. We need to do an if check and continue. We render two userworkout components.
  return (
    <React.Fragment>
      <div>
        {!isViewingArchivedWorkouts &&
          userWorkoutsArray.map((workout, index) => {
            if (workout.isArchived === true) {
              return;
            } else {
              return (
                <UserWorkout
                  key={workout._id}
                  userWorkout={workout}
                  deleteHandler={props.deleteHandler}
                  archiveWorkout={props.archiveWorkout}
                  index={index}
                  isViewingArchivedWorkouts={false}
                />
              );
            }
          })}
        {isViewingArchivedWorkouts &&
          userWorkoutsArray.map((workout, index) => {
            if (workout.isArchived === false) {
              return;
            } else {
              return (
                <UserWorkout
                  key={workout._id}
                  userWorkout={workout}
                  deleteHandler={props.deleteHandler}
                  index={index}
                  isViewingArchivedWorkouts={true}
                  unArchiveWorkout={props.unArchiveWorkout}
                />
              );
            }
          })}
      </div>
    </React.Fragment>
  );
};

export default UserWorkoutList;
