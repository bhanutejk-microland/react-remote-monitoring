import React, { Component } from "react";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Typography from "@material-ui/core/Typography";

import classes from "./DashboardMapComponent.css";
import AzureMap from "../AzureMap/AzureMap";

interface DashboardMapComponentProps {
  mapInfo: Array<any>
}

interface DashboardMapComponentState { }

class DashboardMapComponent extends Component<DashboardMapComponentProps, DashboardMapComponentState> {

  constructor(props: DashboardMapComponentProps) {
    super(props);
  }

  render() {
    return (
      <ExpansionPanel defaultExpanded>
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1c-content"
          id="panel1c-header"
          className={classes.LocationPanelHeader}
        >
          <div className={classes.PanelHeaderContent}>
            <Typography className={classes.heading}>LOCATION</Typography>
          </div>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails className={classes.AzureMapContent}>
          <AzureMap mapInfo={this.props.mapInfo}/>
        </ExpansionPanelDetails>
      </ExpansionPanel>
    );
  }
}

export default DashboardMapComponent;
