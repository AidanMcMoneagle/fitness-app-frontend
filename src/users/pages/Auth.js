// page that renders a form to login/signup

//need to have state at the top we can switch this

//isloginmode - true or false can switch between these.

//render two buttons at the bottom of the page

// login button
//swicth to signup

import React, { useState, useReducer, useEffect } from "react";

import Input from "../../shared/components/FormElements/Input";

import "./Auth.css";

const formReducer = (state, action) => {
  if (action.type === "INPUT_CHANGE") {
    // manage the validity of the 2 other inputs
    let formisValid = true;
    for (const input in state.inputs) {
      if (input.toString() === action.payload.id) {
        continue;
      }
      if (!input.isValid) {
        formisValid = false;
      }
    }

    return {
      ...state,
      inputs: {
        ...state.inputs,
        [action.payload.id]: {
          value: action.payload.value,
          isValid: action.payload.isValid,
        },
      },
      formIsValid: formisValid && action.payload.isValid ? true : false,
    };
  }
};

const Auth = () => {
  const [isLoginMode, setIsLoginMode] = useState(false);

  const [formState, dispatch] = useReducer(formReducer, {
    inputs: {
      name: {
        value: "",
        isValid: false,
      },
      email: {
        value: "",
        isValid: false,
      },
      password: {
        value: "",
        isValid: false,
      },
    },
    formIsValid: false,
  });

  const toggleLoginMode = (e) => {
    e.preventDefault();
    setIsLoginMode(!isLoginMode);
  };

  const inputChangeHandler = (id, value, isValid) => {
    dispatch({
      type: "INPUT_CHANGE",
      payload: {
        id,
        value,
        isValid,
      },
    });
  };

  useEffect(() => {
    console.log("formState", formState);
  });

  return (
    <section className="section-center">
      <h3>{isLoginMode ? "Login Required" : "Sign up Required"}</h3>
      <form>
        {!isLoginMode && (
          <Input
            id="name"
            type="text"
            labelText="Your Name"
            errorText="please enter your name"
            onInput={inputChangeHandler}
          />
        )}
        <Input
          id="email"
          type="email"
          labelText="Email"
          errorText="please enter a valid email"
          onInput={inputChangeHandler}
        />
        <Input
          id="password"
          type="password"
          labelText="Password"
          errorText="please enter a password with a min length 8 characters"
          onInput={inputChangeHandler}
        />
        <div>
          <button>{isLoginMode ? "LOGIN" : "SIGN UP"}</button>
        </div>
        <div>
          <button onClick={toggleLoginMode}>
            {isLoginMode ? "SWITCH TO SIGN UP" : "SWITCH TO LOGIN"}
          </button>
        </div>
      </form>
    </section>
  );
};

export default Auth;
