import React, { Component } from 'react';
import Grid from "@material-ui/core/Grid";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Typography from "@material-ui/core/Typography";

import classes from './Alerts.css';
import AlertTable from '../../components/UI/AlertTable/AlertTable';
import { unixTimestampToDateTimeconverter } from '../../utilities/timeStampConverter';
import ThresholdLineChart from '../../components/Charts/ThresholdLineChart';

interface AlertsProps { }

interface AlertsState {
  alerts: any[];
  count: number;
}

const alertInfoHeaders = [
  { id: "assetId", numeric: false, disablePadding: false, label: "ASSETID" },
  { id: "dateTime", numeric: false, disablePadding: false, label: "DATETIME" },
  { id: "status", numeric: false, disablePadding: false, label: "STATUS" },
  { id: "type", numeric: false, disablePadding: false, label: "TYPE" },
  { id: "summary", numeric: false, disablePadding: false, label: "DESCRIPTION" }
];

class Alerts extends Component<AlertsProps, AlertsState> {

  constructor(props: AlertsProps) {
    super(props);
    this.state = {
      count: 0,
      alerts: [
        { assetId: "asset001", dateTime: unixTimestampToDateTimeconverter(new Date()), status: 'open', type: 'alaram', summary: 'Temperature > 80 degrees' },
        { assetId: "asset002", dateTime: unixTimestampToDateTimeconverter(new Date()), status: 'open', type: 'alaram', summary: 'Temperature > 80 degrees' },
        { assetId: "asset003", dateTime: unixTimestampToDateTimeconverter(new Date()), status: 'open', type: 'alaram', summary: 'Temperature > 80 degrees' },
        { assetId: "asset004", dateTime: unixTimestampToDateTimeconverter(new Date()), status: 'open', type: 'alaram', summary: 'Temperature > 80 degrees' },
        { assetId: "asset005", dateTime: unixTimestampToDateTimeconverter(new Date()), status: 'open', type: 'alaram', summary: 'Temperature > 80 degrees' },
        { assetId: "asset006", dateTime: unixTimestampToDateTimeconverter(new Date()), status: 'open', type: 'alaram', summary: 'Temperature > 80 degrees' },
        { assetId: "asset007", dateTime: unixTimestampToDateTimeconverter(new Date()), status: 'open', type: 'alaram', summary: 'Temperature > 80 degrees' },
        { assetId: "asset008", dateTime: unixTimestampToDateTimeconverter(new Date()), status: 'open', type: 'alaram', summary: 'Temperature > 80 degrees' },
        { assetId: "asset009", dateTime: unixTimestampToDateTimeconverter(new Date()), status: 'open', type: 'alaram', summary: 'Temperature > 80 degrees' },
        { assetId: "asset0010", dateTime: unixTimestampToDateTimeconverter(new Date()), status: 'open', type: 'alaram', summary: 'Temperature > 80 degrees' },
        { assetId: "asset0011", dateTime: unixTimestampToDateTimeconverter(new Date()), status: 'open', type: 'alaram', summary: 'Temperature > 80 degrees' },
      ]
    }
  }

  renderTelemetry = () => {
    this.setState(prevState => ({
      count: prevState.count + 1
    }))
  }

  render() {
    return (
      <div style={{ margin: "0 15px" }}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={7}>
            <ExpansionPanel defaultExpanded>
              <ExpansionPanelSummary
                expandIcon={<ExpandMoreIcon />}
                className={classes.TicketsPanelHeader}
              >
                <div
                  className={classes.PanelHeaderContent}
                >
                  <Typography
                    className={classes.heading}
                  >ALERTS</Typography>
                </div>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>

                <AlertTable
                  headerCells={alertInfoHeaders}
                  dataCells={this.state.alerts}
                  uniqueCol="assetId"
                  renderTelemetry={() =>
                    this.renderTelemetry()
                  }
                  defaultRowText='Loading alerts...!'
                />
              </ExpansionPanelDetails>
            </ExpansionPanel>
          </Grid>
          <Grid item xs={12} md={5}>
            <ExpansionPanel defaultExpanded>
              <ExpansionPanelSummary
                expandIcon={<ExpandMoreIcon />}
                className={classes.TicketsPanelHeader}
              >
                <div
                  className={classes.PanelHeaderContent}
                >
                  <Typography
                    className={classes.heading}
                  >TELEMETRY</Typography>
                </div>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                <ThresholdLineChart count={this.state.count} />
              </ExpansionPanelDetails>
            </ExpansionPanel>
          </Grid>
        </Grid>
      </div>
    )
  }
}

export default Alerts;
