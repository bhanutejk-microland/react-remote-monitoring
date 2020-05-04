import React, { Component } from 'react';
import Grid from "@material-ui/core/Grid";
import { connect } from 'react-redux';

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
  formIsValid: boolean;
  trendsInfo: Array<any>;
  deviceTeleProps: Array<any>;
  trendTelemetryForm: any;
}

interface FormElement {
  id: string;
  config: any;
}

class Trends extends Component<TrendsProps, TrendsState> {

  constructor(props: TrendsProps) {
    super(props);
    this.state = {
      deviceTeleProps: [],
      formIsValid: false,
      trendPropertyList: [],
      trendsInfo: [],
      trendTelemetryForm: {
        devices: {
          elementType: "dropdown",
          elementConfig: {
            label: "DEVICES",
            options: []
          },
          value: "",
          validation: {
            required: true
          },
          valid: false,
          touched: false
        },
        measures: {
          elementType: "dropdown",
          elementConfig: {
            label: "MEASURES",
            options: []
          },
          value: "",
          validation: {
            required: true
          },
          valid: false,
          touched: false
        }
      }
    }
  }

  componentDidMount() {
    this.props.onInitDevicesWithTeleProps();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.devicesWithTeleProps !== this.props.devicesWithTeleProps) {
      this.devicesTelePropsComponentForm();
    }
  }

  private updatePropertyListState = (selectedDevice, selectedMeasure, updatedPropertyList) => {
    const deviseMeasures = [selectedMeasure];
    updatedPropertyList.push({
      deviceName: selectedDevice,
      deviceMeasures: [...deviseMeasures]
    });
    this.setState({
      trendPropertyList: [...updatedPropertyList],
    }, () => {
      this.props.onInitDevicesWithTelePropsDetails(this.state.trendPropertyList);
    })
  }

  private updateTrendPropertyListState = (propertyHirc) => {
    let updatedPropertyList = [...this.state.trendPropertyList];
    updatedPropertyList = updatedPropertyList.filter(function (obj) {
      return obj.deviceName !== propertyHirc[0];
    });
    this.setState({
      trendPropertyList: [...updatedPropertyList]
    }, () => {
      this.props.onInitDevicesWithTelePropsDetails(this.state.trendPropertyList);
    })
  }

  updatePropertyList = () => {
    const selectedDevice = this.state.trendTelemetryForm.devices.value;
    const selectedMeasure = this.state.trendTelemetryForm.measures.value;
    const updatedPropertyList = [...this.state.trendPropertyList];
    const deviceObj = updatedPropertyList.find(({ deviceName }) => deviceName === selectedDevice);
    if (updatedPropertyList.length === 0 || deviceObj === undefined) {
      this.updatePropertyListState(selectedDevice, selectedMeasure, updatedPropertyList);
    } else {
      const deviceMeasures = [...deviceObj.deviceMeasures];
      if (!deviceMeasures.includes(selectedMeasure)) {
        deviceObj.deviceMeasures.push(selectedMeasure);
        this.setState(prevState => ({
          trendPropertyList: prevState.trendPropertyList.map(
            obj => (obj.divceName === selectedDevice ? Object.assign(obj, { deviceMesures: [...deviceObj.deviceMesures] }) : obj)
          )
        }), () => {
          this.props.onInitDevicesWithTelePropsDetails(this.state.trendPropertyList);
        });
      }
    }
  }

  inputChangedHandler = (event, inputIdentifier) => {
    const updatedTrendPropertiesForm = {
      ...this.state.trendTelemetryForm
    };
    const updatedFormElement = {
      ...updatedTrendPropertiesForm[inputIdentifier]
    };
    updatedFormElement.value = event.target.value;
    updatedFormElement.valid = this.checkValidity(
      updatedFormElement.value,
      updatedFormElement.validation
    );
    updatedFormElement.touched = true;
    updatedTrendPropertiesForm[inputIdentifier] = updatedFormElement;
    let formIsValid = true;
    for (let inputIdentifier in updatedTrendPropertiesForm) {
      formIsValid = updatedTrendPropertiesForm[inputIdentifier].valid && formIsValid;
    }

    if (inputIdentifier === 'devices') {
      let updatedDeviceTeleProps = new Array();
      this.props.devicesWithTeleProps.map((tProp) => {
        if (tProp.assetId === event.target.value) {
          updatedDeviceTeleProps = [...tProp.teleProps];
        }
      })
      this.setState({
        trendTelemetryForm: updatedTrendPropertiesForm,
        formIsValid: formIsValid,
        deviceTeleProps: [...updatedDeviceTeleProps]
      });
    }

    this.setState({
      trendTelemetryForm: updatedTrendPropertiesForm,
      formIsValid: formIsValid
    });
  };

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

  deletePropertySelector = (property) => {
    const propertyHirc = property.split(",");
    if (propertyHirc.length > 1) {
      const trenPropertyObj = this.state.trendPropertyList.find(({ deviceName }) => deviceName === propertyHirc[0]);
      let updatedDeviceMesures = [...trenPropertyObj.deviceMeasures];
      updatedDeviceMesures = updatedDeviceMesures.filter((property) => {
        return property !== propertyHirc[1]
      });
      if (updatedDeviceMesures.length === 0) {
        this.updateTrendPropertyListState(propertyHirc);
      } else {
        this.setState(prevState => ({
          trendPropertyList: prevState.trendPropertyList.map(
            obj => (obj.deviceName === propertyHirc[0] ? Object.assign(obj, { deviceMeasures: [...updatedDeviceMesures] }) : obj)
          )
        }), () => {
          this.props.onInitDevicesWithTelePropsDetails(this.state.trendPropertyList);
        });
      }
    } else {
      this.updateTrendPropertyListState(propertyHirc);
    }
  }

  devicesTelePropsComponentForm = () => {
    const formElementsArray: FormElement[] = [];
    for (let key in this.state.trendTelemetryForm) {
      const formElement: FormElement = {
        id: key,
        config: this.state.trendTelemetryForm[key]
      };
      formElementsArray.push(formElement);
    }

    let form = (
      <form className={classes.PropertyForm}>
        {formElementsArray.map(formElement => {
          let options = new Array;
          if (formElement.config.elementConfig.label === 'DEVICES') {
            options = this.props.devicesWithTeleProps.map((device) => { return device.assetId })
          } else {
            options = [...this.state.deviceTeleProps]
          }
          return (
            <div key={formElement.id} style={{ margin: '15px', width: '100%' }}>
              <Input
                elementType={formElement.config.elementType}
                elementConfig={formElement.config.elementConfig}
                value={formElement.config.value}
                invalid={!formElement.config.valid}
                shouldValidate={formElement.config.validation}
                touched={formElement.config.touched}
                options={options}
                changed={event =>
                  this.inputChangedHandler(event, formElement.id)
                }
              />
            </div>
          );
        })}
        <div style={{ padding: '25px', width: '50px' }}>
          <Button btnType="primary" disabled={!this.state.formIsValid} clicked={this.updatePropertyList} width='100%'>
            Add
          </Button>
        </div>
      </form>
    );

    return form;
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
        <this.devicesTelePropsComponentForm />
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
