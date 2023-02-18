import React, { useState, useCallback, useEffect } from "react";
import { useParams, Link } from "react-router-dom";

import useHttpClientCustomHook from "../../shared/hooks/useHttpClientCustomHook";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import Card from "../../shared/components/UIElements/Card";
import Input from "../../shared/components/FormElements/Input";
import { VALIDATOR_MINLENGTH } from "../../shared/utils/validators";

import "./Auth.css";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isConfirmPasswordValid, setConfirmPasswordValid] = useState(false);
  const [isConfirmPasswordTouched, setConfirmPasswordTouched] = useState(false);

  const [isPasswordReset, setIsPasswordReset] = useState(false);

  const { error, isLoading, sendRequest, clearError } =
    useHttpClientCustomHook();

  const { resetToken } = useParams();

  const inputChangeHandler = useCallback((id, value, isValid) => {
    setPassword(value);
    setIsPasswordValid(isValid);
  }, []);

  const changeHandler = (e) => {
    setConfirmPassword(e.target.value);
  };

  const touchHandler = (e) => {
    setConfirmPasswordTouched(true);
  };

  useEffect(() => {
    if (isPasswordValid && password === confirmPassword) {
      setConfirmPasswordValid(true);
    } else {
      setConfirmPasswordValid(false);
    }
  }, [password, confirmPassword, isPasswordValid]);

  // once we have reset the password we show a message and a button to go to the login page.
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}/users/resetpassword/${resetToken}`, // we send the
        "PUT",
        JSON.stringify({
          password: password,
        }),
        { "Content-Type": "application/json" }
      );
      setIsPasswordReset(true);
    } catch (err) {
      console.log("error");
    }
  };
  return (
    <React.Fragment>
      {isLoading && <LoadingSpinner />}
      {error && <ErrorModal error={error} clearError={clearError} />}
      <Card className="authentication">
        <h3>Reset Password</h3>
        {!isPasswordReset && (
          <form onSubmit={onSubmitHandler}>
            <Input
              id="password"
              type="password"
              labelText="New Password"
              errorText="please enter a password with a min length 8 characters"
              onInput={inputChangeHandler}
              validators={[VALIDATOR_MINLENGTH(8)]}
            />
            <div
              className={`form-control ${
                !isConfirmPasswordValid &&
                isConfirmPasswordTouched &&
                "form-control--invalid"
              }`}
            >
              <label htmlFor="confirmpassword">Confirm New Password</label>
              <input
                type="password"
                id="confirmpassword"
                onChange={changeHandler}
                onBlur={touchHandler} //onBlur event occurs when user loses focus on element.
                value={confirmPassword}
              />
              {!isConfirmPasswordValid && isConfirmPasswordTouched && (
                <p>passwords do not match</p>
              )}
              <div>
                <button disabled={!isConfirmPasswordValid}>
                  RESET PASSWORD
                </button>
              </div>
            </div>
          </form>
        )}
        {isPasswordReset && (
          <>
            <p>Your Password has been updated</p>
            <div>
              <Link exact to={"/login"}>
                <button>LOGIN</button>
              </Link>
            </div>
          </>
        )}
      </Card>
    </React.Fragment>
  );
};

export default ResetPassword;
