import React, { useState, useEffect } from "react";

// if we want to track our workout need weight to pop up
const UserExercise = (props) => {
  const { name, sets, reps } = props.exercise;
  const { inTrackingMode } = props;

  const [numberOfInputs, setNumberOfInputs] = useState();

  useEffect(() => {
    let inputArray = [];
    const setInputs = (sets) => {
      for (let i = 0; i < parseInt(sets); i++) {
        inputArray.push("Input");
      }
    };
    setInputs(sets);
    setNumberOfInputs(inputArray);
  }, []);

  return (
    <React.Fragment>
      <td>{name}</td>
      <td>{reps}</td>
      <td>{sets}</td>
      {inTrackingMode &&
        numberOfInputs &&
        numberOfInputs.map((input) => {
          return (
            <td className="track-input">
              <input type="number"></input>
            </td>
          );
        })}
    </React.Fragment>
  );
};

export default UserExercise;
