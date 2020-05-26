import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import Fab from "@material-ui/core/Fab";
import FilterListIcon from "@material-ui/icons/FilterList";
import Drawer from "@material-ui/core/Drawer";
import { connect } from 'react-redux';

import AssetComponent from "../../../components/Asset/Asset";
import TabPanel from "../../../components/UI/TabPanel/TabPanel";
import AssetFilter from "../AssetFilter/AssetFilter";
import classes from "./AssetDetails.css";
import axios from "../../../axios";
import { AssetModel } from "../../../interfaceModels/AssetModel";
import { unixTimestampToDateTimeconverter } from '../../../utilities/timeStampConverter';
import * as actions from '../../../store/actions/index';


interface AssetDetailsProps {
  assetDetails: any;
  match: any;
  assets: any;
  assetAnomalies: any;
  assetAzureAnomalies: any;
  onInitAssetDetails: (assetId: string) => void;
  onInitAssetProperties: (assetId: string, fromTimeStamp: any, toTimeStamp: any) => void;
  onInitAssetAnomalies: (payload: any) => void;
  onInitAssetAzureAnomalies: (payload: any) => void;
  onInitAssetFaultAnalyisis: (assetId: string) => void;
  assetProperties: any;
  appliedFilterDate: any;
}

interface AssetDetailsState {
  showAlertDrawer: boolean;
  assetDetails: AssetModel;
}


class AssetDetails extends Component<AssetDetailsProps, AssetDetailsState> {
  constructor(props: AssetDetailsProps) {
    super(props);
    this.state = {
      showAlertDrawer: false,
      assetDetails: {
        assetId: "",
        url: "",
        modelNumber: "",
        location: "",
        description: "",
        status: "",
        deviceStatus: "",
        assetTabInfo: {
          // properties: [],
          trends: [],
          anomaly: [],
          faultClassification: [],
          faultIdentification: [],
        }
      }
    };
  }

  componentDidMount() {
    const deviceId = this.props.match.params.assetId;
    if (this.props.assets.length > 0) {
      this.setAssetDetails(deviceId);
    } else {
      this.fetchAssetDetails(deviceId);
    }
    const toTimestamp = +new Date;
    const fromTimestamp = toTimestamp - 24 * 60 * 60 * 1000; // 24 hour
    const payload = { deviceId, fromTimestamp, toTimestamp }
    this.props.onInitAssetProperties(deviceId, fromTimestamp, toTimestamp);

    this.props.onInitAssetAnomalies(payload);
    this.props.onInitAssetAzureAnomalies(payload);
    //this.props.onInitAssetFaultAnalyisis(assetId);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.appliedFilterDate !== this.props.appliedFilterDate) {
      const assetId = this.props.match.params.assetId;
      const { fromTimestamp, toTimestamp } = this.props.appliedFilterDate;
      this.props.onInitAssetProperties(assetId, fromTimestamp, toTimestamp);
      const payload = { deviceId: assetId, fromTimestamp, toTimestamp }
      this.props.onInitAssetAnomalies(payload);
      this.props.onInitAssetAzureAnomalies(payload);
    }
  }

  private setAssetDetails = assetId => {
    const asset = this.props.assets.find((asset) => asset.assetId === assetId) || {};
    this.updateAssetDetails(asset);
  };

  private fetchAssetDetails = assetId => {
    this.props.onInitAssetDetails(assetId);
  }

  private updateAssetDetails = asset => {
    this.setState(prevState => ({
      ...prevState,
      assetDetails: { ...prevState.assetDetails, ...asset }
    }));
  }

  renderAssetDetailsTab = () => {
    const assetId = this.props.match.params.assetId;
    let deviceId = assetId.toLowerCase();
    let tabHeaderInfo = ["PROPERTIES", "TRENDS", "ANOMALY"]
    let assetTabInfo = {
      properties: [...this.props.assetProperties],
      trends: [...this.state.assetDetails.assetTabInfo.trends],
      anomaly: { ...this.props.assetAnomalies }
    }
    if (deviceId.includes('pump')) {
      tabHeaderInfo = [...tabHeaderInfo, "AZURE ANOMALY", "FAULTS IDENTIFICATION", "FAULTS CLASSIFICATION"];
      assetTabInfo['azureAnomaly'] = { ...this.props.assetAzureAnomalies };
      assetTabInfo['faultIdentification'] = [...this.state.assetDetails.assetTabInfo.faultIdentification];
      assetTabInfo['faultClassification'] = [...this.state.assetDetails.assetTabInfo.faultClassification];
    }

    return (
      <div style={{ marginTop: "15px", padding: "10px" }}>
        <Grid container spacing={2}>
          <TabPanel
            tabHeaderInfo={tabHeaderInfo}
            assetTabInfo={assetTabInfo}
            assetId={assetId}
          />
        </Grid>
      </div>
    );
  };

  toggleAlertDrawer = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    this.setState({
      showAlertDrawer: !this.state.showAlertDrawer
    });
  };

  renderAssetComponent = () => {
    const assetId = this.props.match.params.assetId;
    let assetDetailInfo = {};
    if (this.props.assets.length > 0) {
      const asset = this.props.assets.find((asset) => asset.assetId === assetId) || {};
      assetDetailInfo = { ...asset };
    } else {
      assetDetailInfo = this.props.assetDetails;
    }
    return <AssetComponent asset={assetDetailInfo} />;
  };

  renderFilterContent = () => {
    return (
      <Drawer
        anchor="right"
        open={this.state.showAlertDrawer}
        onClose={this.toggleAlertDrawer}
      >
        <div className={classes.DrawerContainer}>
          <AssetFilter cancleForm={this.toggleAlertDrawer} />
        </div>
      </Drawer>
    );
  };

  renderFabIcon = () => {
    return (
      <Fab
        color="secondary"
        className={classes.fab}
        onClick={this.toggleAlertDrawer}
      >
        <FilterListIcon />
      </Fab>
    );
  };

  render() {
    return (
      <div style={{ margin: "0 15px" }}>
        <this.renderFilterContent />
        <this.renderAssetComponent />
        <this.renderAssetDetailsTab />
        <this.renderFabIcon />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    assets: state.assetsInfo.assets,
    assetDetails: state.assetDetail.asset,
    assetProperties: state.assetProperties.properties,
    assetAnomalies: state.assetAnomalies.anomalies,
    assetAzureAnomalies: state.assetAzureAnomalies.anomalies,
    appliedFilterDate: state.assetDetailsDateFilter.appliedFilterDate
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onInitAssetDetails: (assetId) => dispatch(actions.initAssetDetails(assetId)),
    onInitAssetProperties: (assetId, fromTimeStamp, toTimeStamp) => dispatch(actions.initAssetProperties(assetId, fromTimeStamp, toTimeStamp)),
    onInitAssetAnomalies: (payload) => dispatch(actions.initAssetAnomalies(payload)),
    onInitAssetAzureAnomalies: (payload) => dispatch(actions.initAssetAzureAnomalies(payload))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AssetDetails);
