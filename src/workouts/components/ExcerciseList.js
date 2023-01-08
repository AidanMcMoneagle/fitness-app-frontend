import React from "react";

const ExcerciseList = (props) => {
  console.log(props.excerciseList);
  return (
    <form>
      <ul>
        {props.excerciseList.map((excercise, index) => {
          return (
            <li className="excercise" key={index}>
              {excercise}
            </li>
          );
        })}
      </ul>
    </form>
  );
};

export default ExcerciseList;
