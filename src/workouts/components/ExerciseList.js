import React from "react";

import ExerciseInput from "./ExerciseInput";

const ExerciseList = (props) => {
  const { exerciseNumber, onInput } = props;

  return (
    <div>
      {exerciseNumber.map((exercise, index) => {
        return (
          <div key={index}>
            <h4>{`Exercise ${index + 1}`}</h4>
            <ExerciseInput index={index + 1} onInput={onInput} />
          </div>
        );
      })}
    </div>
  );
};

export default ExerciseList;
