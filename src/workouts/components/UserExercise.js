import React, { useState, useEffect } from "react";
import { AiOutlineCheck } from "react-icons/ai";

// if we want to track our workout need weight to pop up
// need to write some comments on below code
const UserExercise = (props) => {
  const { name, sets, reps } = props.exercise;
  console.log(props.exercise);
  const { inTrackingMode } = props;
  const { passNumberOfSetInputs, numberOfSetHeaders } = props;

  const [numberOfSetInputs, setNumberOfSetInputs] = useState([]);

  //look at the logic below ensure makes sense
  useEffect(() => {
    if (!numberOfSetHeaders.length > 0) {
      let inputArray = [];
      const setInputs = (sets) => {
        for (let i = 0; i < parseInt(sets); i++) {
          inputArray.push("Input");
        }
        return setNumberOfSetInputs(inputArray);
      };
      setInputs(sets);
    } else {
      return;
    }
  }, [numberOfSetInputs, sets, numberOfSetHeaders.length]);

  useEffect(() => {
    if (numberOfSetInputs.length > 0) {
      passNumberOfSetInputs(numberOfSetInputs);
    } else {
      return;
    }
  }, [numberOfSetInputs, passNumberOfSetInputs]);

  return (
    <React.Fragment>
      <td>{name}</td>
      <td>{reps}</td>
      <td>{sets}</td>
      {inTrackingMode &&
        numberOfSetInputs.length > 0 &&
        numberOfSetInputs.map((input, index) => {
          return (
            <td className="track-input" key={index}>
              <input type="number"></input>
            </td>
          );
        })}
      {inTrackingMode && numberOfSetInputs.length > 0 && (
        <td>
          <button className="track-exercise-btn">
            <AiOutlineCheck />
          </button>
        </td>
      )}
    </React.Fragment>
  );
};

export default UserExercise;

//button submits the each row. updates the state of the tracking form to be sent.
// we want the button styling to change when the form is valid and ready to be submitted.
// when we click the button we want to call a function created in the parent to pass the data.
// this is where the reducer is.
// the reducer then dispatches an action and we change the state of the tracking.
//when the number of objects in the state is equal to the number of exercises in the workout a button will appear and will allow us to send the data to the db.
// to be determined how this data will be stored in the db.
