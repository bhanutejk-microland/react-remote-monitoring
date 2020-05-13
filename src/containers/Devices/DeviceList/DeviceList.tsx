import React, { Component } from "react";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Typography from "@material-ui/core/Typography";

// import classes from "../Dashboard.css";
import Table from "../../../components/UI/Table/Table";
import { AlertHeaderInfoModel } from "../../../interfaceModels/AlertHeaderInfoModel";
import { DeviceListModel } from '../../../interfaceModels/DeviceListModel';

interface DeviceListProps {
  deviceListInfoHeaders: AlertHeaderInfoModel[];
  deviceListInfo: DeviceListModel[];
}

interface DeviceListState {
  deviceListInfo: DeviceListModel[];
}

class DeviceListComponent extends Component<
  DeviceListProps,
  DeviceListState
  > {
  constructor(props: DeviceListProps) {
    super(props);
    this.state = {
      deviceListInfo: []
    };
  }

  handleDeviceListDeletion = (event: React.MouseEvent, deviceList: any) => {
    const dupDeviceListInfo = [...this.props.deviceListInfo];
    const updatedDeviceListInfo = dupDeviceListInfo.filter(
      deviceListData => !deviceList.includes(deviceListData.deviceName)
    );
    this.setState({
      deviceListInfo: [...updatedDeviceListInfo]
    });
  };

  shouldComponentUpdate(nextProps, nextState) {
    return (
      this.props.deviceListInfoHeaders !== nextProps.deviceListInfoHeaders ||
      this.props.deviceListInfo !== nextProps.deviceListInfo ||
      this.state.deviceListInfo !== nextState.deviceListInfo
    );
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.deviceListInfo !== this.state.deviceListInfo) {
      const newDeviceList = [...this.state.deviceListInfo];
      this.setState({
        deviceListInfo: [...newDeviceList]
      });
    }
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.deviceListInfo !== prevState.deviceListInfo) {
      return { deviceListInfo: nextProps.deviceListInfo };
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
          className={'classes.AlertPanelHeader'}
        >
          <div className={'classes.PanelHeaderContent'}>
            <Typography className={'classes.heading'}>DEVICES</Typography>
          </div>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Table
            headerCells={this.props.deviceListInfoHeaders}
            dataCells={this.state.deviceListInfo}
            uniqueCol="dateTime"
            handleAlertDeletion={(event, assetIds) =>
              this.handleDeviceListDeletion(event, assetIds)
            }
            defaultRowText='Loading device list ...!'
            enableLinkButton={false}
          />
        </ExpansionPanelDetails>
      </ExpansionPanel>
    );
  }
}

export default DeviceListComponent;
