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
import ForgotPassword from "./users/pages/ForgotPassword";
import useAuth from "./shared/hooks/useAuth";
import MainNavigation from "./shared/components/navigation/MainNavigation";
import LoadingSpinner from "./shared/components/UIElements/LoadingSpinner";

function App() {
  const { login, logout, token, isCheckingAuth } = useAuth();

  let routes;
  if (!token) {
    routes = (
      <Switch>
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
        <Route exact path="/forgotpassword">
          <ForgotPassword />
        </Route>
        <Redirect to="/login" />
      </Switch>
    );
  } else {
    routes = (
      <Switch>
        <Route exact path="/myworkouts">
          <MyWorkouts />
        </Route>
        <Route exact path="/workouts/new">
          <NewWorkout />
        </Route>
        <Route exact path="/:workoutId/myprogress">
          <MyProgress />
        </Route>
        <Redirect to="/myworkouts" />
      </Switch>
    );
  }

  if (isCheckingAuth) {
    return (
      <React.Fragment>
        <Router>
          <MainNavigation />
          <LoadingSpinner />
        </Router>
      </React.Fragment>
    );
  } else {
    return (
      <AuthContext.Provider
        value={{ isLoggedIn: !!token, login, logout, token }}
      >
        <Router>
          <MainNavigation />
          <main>{routes}</main>
        </Router>
      </AuthContext.Provider>
    );
  }
}

export default App;
