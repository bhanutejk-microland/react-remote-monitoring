import React, { Component } from 'react';
import Grid from "@material-ui/core/Grid";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Typography from "@material-ui/core/Typography";
import { connect } from 'react-redux';

import classes from './Alerts.css';
import AlertTable from '../../components/UI/AlertTable/AlertTable';
import { unixTimestampToDateTimeconverter } from '../../utilities/timeStampConverter';
import ThresholdLineChart from '../../components/Charts/ThresholdLineChart';
import * as actions from '../../store/actions/index';

interface AlertsProps { 
  onInitAlerts: () => void;
  onInitDeviceTelemetry: (deviceId: any) => void;
  alertsListInfo: any;
  deviceTelemetry: any;
}

interface AlertsState {
  // alerts: any[];
  count: number;
}

const alertInfoHeaders = [
  { id: "assetId", numeric: false, disablePadding: false, label: "ASSETID" },
  { id: "dateTime", numeric: false, disablePadding: false, label: "DATETIME" },
  { id: "status", numeric: false, disablePadding: false, label: "STATUS" },
  { id: "summary", numeric: false, disablePadding: false, label: "DESCRIPTION" }
];

class Alerts extends Component<AlertsProps, AlertsState> {

  constructor(props: AlertsProps) {
    super(props);
    this.state = {
      count: 0,
      // alerts: [
      //   { assetId: "asset001", dateTime: unixTimestampToDateTimeconverter(new Date()), status: 'open', type: 'alaram', summary: 'Temperature > 80 degrees' },
      //   { assetId: "asset002", dateTime: unixTimestampToDateTimeconverter(new Date()), status: 'open', type: 'alaram', summary: 'Temperature > 80 degrees' },
      //   { assetId: "asset003", dateTime: unixTimestampToDateTimeconverter(new Date()), status: 'open', type: 'alaram', summary: 'Temperature > 80 degrees' },
      //   { assetId: "asset004", dateTime: unixTimestampToDateTimeconverter(new Date()), status: 'open', type: 'alaram', summary: 'Temperature > 80 degrees' },
      //   { assetId: "asset005", dateTime: unixTimestampToDateTimeconverter(new Date()), status: 'open', type: 'alaram', summary: 'Temperature > 80 degrees' },
      //   { assetId: "asset006", dateTime: unixTimestampToDateTimeconverter(new Date()), status: 'open', type: 'alaram', summary: 'Temperature > 80 degrees' },
      //   { assetId: "asset007", dateTime: unixTimestampToDateTimeconverter(new Date()), status: 'open', type: 'alaram', summary: 'Temperature > 80 degrees' },
      //   { assetId: "asset008", dateTime: unixTimestampToDateTimeconverter(new Date()), status: 'open', type: 'alaram', summary: 'Temperature > 80 degrees' },
      //   { assetId: "asset009", dateTime: unixTimestampToDateTimeconverter(new Date()), status: 'open', type: 'alaram', summary: 'Temperature > 80 degrees' },
      //   { assetId: "asset0010", dateTime: unixTimestampToDateTimeconverter(new Date()), status: 'open', type: 'alaram', summary: 'Temperature > 80 degrees' },
      //   { assetId: "asset0011", dateTime: unixTimestampToDateTimeconverter(new Date()), status: 'open', type: 'alaram', summary: 'Temperature > 80 degrees' },
      // ]
    }
  }

  componentDidMount() {
    this.props.onInitAlerts();
  }

  renderTelemetry = () => {
    this.setState(prevState => ({
      count: prevState.count + 1
    }))
  }

  renderAlerts = () => {
    return (
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
              dataCells={this.props.alertsListInfo || []}
              uniqueCol="assetId"
              renderTelemetry={(deviceId) =>
                this.props.onInitDeviceTelemetry(deviceId)
              }
              defaultRowText='Loading alerts...!'
            />
          </ExpansionPanelDetails>
        </ExpansionPanel>
      </Grid>
    );
  }

  renderDeviceTelemetry = () => {
    return (
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
            <ThresholdLineChart count={this.state.count} teleData={this.props.deviceTelemetry} />
          </ExpansionPanelDetails>
        </ExpansionPanel>
      </Grid>
    );
  }

  render() {
    return (
      <div style={{ margin: "0 15px" }}>
        <Grid container spacing={2}>
          <this.renderAlerts />
          <this.renderDeviceTelemetry />
        </Grid>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    alertsListInfo: state.alertsInfo.alerts,
    deviceTelemetry: state.deviceTelemetryInfo.deviceTelemetry
  };
}

const mapDispatchToProps = dispatch => {
  return {
    onInitAlerts: () => dispatch(actions.initAlerts()),
    onInitDeviceTelemetry: (deviceId) => dispatch(actions.initDeviceTelemetry(deviceId))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Alerts);
