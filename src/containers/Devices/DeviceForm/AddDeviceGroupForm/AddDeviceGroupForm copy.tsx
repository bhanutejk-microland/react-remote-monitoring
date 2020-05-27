import React, {Component} from "react";
import AddIcon from "@material-ui/icons/Add";
import CancelIcon from "@material-ui/icons/Cancel";
import DeleteIcon from "@material-ui/icons/Delete";
import TextField from '@material-ui/core/TextField';
import Grid from "@material-ui/core/Grid";
import Input from '../../../../components/UI/Input/Input';
import Button from '../../../../components/UI/Button/Button';
import { connect } from 'react-redux';
import * as actions from '../../../../store/actions/index';
import { unixTimestampToDateTimeconverter } from '../../../../utilities/timeStampConverter';
import { FormInputModel } from '../../../../interfaceModels/FormInputModel';
import { DeviceGroupFormModel } from '../../../../interfaceModels/DeviceGroupFormModel';
import classes from '../../DeviceForm/DeviceForm.css';

interface AddDeviceGroupFormProps { 
    closeDrawer(status: any): any;
    cancleForm: (event: any) => void;
    addDeviceGroupFormDataDispatcher?: any;
    deviceGroupFormData?: any[];
}

interface AddDeviceGroupFormState {
    deviceGroupForm: DeviceGroupFormModel;
    formDeviceGroupIsValid: any;
    inputsStatic: any;
    inputsDynamic: any;    
    inputsStaticValues: any[],    
    inputsDynamicvalues: any[], 
    deviceGroupFormData: any[];   
}

interface FormElement {
    id: string;
    config: FormInputModel;
}

class AddDeviceGroupForm extends Component<AddDeviceGroupFormProps,AddDeviceGroupFormState>{

