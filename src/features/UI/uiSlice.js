import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isDropDownOpen: false,
};

// createSlice automatically generates action creators and action types that correspond to the reducers and state.
const uiSlice = createSlice({
  name: "uiSlice",
  initialState,
  reducers: {
    toggleDropDown: (state) => {
      state.isDropDownOpen = !state.isDropDownOpen;
    },
    closeDropDown: (state) => {
      state.isDropDownOpen = false;
    },
  },
});

// action creator. we dispatch this in the components.
export const { toggleDropDown, closeDropDown } = uiSlice.actions;

export default uiSlice.reducer;
