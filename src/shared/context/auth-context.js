import React from "react";

// share data across app.
//want to share
const AuthContext = React.createContext({
  isLoggedIn: "",
  login: () => {},
  logout: () => {},
});

export default AuthContext;
