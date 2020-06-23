import React, { FunctionComponent } from "react";

import classes from "./LeftMenu.css";
import MenuItem from "./MenuItem/MenuItem";

//temporary Added
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface LeftMenu {
  label: string;
  path: string;
  menuIcon: any;
}

interface LeftMenuProps {
  showMiniLeftMenu: boolean;
  menuList: LeftMenu[];
}

const LeftMenu: FunctionComponent<LeftMenuProps> = ({
  showMiniLeftMenu,
  menuList
}) => (
  <aside
    className={
      showMiniLeftMenu
        ? [classes.MainSidebar, classes.MiniSidebar].join(" ")
        : classes.MainSidebar
    }
  >
    {menuList.map((item: LeftMenu) => {      
      if(item.label === "AR Assist"){
        return(
          <Link key={item.label}
                style={{color: "#ffffff", display: "flex", alignItems: "center", cursor: "pointer", textDecoration: "none", borderLeft: "3px solid transparent"}}
                className={classes.MenuItemWrapper}
                target="_blank"
                to={item.path}
                onClick={(event) => {event.preventDefault(); window.open("https://connect.vuforia.com/");}}>
            <FontAwesomeIcon icon={item.menuIcon} style={{padding: "17px"}} />
            <span
              className={showMiniLeftMenu ? classes.MiniMenuLabel : classes.MenuLabel}
            >
              {item.label}
            </span>
          </Link>
        )
      }else{
        return (
          <MenuItem
            key={item.label}
            label={item.label}
            path={item.path}
            menuIcon={item.menuIcon}
            showMiniLeftMenu={showMiniLeftMenu}
          />
        );
      }
      
    })}
  </aside>
);

export default LeftMenu;
