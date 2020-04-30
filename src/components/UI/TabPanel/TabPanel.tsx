import React from "react";
import SwipeableViews from "react-swipeable-views";
import { makeStyles, Theme, useTheme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";

import cssClasses from "./TabPanel.css";
import AssetProperty from "../../Assets/AssetProperty/AssetProperty";
import AssetAnamoly from '../../Assets/AssetAnamoly/AssetAnamoly';
import TrendsComponent from '../../Assets/Trends/Trends';
import FaultAnalysis from '../../Assets/FaultAnalysis/FaultAnalysis';

interface TabPanelProps {
  children?: React.ReactNode;
  dir?: string;
  index: any;
  value: any;
}

interface TabProps {
  tabHeaderInfo: any;
  assetTabInfo: any;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </Typography>
  );
}

function a11yProps(index: any) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`
  };
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    width: "100%"
  }
}));

export default function FullWidthTabs(props: TabProps) {
  const { tabHeaderInfo, assetTabInfo } = props;
  const classes = useStyles();
  const theme = useTheme();
  const [value, setValue] = React.useState(0);
  console.log(tabHeaderInfo);

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index: number) => {
    setValue(index);
  };

  const renderProperties = (properties, index = 0) => {
    if (properties.length !== 0) {
      return (
        <TabPanel
          value={value}
          index={index}
          dir={theme.direction}
          key={"assetTabPanel" + index}
        >
          {properties.map((property, index) => {
            return (
              <AssetProperty
                property={property}
                key={"AssetProperty" + index}
              />
            );
          })}
        </TabPanel>
      );
    }
    return (
      <TabPanel
        value={value}
        index={index}
        dir={theme.direction}
        key={"assetTabPanel" + index}
      >
        <AssetProperty property={null} key="AssetProperty0" />
      </TabPanel>
    );
  };

  const renderAnamolyData = (anamolies, index = 0) => {
    return (
      <TabPanel
        value={value}
        index={index}
        dir={theme.direction}
        key={"assetTabPanel" + index}
      >
        <AssetAnamoly anamoly={...anamolies} indexing={"AssetAnamoly0"} key="AssetAnamoly0" />
      </TabPanel>
    );
    // if (anamolies.length !== 0) {
    // return (
    //   <TabPanel
    //     value={value}
    //     index={index}
    //     dir={theme.direction}
    //     key={"assetTabPanel" + index}
    //   >
    //     {anamolies.map((anamoly, index) => {
    //       return (
    //         <AssetAnamoly
    //           anamoly={anamoly}
    //           key={"AssetAnamoly" + index}
    //         />
    //       );
    //     })}
    //   </TabPanel>
    // );
    // }
    // return (
    //   <TabPanel
    //     value={value}
    //     index={index}
    //     dir={theme.direction}
    //     key={"assetTabPanel" + index}
    //   >
    //     <AssetAnamoly anamoly={null} key="AssetAnamoly0" />
    //   </TabPanel>
    // );
  }

  return (
    <div className={classes.root}>
      <AppBar position="static" color="default">
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
          aria-label="full width tabs example"
        >
          {
          tabHeaderInfo.map((tabHeader, index) => {
            return (
              <Tab
                className={value === index ? cssClasses.SelectedTab : ""}
                label={tabHeader}
                {...a11yProps(index)}
                key={"tabHeaders" + index}
              />
            );
          })}
          />
        </Tabs>
      </AppBar>
      <SwipeableViews
        axis={theme.direction === "rtl" ? "x-reverse" : "x"}
        index={value}
        onChangeIndex={handleChangeIndex}
      >
        {Object.keys(assetTabInfo).map((tabData, index) => {
          if (tabData === "properties") {
            return renderProperties(assetTabInfo[tabData], index);
          } else if (tabData === "trends") {
            return (
              <TabPanel
                value={value}
                index={index}
                dir={theme.direction}
                key={"tabPanel" + index}
              >
                <TrendsComponent />
              </TabPanel>
            );
          } else if(tabData === "anomaly") {
            return renderAnamolyData(assetTabInfo[tabData], index);
            // return (
            //   <TabPanel
            //     value={value}
            //     index={index}
            //     dir={theme.direction}
            //     key={"tabPanel" + index}
            //   >
            //     ITEM {index}
            //   </TabPanel>
            // );
          }else{
            return(
              <TabPanel
                value={value}
                index={index}
                dir={theme.direction}
                key={"tabPanel" + index}
              >
                <FaultAnalysis />
              </TabPanel>
              
            )
          }
        })}
      </SwipeableViews>
    </div>
  );
}
