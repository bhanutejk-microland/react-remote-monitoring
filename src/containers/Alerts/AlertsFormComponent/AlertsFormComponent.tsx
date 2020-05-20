import React, { Component } from "react";
import { connect } from "react-redux";
import CancelIcon from "@material-ui/icons/Cancel";
import FilterListIcon from "@material-ui/icons/FilterList";

import Input from "../../../components/UI/Input/Input";
import Button from "../../../components/UI/Button/Button";
import classes from "./AlertsFormComponent.css";
import { AlertFormModel } from '../../../interfaceModels/AlertFormModel';
import { FormInputModel } from "../../../interfaceModels/FormInputModel";
import * as actions from '../../../store/actions/index';

interface AlertsFormDataProps { 
  cancleForm: (event: any) => void;
  updateAlertFormData: (alertFormData:any) => void;
  alertFormData: any;
  closeDrawer(status: any): any;
}

interface AlertsFormDataState {
  alertForm: AlertFormModel;
  formIsValid: boolean;
}

interface FormElement {
  id: string;
  config: FormInputModel;
}


class AlertsFormComponent extends Component<AlertsFormDataProps, AlertsFormDataState> {
  constructor(props: AlertsFormDataProps) {
    super(props);
    this.state = {
      formIsValid: false,
      alertForm: {
        assetId: {
          elementType: "input",
          elementConfig: {
            label: "Asset Id"
          },
          value: "",
          validation: {
            required: true
          },
          valid: true,
          touched: false,
        },
        alertDate: {
          elementType: "input",
          elementConfig: {
            label: "Alert Date"
          },
          value: "",
          validation: {
            required: true
          },
          valid: true,
          touched: false
        },
        alertDescription: {
          elementType: "input",
          elementConfig: {
            label: "Alert Description"
          },
          value: "",
          validation: {
            required: true
          },
          valid: true,
          touched: false
        },
        alertSeveriy: {
          elementType: "input",
          elementConfig: {
            label: "Alert Severity"
          },
          value: "",
          validation: {
            required: true
          },
          valid: true,
          touched: false
        },
        alertStatus: {
          elementType: "input",
          elementConfig: {
            label: "Alert Status"
          },
          value: "",
          validation: {
            required: true
          },
          valid: true,
          touched: false
        },
        updateStatus: {
          elementType: "dropdown",
          elementConfig: {
            label: "Update Status",
            options: ["Open","Closed","Work in progress"]
          },
          value: "",
          validation: {
            required: true
          },
          valid: false,
          touched: false
        },
        remark: {
          elementType: "input",
          elementConfig: {
            label: "Remark"
          },
          value: "",
          validation: {
            required: true
          },
          valid: false,
          touched: false
        },
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
    const updatedAlertForm = {
      ...this.state.alertForm
    };
    const updatedFormElement = {
      ...updatedAlertForm[inputIdentifier]
    };
    updatedFormElement.value = event.target.value;
    updatedFormElement.valid = this.checkValidity(
      updatedFormElement.value,
      updatedFormElement.validation
    );
    updatedFormElement.touched = true;
    updatedAlertForm[inputIdentifier] = updatedFormElement;
    let formIsValid = true;
    for (let inputIdentifier in updatedAlertForm) {
      formIsValid = updatedAlertForm[inputIdentifier].valid && formIsValid;
    }
    this.setState({
      alertForm: updatedAlertForm,
      formIsValid: formIsValid
    });
  };

  updateAlertFormData = () => {
    this.setState(prevState => ({
      formIsValid: !prevState.formIsValid
    }));
    let updateDateTime = new Date();
    const newAlertFormData = {      
      modified: Date.parse(updateDateTime.toString()),
      description: this.props.alertFormData["alertDescription"],
      severity: this.props.alertFormData["alertSeveriy"],
      assetId: this.props.alertFormData["assetId"],
      remarks: this.state.alertForm.remark.value,
      status: this.state.alertForm.updateStatus.value,
      id: this.props.alertFormData["alertId"],
      PartitionId: this.props.alertFormData["PartitionId"]
    }
    this.props.updateAlertFormData(newAlertFormData);
    this.props.closeDrawer([200, "Alert updated successfully!"]);
  }

  renderForm = () => {
    const formElementsArray: FormElement[] = [];
    for (let key in this.state.alertForm) {
      const formElement: FormElement = {
        id: key,
        config: this.state.alertForm[key]
      };
      formElementsArray.push(formElement);
    }
    let form = (
      <form className={classes.FilterFormContainer}>
        {formElementsArray.map(formElement => {
          let existingFormvalue = this.props.alertFormData[formElement.id];
          return (            
            formElement.config.elementType === 'input' ?
            <div key={formElement.id} className={classes.FilterFormContent}>
              <Input
                elementType={formElement.config.elementType}
                elementConfig={formElement.config.elementConfig}
                value={existingFormvalue !== '' ? existingFormvalue : formElement.config.value}
                invalid={!formElement.config.valid}
                shouldValidate={formElement.config.validation}
                touched={formElement.config.touched}
                changed={event =>
                  this.inputChangedHandler(event, formElement.id)
                }
              />
            </div> 
            :
            <div key={formElement.id} className={classes.FilterFormContent}>
              <Input
                elementType={formElement.config.elementType}
                elementConfig={formElement.config.elementConfig}
                value={formElement.config.value}
                invalid={!formElement.config.valid}
                shouldValidate={formElement.config.validation}
                touched={formElement.config.touched}
                options = {this.state.alertForm[formElement.id].elementConfig.options}
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
            clicked={this.updateAlertFormData}
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
        <div className={classes.HeaderForRightDrawer}>Alerts</div>
        <this.renderForm />
      </div>
    );
  }
}

export default AlertsFormComponent;
