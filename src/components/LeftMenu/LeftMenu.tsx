import React, { FunctionComponent } from "react";

import classes from "./LeftMenu.css";
import MenuItem from "./MenuItem/MenuItem";

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
      return (
        <MenuItem
          key={item.label}
          label={item.label}
          path={item.path}
          menuIcon={item.menuIcon}
          showMiniLeftMenu={showMiniLeftMenu}
        />
      );
    })}
  </aside>
);

export default LeftMenu;
