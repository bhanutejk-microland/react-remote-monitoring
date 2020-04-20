import React, { Component } from 'react';
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import Drawer from "@material-ui/core/Drawer";
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';
import Grid from "@material-ui/core/Grid";

import classes from './Devices.css';
import DeviceFormComponent from './DeviceForm/DeviceForm';
import DeviceListComponent from './DeviceList/DeviceList';
import { DeviceListModel } from '../../interfaceModels/DeviceListModel';
import axios from '../../axios';
import { unixTimestampToDateTimeconverter } from '../../utilities/timeStampConverter';

interface DevicesProps { }

interface DevicesState {
  showDeviceDrawer: boolean;
  deviceListInfo: Array<DeviceListModel>;
  snackbarInfo: {
    open: boolean;
    alertType: "error" | "success" | "info" | "warning" | undefined;
    message: string;
  };
}

function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const deviceListInfoHeaders = [
  { id: "deviceName", numeric: false, disablePadding: false, label: "DEVICE NAME" },
  { id: "deviceType", numeric: false, disablePadding: false, label: "DEVICE TYPE" },
  { id: "status", numeric: false, disablePadding: false, label: "STATUS" },
  { id: "lastConnect", numeric: false, disablePadding: false, label: "LAST CONNECT" }
];

class Devices extends Component<DevicesProps, DevicesState> {

  constructor(props: DevicesProps) {
    super(props);
    this.state = {
      showDeviceDrawer: false,
      deviceListInfo: [],
      snackbarInfo: {
        open: false,
        alertType: 'success',
        message: ''
      }
    }
  }

  componentDidMount() {
    axios.get("api/devices/listDevices?configType=devices").then(response => {
      this.setDeviceListInfo(response.data);
    });
  }

  private setDeviceListInfo = (deviceList) => {
    const newDeviceList = new Array();
    deviceList.map(device => {
      newDeviceList.push({
        deviceName: device.data.displayName,
        deviceType: device.data.properties[0].typeOfRefrigerant,
        status: device.data.properties[0].deviceStatus,
        lastConnect: unixTimestampToDateTimeconverter(device.data.dateModified)
      });
    });
    this.setState(prevState => ({
      ...prevState,
      deviceListInfo: [...newDeviceList]
    }));
  }

  toggleDeviceDrawer = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    this.setState({
      showDeviceDrawer: !this.state.showDeviceDrawer
    });
  };

  closeDrawer = (status) => {
    this.setState({
      showDeviceDrawer: false
    });
    if (status[0] === 200) {
      this.handleSnackbar('success', status[1]);
    }
  }

  addToDeviceList = (deviceData) => {
    const updatedDeviceList = [...this.state.deviceListInfo, deviceData];
    this.setState({
      deviceListInfo: [...updatedDeviceList]
    })
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

  renderDeviceForm = () => {
    return (
      <Drawer
        anchor="right"
        open={this.state.showDeviceDrawer}
        onClose={this.toggleDeviceDrawer}
      >
        <div className={classes.DrawerContainer}>
          <DeviceFormComponent closeDrawer={(status) => this.closeDrawer(status)}
          addToDeviceList={(deviceData) => this.addToDeviceList(deviceData)} />
        </div>
      </Drawer>
    );
  };

  renderFabIcon = () => {
    return (
      <Fab
        color="secondary"
        className={classes.fab}
        onClick={this.toggleDeviceDrawer}
      >
        <AddIcon />
      </Fab>
    );
  };

  handleSnackbarClose = () => {
    this.setState(prevState => ({
      ...prevState,
      snackbarInfo: {
        ...prevState.snackbarInfo,
        open: false,
        alertType: undefined,
        message: ''
      }
    }));
  }

  renderSnackBar = () => {
    return (
      <Snackbar open={this.state.snackbarInfo.open} autoHideDuration={3000} onClose={this.handleSnackbarClose}>
        <Alert severity={this.state.snackbarInfo.alertType} onClose={this.handleSnackbarClose}>
          {this.state.snackbarInfo.message}
        </Alert>
      </Snackbar>
    );
  }

  renderDeviceList = () => {
    return (
      <Grid container spacing={2} className={classes.SectionContainer}>
        <Grid item xs={12}>
          <DeviceListComponent
            deviceListInfoHeaders={deviceListInfoHeaders}
            deviceListInfo={this.state.deviceListInfo}
          />
        </Grid>
      </Grid>
    )
  }

  render() {
    return (
      <div style={{ margin: "0 15px" }}>
        <this.renderDeviceList />
        <this.renderDeviceForm />
        <this.renderFabIcon />
        <this.renderSnackBar />
      </div>
    )
  }
}

export default Devices;
