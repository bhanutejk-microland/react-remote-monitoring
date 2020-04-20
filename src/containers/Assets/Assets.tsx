import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import Drawer from "@material-ui/core/Drawer";
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';

import AssetComponent from "../../components/Asset/Asset";
import classes from './Assets.css';
import { IndividualAssetModel } from "../../interfaceModels/IndividualAssetModel";
import DeviceFormComponent from '../Devices/DeviceForm/DeviceForm';

interface AssetProps {
  onInitAssets: () => void;
  addAssetToListDispatcher: (asset: any) => void;
  assets: Array<IndividualAssetModel>;
 }

interface AssetState {
  assets: Array<IndividualAssetModel>;
  showDeviceDrawer: boolean;
  snackbarInfo: {
    open: boolean;
    alertType: "error" | "success" | "info" | "warning" | undefined;
    message: string;
  };
}

class Assets extends Component<AssetProps, AssetState> {
  constructor(props: AssetProps) {
    super(props);
    this.state = {
      assets: [],
      showDeviceDrawer: false,
      snackbarInfo: {
        open: false,
        alertType: 'success',
        message: ''
      }
    };
  }

  componentDidMount() {
    this.props.onInitAssets();
  }

  private renameStatus = status => {
    if (status === "Active") {
      return "Running";
    }
    return "Downtime";
  };

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

  addToDeviceList = (deviceData) => {
    const updatedDeviceList = [...this.state.assets, deviceData];
    this.setState({
      assets: [...updatedDeviceList]
    })
  }

  renderDeviceForm = () => {
    return (
      <Drawer
        anchor="right"
        open={this.state.showDeviceDrawer}
        onClose={this.toggleDeviceDrawer}
      >
        <div className={classes.DrawerContainer}>
          <DeviceFormComponent 
            closeDrawer={(status) => this.closeDrawer(status)}
            addToDeviceList={(deviceData) => this.props.addAssetToListDispatcher(deviceData)} 
            cancleForm={this.toggleDeviceDrawer}/>
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

  renderAssets = () => {
    return (
      <Grid container spacing={2}>
        {this.props.assets.length !== 0 ? (
          this.props.assets.map((asset, index) => {
            return (
              <AssetComponent asset={asset} key={"AssetComponent" + index} />
            );
          })
        ) : (
            <AssetComponent asset={{}} key={"AssetComponent1"} />
          )}
      </Grid>
    );
  };

  render() {
    return (
      <div style={{ margin: "0 15px" }}>
        <this.renderDeviceForm />
        <this.renderFabIcon />
        <this.renderAssets />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    assets: state.assetsInfo.assets
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onInitAssets: () => dispatch(actions.initAssets()),
    addAssetToListDispatcher: (asset) => dispatch(actions.addAssetToList(asset))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Assets);
