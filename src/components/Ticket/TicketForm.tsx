import React, { Component } from "react";
import SaveIcon from "@material-ui/icons/Save";
import CancelIcon from "@material-ui/icons/Cancel";

import Input from "../UI/Input/Input";
import Button from "../UI/Button/Button";
import classes from "./TicketForm.css";
import { TicketFormModel } from "../../interfaceModels/TicketFormModel";
import { FormInputModel } from "../../interfaceModels/FormInputModel";

interface TicketFormState {
  ticketForm: TicketFormModel;
  formIsValid: boolean;
}

interface TicketFormProps { }

interface FormElement {
  id: string;
  config: FormInputModel;
}

class TicketForm extends Component<TicketFormProps, TicketFormState> {
  constructor(props: TicketFormProps) {
    super(props);
    this.state = {
      formIsValid: false,
      ticketForm: {
        ticketDescription: {
          elementType: "input",
          elementConfig: {
            label: "Ticket Description"
          },
          value: "",
          validation: {
            required: true
          },
          valid: false,
          touched: false
        },
        createdBy: {
          elementType: "input",
          elementConfig: {
            label: "Created By"
          },
          value: "",
          validation: {
            required: true
          },
          valid: false,
          touched: false
        },
        status: {
          elementType: "input",
          elementConfig: {
            label: "Status"
          },
          value: "",
          validation: {
            required: true
          },
          valid: false,
          touched: false
        },
        createdAt: {
          elementType: "",
          elementConfig: {
            label: "Created At"
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
    const updatedTicketForm = {
      ...this.state.ticketForm
    };
    const updatedFormElement = {
      ...updatedTicketForm[inputIdentifier]
    };
    updatedFormElement.value = event.target.value;
    updatedFormElement.valid = this.checkValidity(
      updatedFormElement.value,
      updatedFormElement.validation
    );
    updatedFormElement.touched = true;
    updatedTicketForm[inputIdentifier] = updatedFormElement;
    let formIsValid = true;
    for (let inputIdentifier in updatedTicketForm) {
      formIsValid = updatedTicketForm[inputIdentifier].valid && formIsValid;
    }
    this.setState({
      ticketForm: updatedTicketForm,
      formIsValid: formIsValid
    });
  };

  renderForm = () => {
    const formElementsArray: FormElement[] = [];
    for (let key in this.state.ticketForm) {
      const formElement: FormElement = {
        id: key,
        config: this.state.ticketForm[key]
      };
      formElementsArray.push(formElement);
    }

    let form = (
      <form className={classes.TicketFormContainer}>
        {formElementsArray.map(formElement => {
          return (
            <div key={formElement.id} className={classes.TicketFormContent}>
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
          <Button btnType="default" disabled={false} icon={<CancelIcon />}>
            CANCEL
          </Button>
          <Button
            btnType="primary"
            disabled={!this.state.formIsValid}
            icon={<SaveIcon />}
          >
            CREATE
          </Button>
        </div>
      </form>
    );

    return form;
  };

  render() {
    return (
      <div>
        <div className={classes.HeaderForRightDrawer}>Create Ticket</div>
        <this.renderForm />
      </div>
    );
  }
}

export default TicketForm;
