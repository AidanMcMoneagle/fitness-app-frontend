import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userName: localStorage.getItem("userName"),
  userEmail: localStorage.getItem("userEmail"),
  userImage: localStorage.getItem("userImage"),
};

// createSlice automatically generates action creators and action types that correspond to the reducers and state.
const userProfileSlice = createSlice({
  name: "userProfileSlice",
  initialState,
  reducers: {
    setUserName: (state, action) => {
      state.userName = action.payload;
      localStorage.setItem("userName", action.payload);
    },
    setUserEmail: (state, action) => {
      state.userEmail = action.payload;
      localStorage.setItem("userEmail", action.payload);
    },
    setUserImage: (state, action) => {
      state.userImage = action.payload;
      localStorage.setItem("userImage", action.payload);
    },
    clearUserProfile: (state) => {
      state.userName = undefined;
      state.userEmail = undefined;
      state.userImage = undefined;
      localStorage.removeItem("userName");
      localStorage.removeItem("userEmail");
      localStorage.removeItem("userImage");
    },
  },
});

// action creator. we dispatch this in the components.
export const { setUserEmail, setUserImage, setUserName, clearUserProfile } =
  userProfileSlice.actions;

export default userProfileSlice.reducer;
