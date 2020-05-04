import React, { Component } from 'react';
import Grid from "@material-ui/core/Grid";
import { connect } from 'react-redux';
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";

import Input from "../../components/UI/Input/Input";
import Button from "../../components/UI/Button/Button";
import Chip from '../../components/UI/Chip/Chip';
import MultiLineChart from '../../components/Charts/MultiLineChart';
import classes from './Trends.css';
import * as actions from '../../store/actions/index';

interface TrendsProps {
  onInitDevicesWithTeleProps: () => void;
  onInitDevicesWithTelePropsDetails: (payload: any) => void;
  devicesWithTeleProps: Array<any>;
  devicesTeleDetailsProps: Array<any>;
}

interface TrendsState {
  trendPropertyList: Array<any>;
  formIsValid: Boolean;
  trendsInfo: Array<any>;
  selectedDevice: String | null;
  deviceTeleProps: Array<any>;
  selectedMeasure: String | null;
}

interface FormElement {
  id: string;
  config: any;
}

class Trends extends Component<TrendsProps, TrendsState> {

  constructor(props: TrendsProps) {
    super(props);
    this.state = {
      selectedDevice: null,
      deviceTeleProps: [],
      selectedMeasure: null,
      formIsValid: false,
      trendPropertyList: [],
      trendsInfo: [],
    }
  }

  componentDidMount() {
    this.props.onInitDevicesWithTeleProps();
  }

  checkValidity = (value, rules) => {
    let isValid = true;
    if (!rules) {
      return true;
    }

    if (rules.required) {
      isValid = value.trim() !== "" && isValid;
    }

    return isValid;
  };

  updatePropertyList = () => {
    const updatedPropertyList = [...this.state.trendPropertyList];
    if (updatedPropertyList.length === 0) {
      const deviseMeasures = [this.state.selectedMeasure];
      updatedPropertyList.push({
        deviceName: this.state.selectedDevice,
        deviceMeasures: [...deviseMeasures]
      });
      this.setState({
        trendPropertyList: [...updatedPropertyList],
      }, () => {
        this.props.onInitDevicesWithTelePropsDetails(this.state.trendPropertyList);
      })
    } else {
      const divceName = this.state.selectedDevice;
      const deviceObj = updatedPropertyList.find(({ deviceName }) => deviceName === divceName);
      if (deviceObj === undefined) {
        const deviseMeasures = [this.state.selectedMeasure];
        updatedPropertyList.push({
          deviceName: this.state.selectedDevice,
          deviceMeasures: [...deviseMeasures]
        })
        this.setState({
          trendPropertyList: [...updatedPropertyList]
        }, () => {
          this.props.onInitDevicesWithTelePropsDetails(this.state.trendPropertyList);
        })
      } else {
        const deviceMeasures = [...deviceObj.deviceMeasures];
        const deviceMeasure = this.state.selectedMeasure;
        if (!deviceMeasures.includes(deviceMeasure)) {
          deviceObj.deviceMeasures.push(deviceMeasure);
          this.setState(prevState => ({
            trendPropertyList: prevState.trendPropertyList.map(
              obj => (obj.divceName === divceName ? Object.assign(obj, { deviceMesures: [...deviceObj.deviceMesures] }) : obj)
            )
          }), () => {
            this.props.onInitDevicesWithTelePropsDetails(this.state.trendPropertyList);
          });
        }
      }
    }
  }

  handleDeviceSelector = (event) => {
    const selectedDevice = event.target.value;
    let updatedDeviceTeleProps = new Array();
    this.props.devicesWithTeleProps.map((tProp) => {
      if (tProp.assetId === selectedDevice) {
        updatedDeviceTeleProps = [...tProp.teleProps];
      }
    })
    this.setState({
      selectedDevice: selectedDevice,
      deviceTeleProps: [...updatedDeviceTeleProps]
    })
  }

  handleTeleMeasureSelector = (event) => {
    const selectedMeasure = event.target.value;

    this.setState({
      selectedMeasure: selectedMeasure
    })
  }

