import React, { Component } from 'react';
import Grid from "@material-ui/core/Grid";

import Input from "../../components/UI/Input/Input";
import Button from "../../components/UI/Button/Button";
import Chip from '../../components/UI/Chip/Chip';
import MultiLineChart from '../../components/Charts/MultiLineChart';
import classes from './Trends.css';

interface TrendsProps {

}

interface TrendsState {
  trendPropertyList: Array<any>;
  trendPropertiesForm: any;
  formIsValid: Boolean;
  trendsInfo: Array<any>;
}

interface FormElement {
  id: string;
  config: any;
}

const trendsData = {
  "MLChiller-001": {
    "temperature": [
      { device: "temperature", date: new Date(2018, 0, 1), value: 450 },
      { device: "temperature", date: new Date(2018, 0, 2), value: 269 },
      { device: "temperature", date: new Date(2018, 0, 3), value: 700 }
    ],
    "pressure": [
      { device: "pressure", date: new Date(2018, 0, 1), value: 362 },
      { device: "pressure", date: new Date(2018, 0, 2), value: 450 },
      { device: "pressure", date: new Date(2018, 0, 3), value: 358 }
    ],
    "humidity": [
      { device: "humidity", date: new Date(2018, 0, 1), value: 699 },
      { device: "humidity", date: new Date(2018, 0, 2), value: 841 },
      { device: "humidity", date: new Date(2018, 0, 3), value: 698 }
    ]
  },
  "MLChiller-002": {
    "temperature": [
      { device: "temperature", date: new Date(2018, 0, 1), value: 362 },
      { device: "temperature", date: new Date(2018, 0, 2), value: 450 },
      { device: "temperature", date: new Date(2018, 0, 3), value: 700 }
    ],
    "pressure": [
      { device: "pressure", date: new Date(2018, 0, 1), value: 450 },
      { device: "pressure", date: new Date(2018, 0, 2), value: 269 },
      { device: "pressure", date: new Date(2018, 0, 3), value: 358 }
    ],
    "humidity": [
      { device: "humidity", date: new Date(2018, 0, 1), value: 699 },
      { device: "humidity", date: new Date(2018, 0, 2), value: 841 },
      { device: "humidity", date: new Date(2018, 0, 3), value: 698 }
    ]
  },
  "MLChiller-003": {
    "temperature": [
      { device: "temperature", date: new Date(2018, 0, 1), value: 362 },
      { device: "temperature", date: new Date(2018, 0, 2), value: 450 },
      { device: "temperature", date: new Date(2018, 0, 3), value: 700 }
    ],
    "pressure": [
      { device: "pressure", date: new Date(2018, 0, 1), value: 450 },
      { device: "pressure", date: new Date(2018, 0, 2), value: 269 },
      { device: "pressure", date: new Date(2018, 0, 3), value: 358 }
    ],
    "humidity": [
      { device: "humidity", date: new Date(2018, 0, 1), value: 699 },
      { device: "humidity", date: new Date(2018, 0, 2), value: 841 },
      { device: "humidity", date: new Date(2018, 0, 3), value: 300 }
    ]
  }
}

class Trends extends Component<TrendsProps, TrendsState> {

