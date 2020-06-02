import React, { Component } from "react";
import { connect } from "react-redux";
import CancelIcon from "@material-ui/icons/Cancel";
import FilterListIcon from "@material-ui/icons/FilterList";

import Input from "../../components/UI/Input/Input";
import Button from "../../components/UI/Button/Button";
import classes from "./Trends.css";
import { TrendsFilterFormModel } from '../../interfaceModels/TrendsFilterFormModel';
import { FormInputModel } from "../../interfaceModels/FormInputModel";
import * as actions from '../../store/actions/index';

interface TrendsFilterProps {
  cancleForm: (event?: any) => void;
  onAppliedTrendsFilter: (appliedFilterData: any) => void;
}

interface TrendsFilterState {
  filterForm: TrendsFilterFormModel;
  formIsValid: boolean;
}

interface FormElement {
  id: string;
  config: FormInputModel;
}

class TrendsFilter extends Component<TrendsFilterProps, TrendsFilterState> {
  constructor(props: TrendsFilterProps) {
    super(props);
    this.state = {
      formIsValid: false,
      filterForm: {
        timePeriod: {
          elementType: "dropdown",
          elementConfig: {
            label: "TIME PERIOD",
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
    this.props.onAppliedTrendsFilter(this.state.filterForm);
    this.props.cancleForm();
  }

  getSelectOptions = (elementName) => {
    if (elementName === 'timePeriod') {
      return ['Last 1 hour', 'Last 6 hours', 'Last 24 hours', 'Last 1 week', 'Last 1 month'];
    }
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
          const selectOptions = this.getSelectOptions(formElement.id);
          return (
            <div key={formElement.id} className={classes.FilterFormContent}>
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
  return {
    appliedFilterData: state.trendsFilterDataState.trendsFilterData
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onAppliedTrendsFilter: (appliedFilterData) => dispatch(actions.initTrendsFilter(appliedFilterData))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TrendsFilter);
