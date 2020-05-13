import React, { Component } from "react";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Typography from "@material-ui/core/Typography";

import classes from "./AlertsComponent.css";
import Table from "../UI/Table/Table";
import { AlertHeaderInfoModel } from "../../interfaceModels/AlertHeaderInfoModel";
import { AlertModel } from "../../interfaceModels/AlertModel";

interface AlertsComponentProps {
  alertInfoHeaders: AlertHeaderInfoModel[];
  alertsInfo: Array<AlertModel>;
}

interface AlertsComponentState {
  alertsInfo: Array<AlertModel>;
}

class AlertsComponent extends Component<
  AlertsComponentProps,
  AlertsComponentState
  > {
  constructor(props: AlertsComponentProps) {
    super(props);
    this.state = {
      alertsInfo: []
    };
  }

  handleAlertDeletion = (event: React.MouseEvent, alerts: any) => {
    const dupAlertsInfo = [...this.props.alertsInfo];
    const updatedAlertsInfo = dupAlertsInfo.filter(
      alertData => !alerts.includes(alertData.assetId)
    );
    this.setState({
      alertsInfo: [...updatedAlertsInfo]
    });
  };

  shouldComponentUpdate(nextProps, nextState) {
    return (
      this.props.alertInfoHeaders !== nextProps.alertInfoHeaders ||
      this.props.alertsInfo !== nextProps.alertsInfo ||
      this.state.alertsInfo !== nextState.alertsInfo
    );
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.alertsInfo !== this.state.alertsInfo) {
      const newAlerts = [...this.state.alertsInfo];
      this.setState({
        alertsInfo: [...newAlerts]
      });
    }
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.alertsInfo !== prevState.alertsInfo) {
      return { alertsInfo: nextProps.alertsInfo };
    }
    return null;
  }

  render() {
    return (
      <ExpansionPanel defaultExpanded>
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1c-content"
          id="panel1c-header"
          className={classes.AlertPanelHeader}
        >
          <div className={classes.PanelHeaderContent}>
            <Typography className={classes.heading}>ALERTS</Typography>
          </div>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Table
            headerCells={this.props.alertInfoHeaders}
            dataCells={this.state.alertsInfo}
            uniqueCol="dateTime"
            handleAlertDeletion={(event, assetIds) =>
              this.handleAlertDeletion(event, assetIds)
            }
            defaultRowText='Loading alerts...!'
            enableLinkButton={true}
          />
        </ExpansionPanelDetails>
      </ExpansionPanel>
    );
  }
}

export default AlertsComponent;
