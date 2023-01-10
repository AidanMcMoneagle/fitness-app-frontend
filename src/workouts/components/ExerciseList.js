import React from "react";

import ExerciseInput from "./ExerciseInput";

const ExerciseList = (props) => {
  const { exerciseNumber, onInput } = props;

  return (
    <div>
      {exerciseNumber.map((id, index) => {
        return (
          <div key={id} className="exercise-element">
            <ExerciseInput
              index={index}
              onInput={onInput}
              id={id}
              deleteExercise={props.deleteExercise}
            />
          </div>
        );
      })}
    </div>
  );
};

export default ExerciseList;
