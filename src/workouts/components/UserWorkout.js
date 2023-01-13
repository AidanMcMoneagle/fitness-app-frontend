import React from "react";
import UserExercise from "./UserExercise";
import { v4 as uuidv4 } from "uuid";

const UserWorkout = (props) => {
  const { userWorkout } = props;
  return (
    <div>
      {userWorkout.exercises.map((exercise) => {
        return <UserExercise key={uuidv4()} exercise={exercise} />;
      })}
    </div>
  );
};

export default UserWorkout;
