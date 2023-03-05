import React, { useState } from "react";
// import { useDispatch } from "@reduxjs/toolkit";
import { toggleDropDown } from "../../../features/UI/uiSlice";
import DropDown from "../UIElements/DropDown";

import "./ProfileButton.css";
import Avatar from "../UIElements/Avatar";
import { useDispatch } from "react-redux";

// Onclick will open the profile dropdown which will allow user to change details.
const ProfileButton = () => {
  // need to be able to access this state somewhere on the page.
  // can use redux. We need to use redux here as need to be able the state of the dropdown elsewhere in the application
  const dispatch = useDispatch();
  const openDropDown = () => {
    dispatch(toggleDropDown());
  };

  return (
    <React.Fragment>
      <button className="profile-image-header" onClick={openDropDown}>
        <Avatar
          image="https://thumbs.dreamstime.com/b/default-avatar-profile-icon-social-media-user-vector-default-avatar-profile-icon-social-media-user-vector-portrait-176194876.jpg"
          alt="https://thumbs.dreamstime.com/b/default-avatar-profile-icon-social-media-user-vector-default-avatar-profile-icon-social-media-user-vector-portrait-176194876.jpg"
        />
      </button>
    </React.Fragment>
  );
};

export default ProfileButton;
