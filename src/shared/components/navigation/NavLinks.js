import React, { useContext } from "react";
import { NavLink, Link } from "react-router-dom";
import AuthContext from "../../context/auth-context";

import "./NavLinks.css";

const NavLinks = () => {
  const context = useContext(AuthContext);
  return (
    <ul className="nav-links">
      {context.isLoggedIn && (
        <li>
          <NavLink
            exact
            to="/myworkouts"
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
      {!context.isLoggedIn && (
        <li>
          <Link exact to="/login">
            LOGIN
          </Link>
        </li>
      )}
      {context.isLoggedIn && (
        <li>
          <Link exact to="/login" onClick={context.logout}>
            LOGOUT
          </Link>
        </li>
      )}
    </ul>
  );
};

export default NavLinks;
