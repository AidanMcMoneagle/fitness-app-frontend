import React from "react";

// share data across app.
//want to share
const AuthContext = React.createContext({
  isLoggedIn: "",
  login: () => {},
  logout: () => {},
  token: "",
  userId: "",
});

export default AuthContext;
