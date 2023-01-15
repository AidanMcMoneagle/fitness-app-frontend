import React, { useState, useEffect } from "react";
import { AiOutlineCheck } from "react-icons/ai";

// if we want to track our workout need weight to pop up
// need to write some comments on below code
const UserExercise = (props) => {
  const { name, sets, reps } = props.exercise;
  const { passNumberOfSetInputs, numberOfSetHeaders, inTrackingMode } = props;

  //state for number of sets for each exercise. We map over array and for each element (set) we return a form input.
  const [numberOfSetInputs, setNumberOfSetInputs] = useState([]);

  //contains state of the form inputs. Contains the user input values.
  const [inputState, setInputState] = useState([]);

  //store the state if the all inputs are populated. Used to conditionally apply styling and enable button to send data to parent.
  const [isSetInputPopulated, setIsSetInputPopulated] = useState(false);

  //Need to do if Check otherwise we create an infinite loop.
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

  //need to set the length of the inputState array initially to be equal to the number of sets.
  useEffect(() => {
    const createInputArray = (sets) => {
      let inputArray = [];
      for (let i = 0; i < parseInt(sets); i++) {
        inputArray.push("");
      }
      return setInputState(inputArray);
    };
    createInputArray(sets);
  }, [sets]); // changed dep array to sets

  useEffect(() => {
    const areAllSetInputsPopulated = () => {
      let tracker = true;
      inputState.map((input) => {
        if (!input) {
          return (tracker = false);
        } else {
          return tracker;
        }
      });
      return setIsSetInputPopulated(tracker);
    };
    areAllSetInputsPopulated();
  }, [inputState]);

  const changeHandler = (index, e) => {
    e.preventDefault();
    const inputValue = e.target.value;
    console.log(inputValue);
    console.log(index);
    setInputState((prevState) => {
      const newArray = prevState.map((el, currIndex) => {
        if (currIndex !== index) {
          return el;
        } else {
          return inputValue;
        }
      });
      return newArray;
    });
  };

  useEffect(() => {
    console.log(inputState);
    console.log(isSetInputPopulated);
  }, [inputState, isSetInputPopulated]);

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
              <input
                type="number"
                value={inputState[index]}
                onChange={(e) => changeHandler(index, e)}
              ></input>
            </td>
          );
        })}
      {inTrackingMode && numberOfSetInputs.length > 0 && (
        <td>
          <button
            className={`track-exercise-btn ${
              !isSetInputPopulated && "track-exercise-btn--disabled"
            }`}
            disabled={!isSetInputPopulated}
          >
            <AiOutlineCheck />
          </button>
        </td>
      )}
    </React.Fragment>
  );
};

export default UserExercise;

//button sends data to reducer in parent in each row. updates the state of the tracking data to be sent.
// we want the button styling to change when all inputs have been added.
// when we click the button we want to call a function created in the parent to pass the data.
// this is where the reducer is.
// the reducer then dispatches an action and we change the state of the tracking.
//when the number of objects in the state is equal to the number of exercises in the workout a button will appear and will allow us to send the data to the db.
// to be determined how this data will be stored in the db.
