import React, { Component } from 'react';
import Grid from "@material-ui/core/Grid";
import CancelIcon from "@material-ui/icons/Cancel";

import Input from "../../../UI/Input/Input";
import Button from "../../../UI/Button/Button";
import { FormInputModel } from "../../../../interfaceModels/FormInputModel";
import { FormDropdownModel } from "../../../../interfaceModels/FormDropdownModel";
import PropertySelectors from '../PropertySelectors/PropertySelectors';
import TrendComparisons from '../TrendComparisons/TrendComparisons';

interface TrendPropertiesProps { }

interface TrendPropertiesState {
  formIsValid: boolean;
  trendPropertyList: any;
  trendPropertiesForm: {
    // whereProperty: FormInputModel;
    measure: FormDropdownModel;
    // splityBy: FormDropdownModel;
  },
  trendInfo: any;
}

interface FormElement {
  id: string;
  config: any;
}

let temperatureTrend = new Array;
let pressureTrend = new Array;
let humidityTrend = new Array;

let temperatureValue = 1;
let pressureValue = 10;
let humidityValue = 54;

for (let i = 1; i <= 100; i++) {
  temperatureValue += Math.round((Math.random() < 0.5 ? 1 : -1) * Math.random() * 100);
  pressureValue += Math.round((Math.random() < 0.5 ? 1 : -1) * Math.random() * 100);
  humidityValue += Math.round((Math.random() < 0.5 ? 1 : -1) * Math.random() * 100);
  let newDate = new Date(2019, 1, i);
  temperatureTrend.push({ date: newDate, temperature: temperatureValue });
  pressureTrend.push({ date: newDate, pressure: pressureValue });
  humidityTrend.push({ date: newDate, humidity: humidityValue });
}

class TrendProperties extends Component<TrendPropertiesProps, TrendPropertiesState> {

  constructor(props: TrendPropertiesProps) {
    super(props);
    this.state = {
      formIsValid: false,
      trendPropertyList: [],
      trendInfo: [],
      trendPropertiesForm: {
        // whereProperty: {
        //   elementType: "input",
        //   elementConfig: {
        //     label: "WHERE"
        //   },
        //   value: "",
        //   validation: {
        //     required: false
        //   },
        //   valid: false,
        //   touched: false
        // },
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
        },
        // splityBy: {
        //   elementType: "dropdown",
        //   elementConfig: {
        //     label: "SPLIT BY",
        //     options: ["temperature", "pressure", "humidity"]
        //   },
        //   value: "",
        //   validation: {
        //     required: true
        //   },
        //   valid: false,
        //   touched: false
        // }
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
    const propertyList = this.state.trendPropertiesForm.measure.value;
    if (!updatedPropertyList.includes(propertyList) && propertyList !== "") {
      updatedPropertyList.push(propertyList);
    }
    this.updateTrendPropertyListState(updatedPropertyList);
  }

  deletePropertySelector = (property) => {
    const updatedPropertyList = [...this.state.trendPropertyList];
    const index = updatedPropertyList.indexOf(property);
    if (index > -1) {
      updatedPropertyList.splice(index, 1);
    }
    this.updateTrendPropertyListState(updatedPropertyList);
  }

  private updateTrendPropertyListState = (list) => {
    this.setState({
      trendPropertyList: [...list]
    }, () => {
      let newTrendInfo = new Array;
      for (let i = 0; i < temperatureTrend.length; i++) {
        newTrendInfo.push({ date: temperatureTrend[i].date, temperature: null, humidity: null, pressure: null })
      }
      if (this.state.trendPropertyList.includes('temperature')) {
        for (let i = 0; i < newTrendInfo.length; i++) {
          newTrendInfo[i].temperature = temperatureTrend[i].temperature
        }
      }
      if (this.state.trendPropertyList.includes('humidity')) {
        for (let i = 0; i < newTrendInfo.length; i++) {
          newTrendInfo[i].humidity = humidityTrend[i].humidity
        }
      }
      if (this.state.trendPropertyList.includes('pressure')) {
        for (let i = 0; i < newTrendInfo.length; i++) {
          newTrendInfo[i].pressure = pressureTrend[i].pressure
        }
      }
      this.setState({
        trendInfo: [...newTrendInfo]
      })
    });
  }

  renderForm = () => {
    const formElementsArray: FormElement[] = [];
    for (let key in this.state.trendPropertiesForm) {
      const formElement: FormElement = {
        id: key,
        config: this.state.trendPropertiesForm[key]
      };
      formElementsArray.push(formElement);
    }

    let form = (
      <form>
        {formElementsArray.map(formElement => {
          return (
            <div key={formElement.id} style={{ margin: '15px 0' }}>
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
        <div>
          <Button btnType="default" disabled={false} clicked={this.updatePropertyList} width='100%'>
            Add
          </Button>
        </div>
      </form>
    );

    return form;
  };

  renderTrendComparisons = () => {

  }

  render() {
    return <div>
      <Grid container spacing={2}>
        <Grid item xs={2}>
          <div>
            <this.renderForm />
          </div>
          <div style={{ width: '100%' }}>
            <PropertySelectors propertyList={this.state.trendPropertyList} deletePropertySelector={this.deletePropertySelector} />
          </div>
        </Grid>
        <Grid item xs={10}>
          <TrendComparisons trendInfo={this.state.trendInfo} />
        </Grid>
      </Grid>
    </div>
  }
}

export default TrendProperties;
