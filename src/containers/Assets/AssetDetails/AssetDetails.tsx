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
  onInitAssetDetails: (assetId: string) => void;
  onInitAssetProperties: (assetId: string) => void;
  onInitAssetAnomalies: (assetId: string) => void;
  onInitAssetFaultAnalyisis: (assetId: string) => void;
  assetProperties: any;
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
    const assetId = this.props.match.params.assetId;

    if (this.props.assets.length > 0) {
      this.setAssetDetails(assetId);
    } else {
      this.fetchAssetDetails(assetId);
    }

    this.props.onInitAssetProperties(assetId);

    // axios.get("api/anomaly?deviceId=" + assetId).then(response => {
    //   this.setAssetAnamolies(response.data);
    // });
    this.props.onInitAssetAnomalies(assetId);
    //this.props.onInitAssetFaultAnalyisis(assetId);
  }

  private setAssetAnamolies = anamolies => {
    const newAnamolies = new Array();
    if (Object.keys(anamolies).length !== 0) {
      Object.keys(anamolies).map(anamolyKey => {
        if (Object.keys(anamolies[anamolyKey].telemetry[0]).includes('expValue')) {
          const telemetryData = new Array();
          anamolies[anamolyKey].telemetry.map(teleData => {
            const newTeleData = {
              date: unixTimestampToDateTimeconverter(teleData.timestamp),
              value1: teleData.tempValue,
              value2: teleData.expValue,
              previousDate: unixTimestampToDateTimeconverter(teleData.timestamp)
            }
            telemetryData.push(newTeleData)
          })
          newAnamolies.push([anamolyKey, telemetryData])
        }
      });
    }

    this.setState(prevState => ({
      ...prevState,
      assetDetails: {
        ...prevState.assetDetails,
        assetTabInfo: {
          ...prevState.assetDetails.assetTabInfo,
          anomaly: [...newAnamolies]
        }
      }
    }));
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
    let assetTabInfo = {};
    let tabHeaderInfo = Array();
    if(deviceId.includes('pump')){
      tabHeaderInfo = ["PROPERTIES", "TRENDS", "ANOMALY", "FAULTS CLASSIFICATION", "FAULTS IDENTIFICATION"];
      assetTabInfo = {
        properties: [...this.props.assetProperties],
        trends: [...this.state.assetDetails.assetTabInfo.trends],
        anomaly: { ...this.props.assetAnomalies },
        faultClassification: [...this.state.assetDetails.assetTabInfo.faultClassification],
        faultIdentification: [...this.state.assetDetails.assetTabInfo.faultIdentification]
      }
    }else{
      tabHeaderInfo = ["PROPERTIES", "TRENDS", "ANOMALY"]
      assetTabInfo = {
        properties: [...this.props.assetProperties],
        trends: [...this.state.assetDetails.assetTabInfo.trends],
        anomaly: { ...this.props.assetAnomalies }
      }
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
    assetAnomalies: state.assetAnomalies.anomalies
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onInitAssetDetails: (assetId) => dispatch(actions.initAssetDetails(assetId)),
    onInitAssetProperties: (assetId) => dispatch(actions.initAssetProperties(assetId)),
    onInitAssetAnomalies: (assetId) => dispatch(actions.initAssetAnomalies(assetId)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AssetDetails);
