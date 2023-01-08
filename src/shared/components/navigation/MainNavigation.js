import React, { useState } from "react";
import MainHeader from "./MainHeader";
import NavLinks from "./NavLinks";
import SideDrawer from "./SideDrawer";
import BackDrop from "./BackDrop";

import "./MainNavigation.css";

// this component is the main component for the navigation in the app.
//Navlinks

const MainNavigation = () => {
  const [sideDrawerOpen, setIsSideDrawerOpen] = useState(false);

  const openSideDrawer = () => {
    setIsSideDrawerOpen(true);
  };

  const closeSideDrawer = () => {
    setIsSideDrawerOpen(false);
  };

  return (
    <React.Fragment>
      {sideDrawerOpen && <BackDrop onClick={closeSideDrawer} />}

      <SideDrawer show={sideDrawerOpen} onClick={closeSideDrawer}>
        <header className="side-drawer__header">
          <h1 className="main-header__title">My Fitness Tracker</h1>
        </header>
        <div className="main-header__sidebar-navlinks">
          <NavLinks />
        </div>
      </SideDrawer>

      <MainHeader>
        <button
          className="main-header__toggle-sidebar-btn"
          onClick={openSideDrawer}
        >
          <span />
          <span />
          <span />
        </button>
        <h1 className="main-header__title">My Fitness Tracker</h1>
        <div className="main-header__navlinks">
          <NavLinks />
        </div>
      </MainHeader>
    </React.Fragment>
  );
};

export default MainNavigation;
