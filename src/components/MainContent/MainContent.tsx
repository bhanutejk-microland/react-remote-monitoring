import React, { FunctionComponent } from "react";
import classes from "./MainContent.css";

interface MainContentProps {
  showMaxContent: boolean;
}

const MainContent: FunctionComponent<MainContentProps> = ({
  showMaxContent,
  children
}) => (
  <div
    className={
      showMaxContent
        ? [classes.ContentWrapper, classes.MaxContentWrapper].join(" ")
        : classes.ContentWrapper
    }
  >
    {children}
  </div>
);

export default MainContent;
