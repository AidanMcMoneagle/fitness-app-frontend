import { configureStore } from "@reduxjs/toolkit";

import UIReducer from "../features/UI/uiSlice";

const store = configureStore({
  reducer: { ui: UIReducer },
});

export default store;
