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
          alt="https://thumbs.dreamstime.com/b/default-avatar-profile-icon-social-media-user-vector-default-avatar-profile-icon-social-media-user-vector-portrait-176194876.jpg"
        />
      </button>
    </React.Fragment>
  );
};

export default ProfileButton;
