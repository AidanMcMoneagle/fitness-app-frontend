import React from "react";

const UserExercise = (props) => {
  const { name, sets, reps } = props.exercise;
  return (
    <div>
      <p>{`Excercise: ${name}`}</p>
      <p>{`Repetitions: ${reps}`}</p>
      <p>{`Sets: ${sets}`}</p>
    </div>
  );
};

export default UserExercise;
