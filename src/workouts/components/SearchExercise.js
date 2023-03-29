import React, { useState, useEffect } from "react";
import useHttpClientCustomHook from "../../shared/hooks/useHttpClientCustomHook";
import {
  typeOptions,
  muscleOptions,
  difficultyOptions,
} from "../../shared/utils/exerciseData";
import AsyncSelect from "react-select/async";
import Select from "react-select";

import "./SearchExercise.css";

const SearchExercise = (props) => {
  const { error, isLoading, sendRequest, clearError } =
    useHttpClientCustomHook();

  const [exercise, setExercise] = useState(undefined);
  const [type, setType] = useState(undefined);
  const [difficulty, setDifficulty] = useState(undefined);
  const [muscle, setMuscle] = useState(undefined);

  const fetchExercise = async (inputValue) => {
    try {
      const responseData = await sendRequest(
        `https://exercises-by-api-ninjas.p.rapidapi.com/v1/exercises?name=${inputValue}${
          type ? `&type=${type.value}` : ""
        }${difficulty ? `&difficulty=${difficulty.value}` : ""}${
          muscle ? `&muscle=${muscle.value}` : ""
        }`,
        "GET",
        null,
        {
          "X-RapidAPI-Key": `${process.env.REACT_APP_X_RAPIDAPI_KEY}`,
          "X-RapidAPI-Host": "exercises-by-api-ninjas.p.rapidapi.com",
        }
      );
      const resObject = responseData.map((ex) => {
        return {
          value: ex.name,
          label: ex.name,
        };
      });

      return resObject;
      //responseData is an array of Objects. we are interested in the name.
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    if (exercise) fetchExercise(exercise.value);
  }, [exercise, type, difficulty, muscle]);

  const handleExerciseChange = (selectedExercise) => {
    setExercise(selectedExercise);
  };

  const handleTypeChange = (type) => {
    if (type.value === "none") {
      return setType(undefined);
    }
    setType(type);
  };

  const handleDifficultyChange = (difficulty) => {
    if (difficulty.value === "none") {
      return setDifficulty(undefined);
    }
    setDifficulty(difficulty);
  };

  const handleMuscleChange = (muscle) => {
    if (muscle.value === "none") {
      console.log("hi");
      return setMuscle(undefined);
    } else {
      console.log("wrong");
      setMuscle(muscle);
    }
  };

  const { passExerciseToParent } = props;
  useEffect(() => {
    if (exercise) {
      passExerciseToParent(exercise.value);
    }
  }, [exercise]);

  return (
    <React.Fragment>
      <div className="search-exercise">
        <label>Search Exercise</label>
        <AsyncSelect
          cacheOptions
          loadOptions={fetchExercise}
          onChange={handleExerciseChange}
          value={exercise}
          styles={{
            control: (baseStyles, state) => ({
              ...baseStyles,
            }),
            container: (baseStyles, state) => ({
              ...baseStyles,
              width: "100%",
              minWidth: "280px",
            }),
          }}
        />
      </div>

      <h4 className="center" style={{ marginBottom: "0px" }}>
        Filter By
      </h4>
      <div className="filter-exercise__type">
        <label>Type</label>
        <Select
          options={typeOptions}
          onChange={handleTypeChange}
          value={type}
          styles={{
            control: (baseStyles, state) => ({
              ...baseStyles,
              width: "280px",
            }),
          }}
        />
      </div>

      <div className="filter-exercise__diff">
        <label>Difficulty</label>
        <Select
          options={difficultyOptions}
          onChange={handleDifficultyChange}
          value={difficulty}
          styles={{
            control: (baseStyles, state) => ({
              ...baseStyles,
              width: "280px",
            }),
          }}
        />
      </div>
      <div className="filter-exercise__muscle">
        <label>Muscle</label>
        <Select
          options={muscleOptions}
          onChange={handleMuscleChange}
          value={muscle}
          styles={{
            control: (baseStyles, state) => ({
              ...baseStyles,
              width: "280px",
            }),
          }}
        />
      </div>
    </React.Fragment>
  );
};

export default SearchExercise;
