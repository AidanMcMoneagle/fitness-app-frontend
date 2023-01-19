import React from "react";
import { Link } from "react-router-dom";
import ExerciseProgressGraph from "./ExerciseProgressGraph";

import "./ExerciseProgressList.css";

const ExerciseProgressList = (props) => {
  const { workoutData } = props;
  const exerciseWeightsArray = workoutData[0].exerciseWeights;

  //length of exerciseWeights is the equal to the number of exercises. we want to render component for each exercise.

  return (
    <React.Fragment>
      <h4 className="page-title">{"My Workout Name Progress"}</h4>
      <div className="exercise-graph-list">
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
      <div className="btn-container back-btn">
        <Link exact to={"/myworkouts"}>
          <button>BACK TO MY WORKOUTS</button>
        </Link>
      </div>
    </React.Fragment>
  );
};

export default ExerciseProgressList;