  devicesTelePropsComponent = () => {
    return (
      <div className={classes.formContainer}>
        <div className={classes.formContent}>
          <FormControl className={classes.InputElement}>
            <InputLabel id="demo-simple-select-label">
              DEVICES
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              onChange={(event) => this.handleDeviceSelector(event)}
              value={this.state.selectedDevice}
            >
              {this.props.devicesWithTeleProps.map(option => {
                return (
                  <MenuItem value={option.assetId} key={option.assetId}>
                    {option.assetId}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        </div>
        <div className={classes.formContent}>
          <FormControl className={classes.InputElement}>
            <InputLabel id="demo-simple-select-label">
              MEASURES
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              onChange={(event) => this.handleTeleMeasureSelector(event)}
              value={this.state.selectedMeasure}
            >
              {this.state.deviceTeleProps.map(option => {
                return (
                  <MenuItem value={option} key={option}>
                    {option}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        </div>
        <div className={classes.formContent} style={{ width: '60px', paddingTop: '15px' }}>
          <Button btnType="primary" disabled={this.state.selectedDevice === null || this.state.selectedMeasure === null} clicked={this.updatePropertyList} width='100%'>
            Add
          </Button>
        </div>
      </div>
    )
  }

  deletePropertySelector = (property) => {
    const propertyHirc = property.split(",");
    if (propertyHirc.length > 1) {
      const trenPropertyObj = this.state.trendPropertyList.find(({ deviceName }) => deviceName === propertyHirc[0]);
      let updatedDeviceMesures = [...trenPropertyObj.deviceMeasures];
      updatedDeviceMesures = updatedDeviceMesures.filter((property) => {
        return property !== propertyHirc[1]
      });
      if (updatedDeviceMesures.length === 0) {
        let updatedPropertyList = [...this.state.trendPropertyList];
        updatedPropertyList = updatedPropertyList.filter(function (obj) {
          return obj.deviceName !== propertyHirc[0];
        });
        this.setState({
          trendPropertyList: [...updatedPropertyList]
        })
      } else {
        this.setState(prevState => ({
          trendPropertyList: prevState.trendPropertyList.map(
            obj => (obj.deviceName === propertyHirc[0] ? Object.assign(obj, { deviceMeasures: [...updatedDeviceMesures] }) : obj)
          )
        }));
      }
    } else {
      let updatedPropertyList = [...this.state.trendPropertyList];
      updatedPropertyList = updatedPropertyList.filter(function (obj) {
        return obj.deviceName !== propertyHirc[0];
      });
      this.setState({
        trendPropertyList: [...updatedPropertyList]
      })
    }
  }

  renderRulesListAndComparisonCharts = () => {
    return (
      <Grid container spacing={2}>
        <Grid item xs={3}>
          <div style={{ marginLeft: '15px' }}>
            {this.state.trendPropertyList.length > 0 ?
              this.state.trendPropertyList.map((property) => {
                return <div key={property.deviceName} style={{ marginTop: '15px' }}>
                  <Chip
                    label={property.deviceName}
                    deleted={this.deletePropertySelector}
                  />
                  {property.deviceMeasures !== undefined && property.deviceMeasures.length > 0 ?
                    property.deviceMeasures.map((measure) => {
                      return <div key={property.deviceName + measure} style={{ marginLeft: '15px', marginTop: '10px' }}>
                        <Chip
                          label={measure}
                          chipId={`${property.deviceName},${measure}`}
                          deleted={this.deletePropertySelector}
                        />
                      </div>
                    }) : <div></div>
                  }
                </div>
              })
              : <div></div>
            }
          </div>
        </Grid>
        <Grid item xs={9}>
          {this.props.devicesTeleDetailsProps.length > 0 ?
            this.props.devicesTeleDetailsProps.map((deviceTrend, index) => {
              return <MultiLineChart
                key={deviceTrend.deviceName + index}
                indexing={index}
                chartData={deviceTrend}
                trendPropertyInfo={this.state.trendPropertyList}
              />
            }) : <div></div>}
        </Grid>
      </Grid>
    );
  }

  render() {
    return (
      <div>
        <this.devicesTelePropsComponent />
        <this.renderRulesListAndComparisonCharts />
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    devicesWithTeleProps: state.devicesTeleProps.devicesWithTeleProps,
    devicesTeleDetailsProps: state.deviceTelePropsDetailsInfo.devicesTeleDetails
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    onInitDevicesWithTeleProps: () => dispatch(actions.initDevicesWithTeleProps()),
    onInitDevicesWithTelePropsDetails: (payload) => dispatch(actions.initDevicesWithTelePropsDetails(payload))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Trends);
