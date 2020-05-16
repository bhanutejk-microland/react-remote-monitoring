import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions/index';
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
  cancleForm: (event: any) => void;
  onInitDeviceGroup: () => void;
  onInitAllDeviceGroupDetails: () => void;
  onAddRulesToList: (ruleListData: any) => void;
  devicesGroup:any;
  allDeviceGroupDetails: any;
}

interface RulesFormState {
  rulesForm: RulesFormModel;
  formIsValid: boolean;
  dynamicPropertiesProps: Array<any>;
  // displayPeriodField: boolean;
}

interface FormElement {
  id: string;
  config: FormInputModel;
}

let displayPeriodField: boolean = false;
class RulesForm extends Component<RulesFormProps, RulesFormState> {
  constructor(props: RulesFormProps) {
    super(props);
    this.state = {
      dynamicPropertiesProps: [],
      // displayPeriodField: false,
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
          elementType: "dropdown",
          elementConfig: {
            label: "Device Group",
            options: []
          },
          value: '',
          validation: {
            required: true
          },
          valid: false,
          touched: false
        },
        calculation: {
          elementType: "dropdown",
          elementConfig: {
            label: "Calculation",
            options: ['Instant','Periodic']
          },
          value: "",
          validation: {
            required: true
          },
          valid: false,
          touched: false
        },
        field: {
          elementType: "dropdown",
          elementConfig: {
            label: "Field",
            options: []
          },
          value: "",
          validation: {
            required: true
          },
          valid: false,
          touched: false
        },
        operator: {
          elementType: "dropdown",
          elementConfig: {
            label: "Operator",
            options: ['<','<=','>=','>']
          },
          value: "",
          validation: {
            required: true
          },
          valid: false,
          touched: false
        },
        rulesValue: {
          elementType: "input",
          elementConfig: {
            label: "Value"
          },
          value: "",
          validation: {
            required: true
          },
          valid: false,
          touched: false
        },
        severity: {
          elementType: "dropdown",
          elementConfig: {
            label: "Severity Level",
            options: ['Information','Warning','Critical']
          },
          value: "",
          validation: {
            required: true
          },
          valid: false,
          touched: false
        },
        period: {
          elementType: "input",
          elementConfig: {
            label: "Period"
          },
          value: "",
          validation: {
            required: false
          },
          valid: true,
          touched: false
        }
      }
    }
  }

  componentDidMount(){
    this.props.onInitDeviceGroup();
    this.props.onInitAllDeviceGroupDetails();
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
    
    if(inputIdentifier === 'deviceGroup'){
      let updatedDynamicPropertiesProps = new Array();
      this.props.allDeviceGroupDetails.map((devicedDetail) => {
        if (devicedDetail.id === event.target.value) {
          updatedDynamicPropertiesProps = [...devicedDetail.dynamicProperties];
        }
      })
      this.setState({
        rulesForm: updatedRulesForm,
        formIsValid: formIsValid,
        dynamicPropertiesProps: [...updatedDynamicPropertiesProps]
      });
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
    let periodValue:any;
    if(this.state.rulesForm.calculation.value === 'Instant'){
      periodValue = '';
    }else{
      periodValue = this.state.rulesForm.period.value;
    }
    const rulesData = {
      configType: "rules",
      key: "default_Chiller_Temperature_High",
      Name: this.state.rulesForm.ruleName.value,
      Description: this.state.rulesForm.ruleDesciption.value,
      DeviceGroup: this.state.rulesForm.deviceGroup.value,
      Calculation: this.state.rulesForm.calculation.value,
      Field: this.state.rulesForm.field.value,
      Operator: this.state.rulesForm.operator.value,
      Value: this.state.rulesForm.rulesValue.value,
      Severity: this.state.rulesForm.severity.value,
      Period: periodValue
    }

    this.props.addToRulesList(rulesData);
    this.props.closeDrawer([200, "Rule added successfully!"]);
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
    const deviceGroupArray = new Array;
    this.props.devicesGroup.map(device => {
      deviceGroupArray.push(device.groupName);
    });

    let form = (
      <form className={classes.DeviceFormContainer}>
        {formElementsArray.map(formElement => {
          if(formElement.config.elementType === 'dropdown'){            
            let options = new Array;
            if(formElement.config.elementConfig.label === 'Device Group'){
              options = [...deviceGroupArray];
            }else if(formElement.config.elementConfig.label === 'Field'){
              options = [...this.state.dynamicPropertiesProps];
            }else{
              options = [...this.state.rulesForm[formElement.id].elementConfig.options]
            }
            return (
              <div key={formElement.id} className={classes.DeviceFormContent}>
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
          }else{
            if(formElement.id === 'period'){
              if(this.state.rulesForm.calculation.value === 'Periodic'){
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
              }              
            }else{
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
            }
          }
          
        })}
        <div className={classes.BtnGroup}>
          <Button clicked={this.props.cancleForm} btnType="default" disabled={false} icon={<CancelIcon />}>
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

const mapStateToProps = state => {
  return{
    devicesGroup : state.assetDevicesGroup.deviceGroupList,
    allDeviceGroupDetails : state.assetDevicesGroup.allDeviceGroupDetails
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onInitDeviceGroup: () => dispatch(actions.initDeviceGroupList()),
    onInitAllDeviceGroupDetails: () => dispatch(actions.initAllDeviceGroupDetails())
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(RulesForm);
