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

import MainNavigation from "./shared/components/navigation/MainNavigation";

//users // we have multiple users. Each User has workout.

//workouts

//each user has workouts.

//test comment

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const login = () => {
    setIsLoggedIn(true);
  };

  const logout = () => {
    setIsLoggedIn(false);
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
      <Redirect to="/" />
    </Switch>
  );

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      <Router>
        <MainNavigation />
        <main>{routes}</main>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
