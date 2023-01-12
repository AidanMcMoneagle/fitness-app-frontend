import React, { useContext } from "react";
import { NavLink, Link } from "react-router-dom";
import AuthContext from "../../context/auth-context";

import "./NavLinks.css";

// need user Id in routes. The user id will be sent from the backend once authenticated and will be stored on frontend globally.
// user id is required as will be included in request to backend. enable us to fetch specific data in the backend
const NavLinks = () => {
  const context = useContext(AuthContext);
  return (
    <ul className="nav-links">
      {context.isLoggedIn && (
        <li>
          <NavLink
            exact
            to="/userId/myworkouts"
            activeStyle={{
              color: "white",
              backgroundColor: "#1e90ff",
              borderRadius: "2em",
              textDecoration: "underline white",
            }}
          >
            MY WORKOUTS
          </NavLink>
        </li>
      )}
      {context.isLoggedIn && (
        <li>
          <NavLink
            exact
            to="/workouts/new"
            activeStyle={{
              color: "white",
              backgroundColor: "#1e90ff",
              borderRadius: "2em",
              textDecoration: "underline white",
            }}
          >
            NEW WORKOUT
          </NavLink>
        </li>
      )}
      {context.isLoggedIn && (
        <li>
          <NavLink
            exact
            to="/userId/myprogress"
            activeStyle={{
              color: "white",
              backgroundColor: "#1e90ff",
              borderRadius: "2em",
              textDecoration: "underline white",
            }}
          >
            MY PROGRESS
          </NavLink>
        </li>
      )}
      {context.isLoggedIn && (
        <li>
          <NavLink
            exact
            to="/userId/myphotos"
            activeStyle={{
              color: "white",
              backgroundColor: "#1e90ff",
              borderRadius: "2em",
              textDecoration: "underline white",
            }}
          >
            MY PHOTOS
          </NavLink>
        </li>
      )}
      {!context.isLoggedIn && (
        <li>
          <Link exact to="/login">
            LOGIN
          </Link>
        </li>
      )}
      {context.isLoggedIn && (
        <li>
          <button onClick={context.logout}>LOGOUT</button>
        </li>
      )}
    </ul>
  );
};

export default NavLinks;
