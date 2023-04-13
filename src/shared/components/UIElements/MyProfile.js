import React, { useState, useContext, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { MdModeEditOutline } from "react-icons/md";
import { AiOutlineCheck } from "react-icons/ai";

import { closeMyProfile } from "../../../features/UI/uiSlice";
import {
  setUserEmail,
  setUserImage,
  setUserName,
} from "../../../features/UserProfile/userProfileSlice";

import useHttpClientCustomHook from "../../hooks/useHttpClientCustomHook";
import AuthContext from "../../context/auth-context";
import Avatar from "./Avatar";
import LoadingSpinner from "./LoadingSpinner";
import ErrorModal from "./ErrorModal";
import Modal from "./Modal";
import ImageUpload from "../FormElements/ImageUpload";
import Input from "../FormElements/Input";
import { VALIDATOR_REQUIRE, VALIDATOR_EMAIL } from "../../utils/validators";

import "./MyProfile.css";

// NEED TO HAVE ACCESS TO USER DETAILS IN REDUX STORE

const MyProfile = () => {
  const [previewUrl, setPreviewUrl] = useState(undefined);
  const [image, setImage] = useState(undefined);

  const [iseditingName, setIsEditingName] = useState(false);
  const [iseditingEmail, setIsEditingEmail] = useState(false);
  const [newEmailConfirmed, setNewEmailConfirmed] = useState(false);
  const [newUserName, setNewUserName] = useState(undefined);
  const [newEmail, setNewEmail] = useState(undefined);
  const [newNameConfirmed, setNewNameConfirmed] = useState(false);

  const auth = useContext(AuthContext);

  const dispatch = useDispatch();

  const userImage = useSelector((state) => state.userProfile.userImage);
  const userName = useSelector((state) => state.userProfile.userName);
  const userEmail = useSelector((state) => state.userProfile.userEmail);

  const { error, isLoading, sendRequest, clearError } =
    useHttpClientCustomHook();

  const inputHandler = (pickedFile) => {
    setImage(pickedFile);
  };

  const passPreviewImage = useCallback((previewUrl) => {
    setPreviewUrl(previewUrl);
  }, []);

  const closeMyProfileModal = () => {
    dispatch(closeMyProfile());
  };

  const toggleEditEmailHandler = () => {
    setIsEditingEmail(!iseditingEmail);
    setNewEmailConfirmed(false);
    setNewEmail(undefined);
  };

  const toggleEditNameHandler = () => {
    setIsEditingName(!iseditingName);
    setNewNameConfirmed(false);
    setNewUserName(undefined);
  };

  //whenever the input changes this sets the value of of newUserName/newemail
  const inputChangeHandler = useCallback((id, value, isValid) => {
    if (id === "name" && isValid === true) {
      setNewUserName(value);
    }
    if (id === "name" && isValid !== true) {
      setNewUserName(undefined);
    }
    if (id === "email" && isValid === true) {
      setNewEmail(value);
    }
    if (id === "email" && isValid !== true) {
      setNewEmail(undefined);
    }
  }, []);

  const confirmInputChange = (id) => {
    if (id === "email") {
      setNewEmailConfirmed(true);
      setIsEditingEmail(false);
    }
    if (id === "name") {
      setNewNameConfirmed(true);
      setIsEditingName(false);
    }
  };

  const submitFormHandler = async () => {
    try {
      let formData = new FormData();
      if (image) {
        formData.append("image", image);
      }
      if (newEmail) {
        formData.append("email", newEmail);
      }
      if (newUserName) {
        formData.append("name", newUserName);
      }
      const responseData = await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}/users/updateprofile`,
        "PATCH",
        formData,
        {
          Authorization: "Bearer " + auth.token,
        }
      );

      dispatch(setUserImage(responseData.image));
      dispatch(setUserEmail(responseData.email));
      dispatch(setUserName(responseData.name));
      closeMyProfileModal();
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <React.Fragment>
      {isLoading && <LoadingSpinner />}
      {error && <ErrorModal error={error} clearError={clearError} />}
      <Modal
        show
        header={"MY PROFILE"}
        footer={
          <div>
            <button
              onClick={submitFormHandler}
              disabled={!image && !newEmailConfirmed && !newNameConfirmed}
            >
              SAVE CHANGES
            </button>
            <button>
              <Link to="/login" onClick={auth.logout} className="logout-link">
                LOGOUT
              </Link>
            </button>
          </div>
        }
        footerClass={"myprofile-footer"}
        onCancel={closeMyProfileModal}
      >
        <div>
          <div className="profile-image-container">
            {!previewUrl && (
              <Avatar
                image={userImage}
                alt="https://www.pngarts.com/files/10/Default-Profile-Picture-Transparent-Image.png"
                className="profile-image-dropdown"
              />
            )}
            {previewUrl && (
              <Avatar image={previewUrl} className="profile-image-dropdown" />
            )}
            <ImageUpload
              id="image"
              onInput={inputHandler}
              passPreviewImage={passPreviewImage}
              buttonText={image || userImage ? "UPDATE IMAGE" : "ADD IMAGE"}
            />
          </div>
          <div className="profile-name-container">
            <h4>Name :</h4>
            {!iseditingName && (
              <h4 style={{ marginLeft: "5px" }}>
                {!newUserName ? userName : newUserName}
              </h4>
            )}
            {iseditingName && (
              <div style={{ marginLeft: "5px" }}>
                <Input
                  id="name"
                  type="text"
                  placeholder={userName}
                  onInput={inputChangeHandler}
                  validators={[VALIDATOR_REQUIRE()]}
                  style={{ margin: "0px" }}
                  inputStyle={{ margin: "0px" }}
                />
              </div>
            )}
            {iseditingName && (
              <button
                onClick={() => confirmInputChange("name")}
                className="confirm-input-btn"
                disabled={!newUserName}
              >
                <AiOutlineCheck />
              </button>
            )}
            <button onClick={toggleEditNameHandler} className="edit-input-btn">
              <MdModeEditOutline />
            </button>
          </div>
          <div className="profile-email-container">
            <h4>Email : </h4>
            {!iseditingEmail && (
              <h4
                style={{
                  marginLeft: "10px",
                }}
              >
                {!newEmail ? userEmail : newEmail}
              </h4>
            )}
            {iseditingEmail && (
              <div style={{ marginLeft: "10px" }}>
                <Input
                  id="email"
                  type="text"
                  placeholder={userEmail}
                  onInput={inputChangeHandler}
                  validators={[VALIDATOR_EMAIL()]}
                  style={{ margin: "0px" }}
                  inputStyle={{ margin: "0px" }}
                />
              </div>
            )}
            {iseditingEmail && (
              <button
                onClick={() => confirmInputChange("email")}
                className="confirm-input-btn"
                disabled={!newEmail}
              >
                <AiOutlineCheck />
              </button>
            )}
            <button onClick={toggleEditEmailHandler} className="edit-input-btn">
              <MdModeEditOutline />
            </button>
          </div>
        </div>
      </Modal>
    </React.Fragment>
  );
};

export default MyProfile;
