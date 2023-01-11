import React, { useReducer, useEffect } from "react";

// manage the state of each input here inlcuding validity. Then when we have a re-render we pass this up to the parent component to manage overall validity there. We manage the overall validity of the form in parent component.

import "./Input.css";

const inputReducer = (state, action) => {
  if (action.type === "CHANGE") {
    return {
      ...state,
      value: action.payload,
      isValid: true, // this will be changed later will be true or false
    };
  }
  if (action.type === "TOUCHED") {
    return {
      ...state,
      isTouched: true,
    };
  }
};

const Input = (props) => {
  const [inputState, dispatch] = useReducer(inputReducer, {
    value: "",
    isValid: false,
    isTouched: false, // we only want error text to show when the user clicks away from the input. Therefore we need this state
  });

  // when there is a change in value i.e. key press this changes. The state of the input is changed.
  const changeHandler = (e) => {
    dispatch({
      type: "CHANGE",
      payload: e.target.value,
      validators: props.validators,
    });
  };

  // we want to show error messg for invalid input only when we loose focus. This is why we must include this.
  const touchHandler = () => {
    dispatch({
      type: "TOUCHED",
    });
  };

  // whenever the state of the element changes we pass this up to the parent component. We do this by using a the onInput function which has been passed down as props.

  const { onInput, id } = props;
  const { value, isValid } = inputState;

  useEffect(() => {
    if (inputState.value) {
      onInput(id, value, isValid);
    }
  }, [id, value, isValid]);

  return (
    <div className={`form-control`}>
      <label htmlFor={props.id}>{props.labelText}</label>
      <input
        type={props.type}
        id={props.id}
        onChange={changeHandler}
        onBlur={touchHandler} //onBlur event occurs when user loses focus on element.
        value={inputState.value}
      />
      {!inputState.isValid && inputState.isTouched && <p>{props.errorText}</p>}
    </div>
  );
};

export default Input;
