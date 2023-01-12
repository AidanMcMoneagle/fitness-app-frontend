// page that renders a form to login/signup

//need to have state at the top we can switch this

//isloginmode - true or false can switch between these.

//render two buttons at the bottom of the page

// login button
//swicth to signup

import React, { useState, useReducer, useEffect, useCallback } from "react";

import useHttpClientCustomHook from "../../shared/hooks/useHttpClientCustomHook";

import Input from "../../shared/components/FormElements/Input";
import {
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
  VALIDATOR_EMAIL,
} from "../../shared/utils/validators";

import "./Auth.css";

const formReducer = (state, action) => {
  if (action.type === "INPUT_CHANGE") {
    // manage the validity of the 2 other inputs
    let isValidForm = true;
    for (const [key, value] of Object.entries(state.inputs)) {
      if (key.toString() === action.payload.id) {
        continue;
      }
      if (!value.isValid) {
        isValidForm = false;
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
      formIsValid: isValidForm && action.payload.isValid ? true : false,
    };
  }
  if (action.type === "ADD_NAME_FIELD") {
    return {
      ...state,
      inputs: {
        ...state.inputs,
        name: {
          value: "",
          isValid: false,
        },
      },
      formIsValid: false,
    };
  }
  if (action.type === "REMOVE_NAME_FIELD") {
    return {
      ...state,
      inputs: {
        email: {
          value: state.inputs.email.value,
          isValid: state.inputs.email.isValid,
        },
        password: {
          value: state.inputs.password.value,
          isValid: state.inputs.password.isValid,
        },
      },
      formIsValid: state.inputs.password.isValid && state.inputs.email.isValid,
    };
  }
};

const Auth = () => {
  const [isLoginMode, setIsLoginMode] = useState(true);

  const [formState, dispatch] = useReducer(formReducer, {
    inputs: {
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

  const { error, isLoading, sendRequest, clearError } =
    useHttpClientCustomHook();

  const toggleLoginMode = (e) => {
    e.preventDefault();
    if (isLoginMode) {
      dispatch({
        type: "ADD_NAME_FIELD",
      });
    } else {
      dispatch({
        type: "REMOVE_NAME_FIELD",
      });
    }
    setIsLoginMode(!isLoginMode);
  };

  // we pass inputChangeHandler into the dependency array of useEffect() in the Input element. We must therefore
  const inputChangeHandler = useCallback((id, value, isValid) => {
    dispatch({
      type: "INPUT_CHANGE",
      payload: {
        id,
        value,
        isValid,
      },
    });
  }, []);

  useEffect(() => {
    console.log("formState", formState);
  });

  // send request to backend using hook. Need to include formState in the body. The response
  const onSubmitHandler = async () => {
    if (isLoginMode) {
      try {
        const responseData = await sendRequest(
          "http://localhost:5000/api/users/login",
          "POST",
          JSON.stringify(formState),
          { "Content-Type": "application/json" }
        );
        console.log(responseData);
      } catch (err) {
        console.log(err);
      }
    } else {
      try {
        const responseData = sendRequest(
          "http://localhost:5000/api/users/signup",
          "POST",
          JSON.stringify(formState),
          { "Content-Type": "application/json" }
        );
        console.log(responseData);
      } catch (e) {
        console.log(e);
      }
    }
  };

  return (
    <section className="section-center">
      <h3>{isLoginMode ? "Login Required" : "Sign up Required"}</h3>
      <form onSubmit={onSubmitHandler}>
        {!isLoginMode && (
          <Input
            id="name"
            type="text"
            labelText="Your Name"
            errorText="please enter your name"
            onInput={inputChangeHandler}
            validators={[VALIDATOR_REQUIRE()]}
          />
        )}
        <Input
          id="email"
          type="email"
          labelText="Email"
          errorText="please enter a valid email"
          onInput={inputChangeHandler}
          validators={[VALIDATOR_EMAIL()]}
        />
        <Input
          id="password"
          type="password"
          labelText="Password"
          errorText="please enter a password with a min length 8 characters"
          onInput={inputChangeHandler}
          validators={[VALIDATOR_MINLENGTH(8)]}
        />
        <div>
          <button disabled={!formState.formIsValid}>
            {isLoginMode ? "LOGIN" : "SIGN UP"}
          </button>
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
