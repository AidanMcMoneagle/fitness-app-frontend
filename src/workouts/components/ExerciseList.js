import React from "react";

import Card from "../../shared/components/UIElements/Card";
import ExerciseInput from "./ExerciseInput";

import "./ExerciseList.css";

const ExerciseList = (props) => {
  const { exerciseNumber, addExerciseData, setFormIsValid} = props;

  return (
    <div className="new-exercise-list">
      {exerciseNumber.map((id, index) => {
        return (
          <Card key={id} className="input-exercise-list">
            <ExerciseInput
              index={index}
              addExerciseData={addExerciseData}
              setFormIsValid={setFormIsValid}
              id={id}
              deleteExercise={props.deleteExercise}
            />
          </Card>
        );
      })}
    </div>
  );
};

export default ExerciseList;