  constructor(props: TrendsProps) {
    super(props);
    this.state = {
      formIsValid: false,
      trendPropertyList: [],
      trendsInfo: [],
      trendPropertiesForm: {
        deviceList: {
          elementType: "dropdown",
          elementConfig: {
            label: "DEVICES",
            options: ["MLChiller-001", "MLChiller-002", "MLChiller-003"]
          },
          value: "",
          validation: {
            required: true
          },
          valid: false,
          touched: false
        },
        measure: {
          elementType: "dropdown",
          elementConfig: {
            label: "MEASURE",
            options: ["temperature", "pressure", "humidity"]
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

  inputChangedHandler = (event, inputIdentifier) => {
    const updatedTrendPropertiesForm = {
      ...this.state.trendPropertiesForm
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
    this.setState({
      trendPropertiesForm: updatedTrendPropertiesForm,
      formIsValid: formIsValid
    });
  };

  updatePropertyList = () => {
    const updatedPropertyList = [...this.state.trendPropertyList];
    const updatedTrendsInfo = [...this.state.trendsInfo];
    if (updatedPropertyList.length === 0) {
      const deviseMeasures = [this.state.trendPropertiesForm.measure.value];
      const deviceTrends = [...trendsData[this.state.trendPropertiesForm.deviceList.value][this.state.trendPropertiesForm.measure.value]];
      updatedTrendsInfo.push({
        deviceName: this.state.trendPropertiesForm.deviceList.value,
        deviceTrends: [...deviceTrends]
      })
      updatedPropertyList.push({
        deviceName: this.state.trendPropertiesForm.deviceList.value,
        deviceMeasures: [...deviseMeasures]
      });
      this.setState({
        trendPropertyList: [...updatedPropertyList],
        trendsInfo: [...updatedTrendsInfo]
      })
    } else {
      const divceName = this.state.trendPropertiesForm.deviceList.value;
      const deviceObj = updatedPropertyList.find(({ deviceName }) => deviceName === divceName);
      const trendObj = updatedTrendsInfo.find(({ deviceName }) => deviceName === divceName);
      if (deviceObj === undefined) {
        const deviseMeasures = [this.state.trendPropertiesForm.measure.value];
        const deviceTrends = [...trendsData[this.state.trendPropertiesForm.deviceList.value][this.state.trendPropertiesForm.measure.value]];
        updatedTrendsInfo.push({
          deviceName: this.state.trendPropertiesForm.deviceList.value,
          deviceTrends: [...deviceTrends]
        })
        updatedPropertyList.push({
          deviceName: this.state.trendPropertiesForm.deviceList.value,
          deviceMeasures: [...deviseMeasures]
        })
        this.setState({
          trendPropertyList: [...updatedPropertyList],
          trendsInfo: [...updatedTrendsInfo]
        })
      } else {
        const deviceMeasures = [...deviceObj.deviceMeasures];
        let updatedDeviceTrends = [...trendObj.deviceTrends];
        const deviceMeasure = this.state.trendPropertiesForm.measure.value;
        if (!deviceMeasures.includes(deviceMeasure)) {
          updatedDeviceTrends = [...updatedDeviceTrends, ...trendsData[this.state.trendPropertiesForm.deviceList.value][this.state.trendPropertiesForm.measure.value]]
          deviceObj.deviceMeasures.push(deviceMeasure);
          this.setState(prevState => ({
            trendPropertyList: prevState.trendPropertyList.map(
              obj => (obj.divceName === divceName ? Object.assign(obj, { deviceMesures: [...deviceObj.deviceMesures] }) : obj)
            ),
            trendsInfo: prevState.trendsInfo.map(
              obj => (obj.deviceName === divceName ? Object.assign(obj, { deviceTrends: [...updatedDeviceTrends] }) : obj)
            )
          }));
        }
      }
    }
  }

  renderAddedRulesFilterForm = () => {
    const formElementsArray: FormElement[] = [];
    for (let key in this.state.trendPropertiesForm) {
      const formElement: FormElement = {
        id: key,
        config: this.state.trendPropertiesForm[key]
      };
      formElementsArray.push(formElement);
    }

    let form = (
      <form className={classes.PropertyForm}>
        {formElementsArray.map(formElement => {
          return (
            <div key={formElement.id} style={{ margin: '15px', width: '100%' }}>
              <Input
                elementType={formElement.config.elementType}
                elementConfig={formElement.config.elementConfig}
                value={formElement.config.value}
                invalid={!formElement.config.valid}
                shouldValidate={formElement.config.validation}
                touched={formElement.config.touched}
                changed={event =>
                  this.inputChangedHandler(event, formElement.id)
                }
              />
            </div>
          );
        })}
        <div style={{ padding: '25px', width: '50px' }}>
          <Button btnType="default" disabled={false} clicked={this.updatePropertyList} width='100%'>
            Add
          </Button>
        </div>
      </form>
    );

    return form;
  }

  deletePropertySelector = (property) => {
    const propertyHirc = property.split(",");
    if (propertyHirc.length > 1) {
      const trenPropertyObj = this.state.trendPropertyList.find(({ deviceName }) => deviceName === propertyHirc[0]);
      const trendsDataObj = this.state.trendsInfo.find(({ deviceName }) => deviceName === propertyHirc[0]);
      let updatedDeviceTrends = [...trendsDataObj.deviceTrends];
      let updatedDeviceMesures = [...trenPropertyObj.deviceMeasures];
      updatedDeviceMesures = updatedDeviceMesures.filter((property) => {
        return property !== propertyHirc[1]
      });
      updatedDeviceTrends = updatedDeviceTrends.filter((property) => {
        return property.device !== propertyHirc[1]
      });
      if (updatedDeviceMesures.length === 0) {
        let updatedPropertyList = [...this.state.trendPropertyList];
        let updatedTrendsList = [...this.state.trendsInfo];
        updatedPropertyList = updatedPropertyList.filter(function (obj) {
          return obj.deviceName !== propertyHirc[0];
        });
        updatedTrendsList = updatedTrendsList.filter(function (obj) {
          return obj.deviceName !== propertyHirc[0];
        });
        this.setState({
          trendPropertyList: [...updatedPropertyList],
          trendsInfo: [...updatedTrendsList]
        })
      } else {
        this.setState(prevState => ({
          trendPropertyList: prevState.trendPropertyList.map(
            obj => (obj.deviceName === propertyHirc[0] ? Object.assign(obj, { deviceMeasures: [...updatedDeviceMesures] }) : obj)
          ),
          trendsInfo: prevState.trendsInfo.map(
            obj => (obj.deviceName === propertyHirc[0] ? Object.assign(obj, { deviceTrends: [...updatedDeviceTrends] }) : obj)
          )
        }));
      }
    } else {
      let updatedPropertyList = [...this.state.trendPropertyList];
      let updatedTrendsList = [...this.state.trendsInfo];
      updatedPropertyList = updatedPropertyList.filter(function (obj) {
        return obj.deviceName !== propertyHirc[0];
      });
      updatedTrendsList = updatedTrendsList.filter(function (obj) {
        return obj.deviceName !== propertyHirc[0];
      });
      this.setState({
        trendPropertyList: [...updatedPropertyList],
        trendsInfo: [...updatedTrendsList]
      })
    }
    // const updatedPropertyList = [...this.state.trendPropertyList];
    // const index = updatedPropertyList.indexOf(property);
    // if (index > -1) {
    //   updatedPropertyList.splice(index, 1);
    // }
    // const payload = {
    //   deviceId: this.props.match.params.assetId || '',
    //   messures: updatedPropertyList
    // }
    // this.props.onInitTrends(payload);
    // this.updateTrendPropertyListState(updatedPropertyList);
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
          {this.state.trendsInfo.length > 0 ?
            this.state.trendsInfo.map((deviceTrend, index) => {
              return <MultiLineChart
                ket={deviceTrend.deviceName + index}
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
        <this.renderAddedRulesFilterForm />
        <this.renderRulesListAndComparisonCharts />
      </div>
    )
  }
}

export default Trends;
