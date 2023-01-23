import React from "react";

import UserWorkout from "./UserWorkout";

import "./UserWorkoutList.css";

const UserWorkoutList = (props) => {
  const userWorkoutsArray = props.userWorkouts; //userWorkoutsArray is an array of objects. each object represents a workout.
  const { isViewingArchivedWorkouts } = props;

  // here we distinguish between archived and not archived workouts.
  return (
    <React.Fragment>
      <div className="user-workout-list">
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
