import React, { FunctionComponent, MouseEvent } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";

import classes from "./Header.css";
import FilterIcon from "../../assets/icons/FilterIcon.svg";
import rmMlLogo from "../../assets/icons/rmMlLogo.svg";
import AvatarDropdown from '../UI/AvatarDropdown/AvatarDropdown';

type HeaderProps = {
  clickForMiniMenu: (event: MouseEvent) => void;
  clickForFilterBar: (event: MouseEvent) => void;
};

const Header: FunctionComponent<HeaderProps> = ({
  clickForMiniMenu,
  clickForFilterBar
}) => (
  <div className={classes.MainHeader}>
    <span className={classes.Logo}>
      {/* <img src={rmMlLogo} /> */}
    </span>
    <div className={classes.NavBar}>
      <div className={classes.barIcon} onClick={clickForMiniMenu}>
        <FontAwesomeIcon icon={faBars} />
      </div>
      <div className={classes.HeaderRightContent}>
        <div
          className={[classes.barIcon, classes.BtnFilter].join(" ")}
          onClick={clickForFilterBar}
          style={{ marginLeft: "20px" }}
        >
          <img src={FilterIcon} height="10px" />
          <span style={{ padding: "0 15px" }}>Filter</span>
        </div>
        <div>
          <AvatarDropdown />
        </div>
      </div>
    </div>
  </div>
);

export default Header;
