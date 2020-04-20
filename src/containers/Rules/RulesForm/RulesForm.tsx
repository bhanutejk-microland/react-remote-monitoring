import React, { Component } from 'react';
import AddIcon from "@material-ui/icons/Add";
import CancelIcon from "@material-ui/icons/Cancel";

import { RulesFormModel } from '../../../interfaceModels/RulesFormModel';
import classes from './RulesForm.css';
import { FormInputModel } from '../../../interfaceModels/FormInputModel';
import Input from '../../../components/UI/Input/Input';
import Button from '../../../components/UI/Button/Button';
import axios from '../../../axios';
import { unixTimestampToDateTimeconverter } from '../../../utilities/timeStampConverter';

interface RulesFormProps { 
  closeDrawer(status: any): any;
  addToRulesList(rulesData: any): any;
}

interface RulesFormState {
  rulesForm: RulesFormModel;
  formIsValid: boolean;
}

interface FormElement {
  id: string;
  config: FormInputModel;
}

class RulesForm extends Component<RulesFormProps, RulesFormState> {
  constructor(props: RulesFormProps) {
    super(props);
    this.state = {
      formIsValid: false,
      rulesForm: {
        ruleName: {
          elementType: "input",
          elementConfig: {
            label: "Rule Name"
          },
          value: "",
          validation: {
            required: true
          },
          valid: false,
          touched: false
        },
        ruleDesciption: {
          elementType: "input",
          elementConfig: {
            label: "Rule Description"
          },
          value: "",
          validation: {
            required: true
          },
          valid: false,
          touched: false
        },
        deviceGroup: {
          elementType: "input",
          elementConfig: {
            label: "Device Group"
          },
          value: "",
          validation: {
            required: true
          },
          valid: false,
          touched: false
        },
        calculation: {
          elementType: "input",
          elementConfig: {
            label: "Calculation"
          },
          value: "",
          validation: {
            required: true
          },
          valid: false,
          touched: false
        },
        conditionField: {
          elementType: "input",
          elementConfig: {
            label: "Condition Field"
          },
          value: "",
          validation: {
            required: true
          },
          valid: false,
          touched: false
        },
        conditionOperator: {
          elementType: "input",
          elementConfig: {
            label: "Condition Operator"
          },
          value: "",
          validation: {
            required: true
          },
          valid: false,
          touched: false
        },
        conditionValue: {
          elementType: "input",
          elementConfig: {
            label: "Condition Value"
          },
          value: "",
          validation: {
            required: true
          },
          valid: false,
          touched: false
        },
        severityLevel: {
          elementType: "input",
          elementConfig: {
            label: "Severity Level"
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
    const updatedRulesForm = {
      ...this.state.rulesForm
    };
    const updatedFormElement = {
      ...updatedRulesForm[inputIdentifier]
    };
    updatedFormElement.value = event.target.value;
    updatedFormElement.valid = this.checkValidity(
      updatedFormElement.value,
      updatedFormElement.validation
    );
    updatedFormElement.touched = true;
    updatedRulesForm[inputIdentifier] = updatedFormElement;
    let formIsValid = true;
    for (let inputIdentifier in updatedRulesForm) {
      formIsValid = updatedRulesForm[inputIdentifier].valid && formIsValid;
    }
    this.setState({
      rulesForm: updatedRulesForm,
      formIsValid: formIsValid
    });
  };

  addRulesHandler = () => {
    this.setState(prevState => ({
      formIsValid: !prevState.formIsValid
    }));
    const rulesData = {
      configType: "rules",
      key: "default_Chiller_Temperature_High",
      Name: this.state.rulesForm.ruleName.value,
      Description: this.state.rulesForm.ruleDesciption.value,
      GroupId: this.state.rulesForm.deviceGroup.value,
      Severity: this.state.rulesForm.severityLevel.value,
      AggregationWindow: this.state.rulesForm.calculation.value,
      Fields: [this.state.rulesForm.conditionField.value]
    }
    axios.post("http://localhost:3000/api/rules/add", rulesData)
    .then(response => {
      if(response.status === 200){
        this.props.closeDrawer([200, "Rule added successfully!"]);
        const newRulesData = {
          ruleName: rulesData.Name,
          ruleDescription: rulesData.Description,
          deviceGroup: rulesData.GroupId,
          severityLevel: rulesData.Severity
        }
        this.props.addToRulesList(newRulesData)
      }
    });
  }

  renderForm = () => {
    const formElementsArray: FormElement[] = [];
    for (let key in this.state.rulesForm) {
      const formElement: FormElement = {
        id: key,
        config: this.state.rulesForm[key]
      };
      formElementsArray.push(formElement);
    }

    let form = (
      <form className={classes.DeviceFormContainer}>
        {formElementsArray.map(formElement => {
          return (
            <div key={formElement.id} className={classes.DeviceFormContent}>
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
            icon={<AddIcon />}
            clicked={this.addRulesHandler}
          >
            Add Rule
          </Button>
        </div>
      </form>
    );

    return form;
  };

  render() {
    return (
      <div>
        <div className={classes.HeaderForRightDrawer}>Add Rule</div>
        <this.renderForm />
      </div>
    )
  }
}

export default RulesForm;
