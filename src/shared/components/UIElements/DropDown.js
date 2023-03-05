import React, { useState, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";

import useHttpClientCustomHook from "../../hooks/useHttpClientCustomHook";
import AuthContext from "../../context/auth-context";
import Avatar from "./Avatar";
import LoadingSpinner from "./LoadingSpinner";
import ErrorModal from "./ErrorModal";

import "./DropDown.css";

import ImageUpload from "../FormElements/ImageUpload";

const DropDown = () => {
  const [previewUrl, setPreviewUrl] = useState(undefined);
  const [image, setImage] = useState(undefined);
  const auth = useContext(AuthContext);

  const { error, isLoading, sendRequest, clearError } =
    useHttpClientCustomHook();

  // need an onInputhandler, we will send requests to the backend within this component.
  const inputHandler = (id, pickedFile, fileIsValid) => {
    console.log(pickedFile);
    setImage(pickedFile);
  };

  const passPreviewImage = (previewUrl) => {
    setPreviewUrl(previewUrl);
  };

  // want to upload the image. Once complete we want to add the image to our redux store and then also close the My profile pop up
  const submitFormHandler = async () => {
    if (!image) {
      return;
    }
    try {
      let formData = new FormData();
      formData.append("image", image);
      const responseData = await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}/users/updateprofile`,
        "POST",
        formData,
        {
          Authorization: "Bearer " + auth.token,
        }
      );

      console.log(responseData.image);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <React.Fragment>
      {isLoading && <LoadingSpinner />}
      {error && <ErrorModal error={error} clearError={clearError} />}
      <div className="drop-down">
        <h4 style={{ margin: "0" }}>My Profile</h4>
        <div className="profile-image-container">
          {!previewUrl && (
            <Avatar
              image={
                "https://thumbs.dreamstime.com/b/default-avatar-profile-icon-social-media-user-vector-default-avatar-profile-icon-social-media-user-vector-portrait-176194876.jpg"
              }
              alt="https://thumbs.dreamstime.com/b/default-avatar-profile-icon-social-media-user-vector-default-avatar-profile-icon-social-media-user-vector-portrait-176194876.jpg"
              className="profile-image-dropdown"
            />
          )}
          {previewUrl && (
            <Avatar image={previewUrl} className="profile-image-dropdown" />
          )}
          <ImageUpload
            id="image"
            center
            onInput={inputHandler}
            passPreviewImage={passPreviewImage}
          />
        </div>
        <h4>name:</h4>
        <h4>email:</h4>
        <h4>password:</h4>
        <button onClick={submitFormHandler}>Update Profile</button>
      </div>
    </React.Fragment>
  );
};

export default DropDown;
