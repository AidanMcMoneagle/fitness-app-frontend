import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";

import NewWorkout from "./workouts/pages/NewWorkout";
import MyWorkouts from "./workouts/pages/MyWorkouts";
import MyProgress from "./workouts/pages/MyProgress";
import MyPhotos from "./workouts/pages/MyPhotos";
import AuthContext from "./shared/context/auth-context";
import Auth from "./users/pages/Auth";

import MainNavigation from "./shared/components/navigation/MainNavigation";

//users // we have multiple users. Each User has workout.

//workouts

//each user has workouts.

//test comment 3

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState(null);
  const [userId, setUserId] = useState(null);

  const login = (uid, token) => {
    setIsLoggedIn(true);
    setToken(token);
    setUserId(uid);
  };

  const logout = () => {
    setIsLoggedIn(false);
    setToken(null);
    setUserId(null);
  };

  const routes = (
    <Switch>
      <Route exact path="/">
        <MainNavigation />
      </Route>
      <Route exact path="/:userId/myworkouts">
        <MyWorkouts />
      </Route>
      <Route exact path="/workouts/new">
        <NewWorkout />
      </Route>
      <Route exact path="/:userId/myprogress">
        <MyProgress />
      </Route>
      <Route exact path="/:userId/myphotos">
        <MyPhotos />
      </Route>
      <Route exact path="/login">
        <Auth />
      </Route>
      <Redirect to="/" />
    </Switch>
  );

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout, token, userId }}>
      <Router>
        <MainNavigation />
        <main>{routes}</main>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
