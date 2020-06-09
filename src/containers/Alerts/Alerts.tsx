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
import Drawer from "@material-ui/core/Drawer";
import AlertFormComponent from '../Alerts/AlertsFormComponent/AlertsFormComponent';

interface AlertsProps { 
  onInitAlerts: (appFilters:any) => void;
  onInitDeviceTelemetry: (deviceId: any, field:string,fromTimeStamp:any,toTimeStamp:any) => void;
  onUpdateAlertFormData: (alertFormData: any) => void;
  alertsListInfo: any;
  deviceTelemetry: any;
  match: any;
  appFilterInfo: any;
}

interface AlertsState {
  // alerts: any[];
  count: number;
  showAlertDrawer: boolean;
  snackbarInfo: {
    open: boolean;
    alertType: "error" | "success" | "info" | "warning" | undefined;
    message: string;
  };
  alertFormData: any;
  deviceId: string;
}

const alertInfoHeaders = [
  { id: "assetId", numeric: false, disablePadding: false, label: "ASSETID" },
  { id: "alertDate", numeric: false, disablePadding: false, label: "DATETIME" },
  { id: "alertSeveriy", numeric: false, disablePadding: false, label: "SEVERITY" },
  { id: "alertField", numeric: false, disablePadding: false, label: "FIELDS" },
  { id: "alertStatus", numeric: false, disablePadding: false, label: "STATUS" },
  { id: "alertDescription", numeric: false, disablePadding: false, label: "DESCRIPTION" }
];

class Alerts extends Component<AlertsProps, AlertsState> {

  constructor(props: AlertsProps) {
    super(props);
    this.state = {
      count: 0,
      showAlertDrawer: false,
      snackbarInfo: {
        open: false,
        alertType: 'success',
        message: ''
      },
      alertFormData: {},
      deviceId: ''
    }
  }

  componentDidMount() {
    if(this.props.match.url !== "/alerts"){
      const deviceId = this.props.match.params.assetId;    
      const appFilters = {
        assetIds : deviceId
      }; 
      this.props.onInitAlerts(appFilters);
    }else{
      const appFilters = this.props.appFilterInfo;
      this.props.onInitAlerts(appFilters);
    }    
  }

  componentDidUpdate(prevProps){
    const appFilters = this.props.appFilterInfo;
    if (prevProps.appFilterInfo !== appFilters) {
      this.props.onInitAlerts(appFilters);      
    }
  }

  renderTelemetry = () => {
    this.setState(prevState => ({
      count: prevState.count + 1
    }))
  }

  toggleAlertDrawer = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    this.setState({
      showAlertDrawer: !this.state.showAlertDrawer
    });
  };

  closeDrawer = (status) => {
    this.setState({
      showAlertDrawer: false
    });
    if (status[0] === 200) {
      this.handleSnackbar('success', status[1]);
    }
  }

  handleSnackbar = (type, message) => {
    this.setState(prevState => ({
      ...prevState,
      snackbarInfo: {
        ...prevState.snackbarInfo,
        open: true,
        alertType: type,
        message: message
      }
    }));
  }

  fillAlertFormData = (event,row) => {
    this.setState({
      alertFormData : row
    })
    this.toggleAlertDrawer(event);
  }

  renderAlerts = () => {    
    return (
      <Grid item xs={12} md={12}>
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
              uniqueCol="dateTime"
              renderTelemetry={(row) =>{ 
                let currentTime = new Date(row['alertDate']);
                let fromTimeStamp = currentTime.setHours(currentTime.getHours() - 1);
                let toTimeStamp = currentTime.setHours(currentTime.getHours() + 2);
                this.props.onInitDeviceTelemetry(row['assetId'],row['alertField'],fromTimeStamp,toTimeStamp);}
              }
              renderAlertData={(event, row) => this.fillAlertFormData(event, row)}
              defaultRowText='Loading alerts...!'
            />
          </ExpansionPanelDetails>
        </ExpansionPanel>
      </Grid>
    );
  }

  renderDeviceTelemetry = () => {
    return (
      <Grid item xs={12} md={12}>
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

  renderAlertForm = () => {
    return (
      <Drawer
        anchor="right"
        open={this.state.showAlertDrawer}
        onClose={this.toggleAlertDrawer}
      >
        <div className={classes.DrawerContainer}>
          <AlertFormComponent
            closeDrawer={(status) => this.closeDrawer(status)}
            updateAlertFormData={(alertFormData) => this.props.onUpdateAlertFormData(alertFormData)}
            cancleForm={this.toggleAlertDrawer}
            alertFormData={this.state.alertFormData}
          />
        </div>
      </Drawer>
    );
  }

  render() {
    return (
      <div style={{ margin: "0 15px" }}>
        <Grid container spacing={2}>
          <this.renderAlerts />
          <this.renderDeviceTelemetry />
          <this.renderAlertForm />
        </Grid>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    alertsListInfo: state.alertsInfo.alerts,
    deviceTelemetry: state.deviceTelemetryInfo.deviceTelemetry,
    appFilterInfo: state.appliedFilterInfo.appliedFiltersInfo
  };
}

const mapDispatchToProps = dispatch => {
  return {
    onInitAlerts: (appFilters) => dispatch(actions.initAlerts(appFilters)),
    onInitDeviceTelemetry: (deviceId,field,fromTimeStamp,toTimeStamp) => dispatch(actions.initDeviceTelemetry(deviceId,field,fromTimeStamp,toTimeStamp)),
    onUpdateAlertFormData: (alertFormData) => dispatch(actions.updateAlertFormData(alertFormData))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Alerts);
