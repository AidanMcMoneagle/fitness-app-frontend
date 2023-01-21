import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";

import NewWorkout from "./workouts/pages/NewWorkout";
import MyWorkouts from "./workouts/pages/MyWorkouts";
import MyProgress from "./workouts/pages/MyProgress";
import AuthContext from "./shared/context/auth-context";
import Auth from "./users/pages/Auth";

import useAuth from "./shared/hooks/useAuth";

import MainNavigation from "./shared/components/navigation/MainNavigation";

function App() {
  const { login, logout, token } = useAuth();

  const routes = (
    <Switch>
      {/* <Route exact path="/">
        <MainNavigation />
      </Route> */}
      <Route exact path="/myworkouts">
        <MyWorkouts />
      </Route>
      <Route exact path="/workouts/new">
        <NewWorkout />
      </Route>
      <Route exact path="/:workoutId/myprogress">
        <MyProgress />
      </Route>
      <Route exact path="/login">
        <Auth />
      </Route>
      <Redirect to="/login" />
    </Switch>
  );

  return (
    <AuthContext.Provider value={{ isLoggedIn: !!token, login, logout, token }}>
      <Router>
        <MainNavigation />
        <main>{routes}</main>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
