import React, { useState } from "react";

const ExcerciseInput = () => {
  const [excercise, setExcercise] = useState("");
  const [repetitions, setRepetitions] = useState("");
  const [sets, setSets] = useState("");

  return (
    <span>
      <span>
        <label htmlFor="excercise"></label>
        <input
          type="text"
          id="excercise"
          value={excercise}
          placeholder="e.g. barbell rows"
          onChange={(e) => setExcercise(e.target.value)}
        />
        <label htmlFor="reps"></label>
      </span>
      <span>
        <label htmlFor="reps"></label>
        <input
          className="input-reps-box"
          type="text"
          placeholder="input reps"
          id="excercise"
          value={repetitions}
          onChange={(e) => setRepetitions(e.target.value)}
        />
      </span>
      <span>
        <label htmlFor="sets"></label>
        <input
          className="input-sets-box"
          type="text"
          placeholder="input sets"
          id="sets"
          value={sets}
          onChange={(e) => setSets(e.target.value)}
        />
      </span>
    </span>
  );
};

export default ExcerciseInput;
