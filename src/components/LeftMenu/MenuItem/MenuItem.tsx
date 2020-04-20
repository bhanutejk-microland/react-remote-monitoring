import React, { FunctionComponent } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { withRouter, NavLink } from "react-router-dom";

import classes from "./MenuItem.css";

interface MenuItemProps {
  label: string;
  path: string;
  menuIcon: any;
  showMiniLeftMenu: boolean;
}

const MenuItem: FunctionComponent<MenuItemProps> = ({
  label,
  path,
  menuIcon,
  showMiniLeftMenu
}) => (
  <NavLink
    activeClassName={classes.ActiveRouteLink}
    className={classes.MenuItemWrapper}
    to={path}
    exact
  >
    <FontAwesomeIcon icon={menuIcon} />
    <span
      className={showMiniLeftMenu ? classes.MiniMenuLabel : classes.MenuLabel}
    >
      {label}
    </span>
  </NavLink>
);

export default withRouter(MenuItem);
