import React, { Component } from 'react';
import Grid from "@material-ui/core/Grid";
import CancelIcon from "@material-ui/icons/Cancel";
import { withRouter } from "react-router";
import { connect } from 'react-redux';

import Input from "../../../UI/Input/Input";
import Button from "../../../UI/Button/Button";
import { FormInputModel } from "../../../../interfaceModels/FormInputModel";
import { FormDropdownModel } from "../../../../interfaceModels/FormDropdownModel";
import PropertySelectors from '../PropertySelectors/PropertySelectors';
import TrendComparisons from '../TrendComparisons/TrendComparisons';
import axios from '../../../../axios';
import * as actions from '../../../../store/actions/index';

interface TrendPropertiesProps {
  match: any;
  onInitTrends: (payload: any) => void;
  onInitAssetIndividualTeleProps: (assetId: any) => void;
  onInitAssetIndividualTeleDetails: (assetTrendDetails: any) => void;
  onInitAssetDetailsAppliedDateFilter: (appliedDateFilter: any) => void;
  trendInfo: any;
  teleProps: any;
  trendTeleValues: any;
  appliedFilterDate: any;
}

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

class TrendProperties extends Component<TrendPropertiesProps, TrendPropertiesState> {

  constructor(props: TrendPropertiesProps) {
    super(props);
    this.state = {
      formIsValid: false,
      trendPropertyList: [],
      trendInfo: [],
      trendPropertiesForm: {
        measure: {
          elementType: "dropdown",
          elementConfig: {
            label: "MEASURE",
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
    const currentAssetId = this.props.match.params.assetId;
    this.props.onInitAssetIndividualTeleProps(currentAssetId);
  }

  componentDidUpdate(prevProps) {
    if (this.props.appliedFilterDate.fromTimestamp !== prevProps.appliedFilterDate.fromTimestamp ||
      this.props.appliedFilterDate.toTimestamp !== prevProps.appliedFilterDate.toTimestamp) {
      this.handleToGetIndividualTeleDetails();
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
    if (inputIdentifier === 'applyFilter') {
      this.props.onInitAssetDetailsAppliedDateFilter(event.target.value);
    }
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
    //========
    const payload = {
      deviceId: this.props.match.params.assetId || '',
      messures: updatedPropertyList
    }
    // this.props.onInitTrends(payload);
  }

  deletePropertySelector = (property) => {
    const updatedPropertyList = [...this.state.trendPropertyList];
    const index = updatedPropertyList.indexOf(property);
    if (index > -1) {
      updatedPropertyList.splice(index, 1);
    }
    const payload = {
      deviceId: this.props.match.params.assetId || '',
      messures: updatedPropertyList
    }
    // this.props.onInitTrends(payload);
    this.updateTrendPropertyListState(updatedPropertyList);
  }

  private updateTrendPropertyListState = (list) => {
    this.setState({
      trendPropertyList: [...list]
    }, () => {
      this.handleToGetIndividualTeleDetails();
    });
  }

  handleToGetIndividualTeleDetails = () => {
    const defaultTimestamp = new Date();
    const yesterdayTimeStamp = Math.floor(defaultTimestamp.setDate(defaultTimestamp.getDate() - 1));
    const fromTimeStamp = this.props.appliedFilterDate.fromTimestamp !== '' ? new Date(this.props.appliedFilterDate.fromTimestamp).getTime() : yesterdayTimeStamp;
    const toTimeStamp = this.props.appliedFilterDate.toTimestamp !== '' ? new Date(this.props.appliedFilterDate.toTimestamp).getTime() : new Date().getTime();
    const assetTrendDetails = {
      assetId: this.props.match.params.assetId,
      teleProps: [...this.state.trendPropertyList],
      fromTimeStamp,
      toTimeStamp
    }
    this.props.onInitAssetIndividualTeleDetails(assetTrendDetails);
  }

  getSelectOptions = (elementName) => {
    if (elementName === 'measure') {
      return Object.keys(this.props.teleProps);
    }
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
          const selectOptions = this.getSelectOptions(formElement.id);
          return (
            <div key={formElement.id} style={{ margin: '15px 0' }}>
              <Input
                elementType={formElement.config.elementType}
                elementConfig={formElement.config.elementConfig}
                value={formElement.config.value}
                invalid={!formElement.config.valid}
                shouldValidate={formElement.config.validation}
                touched={formElement.config.touched}
                options={selectOptions}
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
          <TrendComparisons trendInfo={this.props.trendTeleValues} />
        </Grid>
      </Grid>
    </div>
  }
}

const mapStateToProps = state => {
  return {
    trendInfo: state.trendsInfo.trends,
    teleProps: state.assetTrenTelemetrics.teleProps,
    trendTeleValues: state.assetTrenTeleDetails.trendTeleValues,
    appliedFilterDate: state.assetDetailsDateFilter.appliedFilterDate
  };
}

const mapDispatchToProps = dispatch => {
  return {
    onInitTrends: (payload) => dispatch(actions.initTrends(payload)),
    onInitAssetIndividualTeleProps: (assetId) => dispatch(actions.initAssetIndividualTeleProps(assetId)),
    onInitAssetIndividualTeleDetails: (assetTrendDetails) => dispatch(actions.initAssetIndividualTeleDetails(assetTrendDetails)),
    onInitAssetDetailsAppliedDateFilter: (appliedDateFilter) => dispatch(actions.initAssetDetailsAppliedDateFilter(appliedDateFilter))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(TrendProperties));
