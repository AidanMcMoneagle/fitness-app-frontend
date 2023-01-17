import React from "react";

import ExerciseProgressGraph from "./ExerciseProgressGraph";

const ExerciseProgressList = (props) => {
  const { workoutData } = props;
  const exerciseWeightsArray = workoutData[0].exerciseWeights;

  //length of exerciseWeights is the equal to the number of exercises. we want to render component for each exercise.

  return (
    <div>
      {exerciseWeightsArray.map((exercise) => {
        return (
          <ExerciseProgressGraph
            workoutData={workoutData}
            exerciseId={exercise.exerciseId}
            key={exercise.exerciseId}
            name={exercise.exerciseName}
          />
        );
      })}
    </div>
  );
};

export default ExerciseProgressList;
