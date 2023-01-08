import React, { useState } from "react";
import { HiOutlinePlusCircle } from "react-icons/hi";
import ExcerciseInput from "../../shared/components/FormElements/ExcerciseInput";

import "./NewWorkout.css";

// TODO - change exercise spelling

// we have a search form. We enter in the form
//controlled input first
const NewWorkout = () => {
  const [excerciseNumber, setExcerciseNumber] = useState([]);

  const addExcercise = () => {
    const newList = [...excerciseNumber, <ExcerciseInput />];
    setExcerciseNumber(newList);
  };

  return (
    <section className="section-center">
      <form className="new-workout-form">
        <h3>NEW WORKOUT</h3>
        {excerciseNumber.map((excercise, index) => {
          return (
            <div>
              <h4>{`Excercise ${index + 1}`}</h4>
              {excercise}
            </div>
          );
        })}
      </form>
      <div className="add-excercise-btn">
        <button onClick={addExcercise}>
          <HiOutlinePlusCircle />
        </button>
      </div>
    </section>
  );
};

export default NewWorkout;
