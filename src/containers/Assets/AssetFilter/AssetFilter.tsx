import React, { Component } from "react";
import { connect } from "react-redux";
import CancelIcon from "@material-ui/icons/Cancel";
import FilterListIcon from "@material-ui/icons/FilterList";

import Input from "../../../components/UI/Input/Input";
import Button from "../../../components/UI/Button/Button";
import classes from "./AssetFilter.css";
import { AssetFilterFormModel } from '../../../interfaceModels/AssetFilterFormModel';
import { FormInputModel } from "../../../interfaceModels/FormInputModel";
import * as actions from '../../../store/actions/index';

interface AssetFilterProps { 
  cancleForm: (event: any) => void;
  onAppliedFilterDate: (appliedFilterDate:any) => void;
}

interface AssetFilterState {
  filterForm: AssetFilterFormModel;
  formIsValid: boolean;
}

interface FormElement {
  id: string;
  config: FormInputModel;
}

class AssetFilter extends Component<AssetFilterProps, AssetFilterState> {
  constructor(props: AssetFilterProps) {
    super(props);
    this.state = {
      formIsValid: false,
      filterForm: {
        startDate: {
          elementType: "date",
          elementConfig: {
            label: "Start Date"
          },
          value: "",
          validation: {
            required: true
          },
          valid: false,
          touched: false
        },
        endDate: {
          elementType: "date",
          elementConfig: {
            label: "End Date"
          },
          value: "",
          validation: {
            required: true
          },
          valid: false,
          touched: false
        },
        // properties: {
        //   elementType: "dropdown",
        //   elementConfig: {
        //     label: "Properties",
        //     options: ["Temperature", "Pressure", "Options1"]
        //   },
        //   value: "",
        //   validation: {
        //     required: true
        //   },
        //   valid: false,
        //   touched: false
        // }
      }
    };
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
    const updatedFilterForm = {
      ...this.state.filterForm
    };
    const updatedFormElement = {
      ...updatedFilterForm[inputIdentifier]
    };
    updatedFormElement.value = event.target.value;
    updatedFormElement.valid = this.checkValidity(
      updatedFormElement.value,
      updatedFormElement.validation
    );
    updatedFormElement.touched = true;
    updatedFilterForm[inputIdentifier] = updatedFormElement;
    let formIsValid = true;
    for (let inputIdentifier in updatedFilterForm) {
      formIsValid = updatedFilterForm[inputIdentifier].valid && formIsValid;
    }
    this.setState({
      filterForm: updatedFilterForm,
      formIsValid: formIsValid
    });
  };

  addFilterHandler = () => {
    this.setState(prevState => ({
      formIsValid: !prevState.formIsValid
    }));
    const newAppliedFilterDate = {      
        fromTimestamp: this.state.filterForm.startDate.value,
        toTimestamp: this.state.filterForm.endDate.value
    }
    this.props.onAppliedFilterDate(newAppliedFilterDate);
  }

  renderForm = () => {
    const formElementsArray: FormElement[] = [];
    for (let key in this.state.filterForm) {
      const formElement: FormElement = {
        id: key,
        config: this.state.filterForm[key]
      };
      formElementsArray.push(formElement);
    }

    let form = (
      <form className={classes.FilterFormContainer}>
        {formElementsArray.map(formElement => {
          return (
            <div key={formElement.id} className={classes.FilterFormContent}>
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
        <div className={classes.BtnGroup}>
          <Button clicked={this.props.cancleForm} btnType="default" disabled={false} icon={<CancelIcon />}>
            CANCEL
          </Button>
          <Button
            btnType="primary"
            disabled={!this.state.formIsValid}
            icon={<FilterListIcon />}
            clicked={this.addFilterHandler}
          >
            Apply
          </Button>
        </div>
      </form>
    );

    return form;
  };

  render() {
    return (
      <div>
        <div className={classes.HeaderForRightDrawer}>Apply Filter</div>
        <this.renderForm />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return{
    appliedFilterDate : state.assetDetailsDateFilter.appliedFilterDate
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onAppliedFilterDate : (appliedFilterDate) => dispatch(actions.initAssetDetailsAppliedDateFilter(appliedFilterDate))
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(AssetFilter);
