import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { toggleMyProfile } from "../../../features/UI/uiSlice";
import Avatar from "../UIElements/Avatar";

import "./ProfileButton.css";

const ProfileButton = () => {
  const dispatch = useDispatch();

  const userImage = useSelector((state) => state.userProfile.userImage);

  const openMyProfile = () => {
    dispatch(toggleMyProfile());
  };

  return (
    <React.Fragment>
      <button className="profile-image-header" onClick={openMyProfile}>
        <Avatar
          image={userImage}
          alt="https://www.pngarts.com/files/10/Default-Profile-Picture-Transparent-Image.png"
        />
      </button>
    </React.Fragment>
  );
};

export default ProfileButton;