    constructor(props:AddDeviceGroupFormProps){
        super(props);
        this.state = {
            formDeviceGroupIsValid: false,
            inputsStatic: ['inputsStatic-0'],
            inputsDynamic: ['inputsDynamic-0'],
            inputsStaticValues: [],
            inputsDynamicvalues: [],
            deviceGroupFormData: [],
            deviceGroupForm: {
                deviceGroupName: {
                    elementType: "input",
                    elementConfig: {
                    label: "Asset Name"
                    },
                    value: "",
                    validation: {
                    required: true
                    },
                    valid: false,
                    touched: false
                },
                deviceGroupId: {
                    elementType: "input",
                    elementConfig: {
                    label: "Asset Group ID"
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

    appendStaticInput = () => {
        var newInput = `inputsStatic-${this.state.inputsStatic.length}`;        
        this.setState(prevState => ({ inputsStatic: prevState.inputsStatic.concat([newInput]) }),() => {
          let updatedInputsStaticValues = [...this.state.inputsStaticValues];
          let inputStaticlength = this.state.inputsStatic.length - 1;
          this.checkEmptyValue(updatedInputsStaticValues,updatedInputsStaticValues[inputStaticlength]);
        });
    }
  
    appendDynamicInput = () => {
      var newInput = `inputsDynamic-${this.state.inputsDynamic.length}`;
      this.setState(prevState => ({ inputsDynamic: prevState.inputsDynamic.concat([newInput]) }),() => {
        let updatedInputsDynamicValues = [...this.state.inputsDynamicvalues];
        let inputsDynamiclength = this.state.inputsDynamic.length - 1;
        this.checkEmptyValue(updatedInputsDynamicValues,updatedInputsDynamicValues[inputsDynamiclength]);
      });
    }
  
    deleteStaticInput = id => () => {
      this.setState({
        inputsStatic: this.state.inputsStatic.filter((s, idx) => id !== idx),
        inputsStaticValues: this.state.inputsStaticValues.filter((s,idx) => id !== idx)
      },() => {
        let updatedInputsStaticValues = [...this.state.inputsStaticValues];
        let inputStaticlength = this.state.inputsStatic.length - 1;
        this.checkEmptyValue(updatedInputsStaticValues);
      });
    };
  
    deleteDynamicInput = id => () => {
      this.setState({
        inputsDynamic: this.state.inputsDynamic.filter((s, idx) => id !== idx),
        inputsDynamicvalues: this.state.inputsDynamicvalues.filter((s, idx) => id !== idx)
      },() => {
        let updatedInputsDynamicValues = [...this.state.inputsDynamicvalues];
        let inputsDynamiclength = this.state.inputsDynamic.length - 1;
        this.checkEmptyValue(updatedInputsDynamicValues,updatedInputsDynamicValues[inputsDynamiclength]);
      });
    };

    inputChangedStaticValues = (event,i) => {
        let updatedInputsStaticValues = [...this.state.inputsStaticValues];
        updatedInputsStaticValues[i] = event.target.value;
        let formDeviceGroupIsValid = this.checkEmptyValue(updatedInputsStaticValues);
        this.setState({
          inputsStaticValues : updatedInputsStaticValues,
          formDeviceGroupIsValid : formDeviceGroupIsValid 
        });       
    }

    checkEmptyValue = (inputValuesArray) => {
      console.log("inputValuesArray",inputValuesArray);
      // console.log("indexof",inputValuesArray.indexOf(value));
      if(inputValuesArray.length !== 0){
        inputValuesArray.every((element,index) => {
          if(element !== ''){
            return false;
          }else{
            return true;
          }
        })
      }else{
        return false;
      }

      // if(inputValuesArray.indexOf(value) !== -1){
      //   if(value !== ""){
      //     this.setState({            
      //       formDeviceGroupIsValid : formDeviceGroupIsValid
      //     });
      //   }else{
      //     this.setState({            
      //       formDeviceGroupIsValid : !formDeviceGroupIsValid
      //     });
      //   }        
      // }else{
      //   this.setState({            
      //     formDeviceGroupIsValid : !formDeviceGroupIsValid
      //   });
      // }
    }

    inputChangedDynamicValues = (event,i) => {
        let updatedInputsDynamicValues = [...this.state.inputsDynamicvalues];
        updatedInputsDynamicValues[i] = event.target.value;
        this.setState({inputsDynamicvalues : updatedInputsDynamicValues },() => {
          this.checkEmptyValue(updatedInputsDynamicValues,updatedInputsDynamicValues[i])
        });  
    }

    inputChangedDeviceGroupHandler = (event, inputIdentifier) => {
        const updatedDeviceGroupForm = {
          ...this.state.deviceGroupForm
        };
        const updatedFormElement = {
          ...updatedDeviceGroupForm[inputIdentifier]
        };
        updatedFormElement.value = event.target.value;
        updatedFormElement.valid = this.checkValidity(
          updatedFormElement.value,
          updatedFormElement.validation
        );
        updatedFormElement.touched = true;
        updatedDeviceGroupForm[inputIdentifier] = updatedFormElement;
        let formDeviceGroupIsValid = true;
        for (let inputIdentifier in updatedDeviceGroupForm) {
          formDeviceGroupIsValid = updatedDeviceGroupForm[inputIdentifier].valid && formDeviceGroupIsValid;
        }
        this.setState({
          deviceGroupForm: updatedDeviceGroupForm,
          formDeviceGroupIsValid: formDeviceGroupIsValid
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

      addDeviceGroupHandler = () => {
        this.setState(prevState => ({
          formDeviceGroupIsValid: !prevState.formDeviceGroupIsValid
        }));
    
        const deviceGroupData = {
          configType: "deviceGroup",
          key: this.state.deviceGroupForm.deviceGroupName.value,
          status: "Active",
          data: {
            id: this.state.deviceGroupForm.deviceGroupId.value,
            displayName: this.state.deviceGroupForm.deviceGroupName.value,
            staticProperties : this.state.inputsStaticValues,
            dynamicProperties : this.state.inputsDynamicvalues,
            dateCreated : unixTimestampToDateTimeconverter(new Date()),
            dateModified : unixTimestampToDateTimeconverter(new Date()),
            enabled : false,
          },
          id : this.state.deviceGroupForm.deviceGroupId.value
        }

        this.setState({
            deviceGroupFormData : this.state.deviceGroupFormData.concat(deviceGroupData)
        },
        () => this.props.addDeviceGroupFormDataDispatcher(this.state.deviceGroupFormData))
        this.props.closeDrawer([200, "Asset added successfully!"]);
      }
    

    renderStaticProperty = () => {
        let staticProperty = (
        <div style={{marginTop: "10px"}}>
          <Button
            clicked={this.appendStaticInput}
              btnType="primary" disabled={false} icon={<AddIcon />}              
          >
            Add Static Properties 
          </Button> 
          <div id="staticInput">
            {this.state.inputsStatic.map((input,id) => 
              <Grid container key={input}>
                <Grid item md={11}>
                  <TextField 
                    onChange={event => this.inputChangedStaticValues(event,id)}
                    id={`${input}`}
                    label="Static Properties"
                    style={{margin: "5px 0", width : "100%"}}
                  />                    
                </Grid>
                <Grid item md={1} style={{alignSelf: "center",cursor: "pointer"}}>
                  <DeleteIcon onClick={this.deleteStaticInput(id)} />    
                </Grid>                                         
              </Grid>)}
          </div>
        </div>);
        return staticProperty;
      };
    
      renderDynamicProperty = () => {
        let dynamicProperty = (
          <div style={{marginTop: "10px"}}>
            <Button
              clicked={this.appendDynamicInput}
              btnType="primary" disabled={false} icon={<AddIcon />}              
            >
              Add Dynamic Properties 
            </Button>                              
            <div id="dynamicInput">
                {this.state.inputsDynamic.map((input,id) =>
                  <Grid container key={input}>
                    <Grid item md={11}>
                      <TextField 
                        onChange={event => this.inputChangedDynamicValues(event,id)}
                        id={`${input}`}
                        label="Dynamic Properties"
                        style={{margin: "5px 0",width : "100%"}}
                      />
                    </Grid>
                    <Grid item md={1} style={{alignSelf: "center",cursor: "pointer"}}>
                      <DeleteIcon onClick={this.deleteDynamicInput(id)} />
                    </Grid>
                  </Grid>)}
            </div>
          </div>
        )
        return dynamicProperty;
      };

      renderGroupForm = () => {
        const formElementsArray: FormElement[] = [];
        for (let key in this.state.deviceGroupForm) {
          const formElement: FormElement = {
            id: key,
            config: this.state.deviceGroupForm[key]
          };
          formElementsArray.push(formElement);
        }
        
        let form = (
          <form className={classes.DeviceFormContainer}>
            {formElementsArray.map((formElement) => {
              return(<div key={formElement.id} className={classes.DeviceFormContent}>
                <Input
                  elementType={formElement.config.elementType}
                  elementConfig={formElement.config.elementConfig}
                  value={formElement.config.value}
                  invalid={!formElement.config.valid}
                  shouldValidate={formElement.config.validation}
                  touched={formElement.config.touched}
                  changed={event =>
                    this.inputChangedDeviceGroupHandler(event, formElement.id)
                  }
                />
              </div>)
            })}
            {this.renderStaticProperty()}
            {this.renderDynamicProperty()}
            <div className={classes.BtnGroup}>
              <Button clicked={this.props.cancleForm} btnType="default" disabled={false} icon={<CancelIcon />}>
                CANCEL
              </Button>
              <Button
                btnType="primary"
                disabled={!this.state.formDeviceGroupIsValid}
                icon={<AddIcon />}
                clicked={this.addDeviceGroupHandler}
              >
                Add Asset Group
              </Button>
            </div>
          </form>
        );
        return form;
      };
    

    render(){
        return(
            <this.renderGroupForm />
        )
    }
}

const mapStateToProps = (state) => {
    return{
        deviceFormData: state.assetAddDeviceGroupFormData.deviceFormData
    }
}

const mapDispatchToProps = (dispatch) => {
    return{
        addDeviceGroupFormDataDispatcher: (formData) => dispatch(actions.addDeviceGroupFormData(formData))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(AddDeviceGroupForm);
