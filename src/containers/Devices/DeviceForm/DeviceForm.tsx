import React, { Component } from 'react';
import AddIcon from "@material-ui/icons/Add";
import CancelIcon from "@material-ui/icons/Cancel";
import Grid from "@material-ui/core/Grid";
import { DeviceFormModel } from '../../../interfaceModels/DeviceFormModel';
import classes from './DeviceForm.css';
import { FormInputModel } from '../../../interfaceModels/FormInputModel';
import Input from '../../../components/UI/Input/Input';
import Button from '../../../components/UI/Button/Button';
import axios from '../../../axios';
import { unixTimestampToDateTimeconverter } from '../../../utilities/timeStampConverter';
import { DeviceGroupFormModel } from '../../../interfaceModels/DeviceGroupFormModel';
import TextField from '@material-ui/core/TextField';


interface DeviceFormProps { 
  closeDrawer(status: any): any;
  cancleForm: (event: any) => void;
  addToDeviceList(deviceData: any): any;
}

interface DeviceFormState {
  deviceForm: DeviceFormModel;
  deviceGroupForm: DeviceGroupFormModel;
  displayDeviceForm: boolean;
  displayDeviceGroupForm: boolean;
  formIsValid: boolean;
  inputsStatic: any;
  inputsDynamic: any;
}

interface FormElement {
  id: string;
  config: FormInputModel;
}





class DeviceForm extends Component<DeviceFormProps, DeviceFormState > {
  constructor(props: DeviceFormProps) {
    super(props);
    this.state = {
      formIsValid: false,
      displayDeviceForm: true,
      displayDeviceGroupForm: false,
      inputsStatic: ['inputsStatic-0'],
      inputsDynamic: ['inputsDynamic-0'],
      deviceForm: {
        deviceName: {
          elementType: "input",
          elementConfig: {
            label: "Device Name"
          },
          value: "",
          validation: {
            required: true
          },
          valid: false,
          touched: false
        },
        deviceId: {
          elementType: "input",
          elementConfig: {
            label: "Device ID"
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
        addrerss: {
          elementType: "input",
          elementConfig: {
            label: "Address"
          },
          value: "",
          validation: {
            required: true
          },
          valid: false,
          touched: false
        },
        latitude: {
          elementType: "input",
          elementConfig: {
            label: "Latitude"
          },
          value: "",
          validation: {
            required: true
          },
          valid: false,
          touched: false
        },
        longitude: {
          elementType: "input",
          elementConfig: {
            label: "Longitude"
          },
          value: "",
          validation: {
            required: true
          },
          valid: false,
          touched: false
        },
        makeNModel: {
          elementType: "input",
          elementConfig: {
            label: "Device Make n Model"
          },
          value: "",
          validation: {
            required: true
          },
          valid: false,
          touched: false
        },
        propertyDescription: {
          elementType: "input",
          elementConfig: {
            label: "Property Description"
          },
          value: "",
          validation: {
            required: true
          },
          valid: false,
          touched: false
        },
        type: {
          elementType: "input",
          elementConfig: {
            label: "Property Type"
          },
          value: "",
          validation: {
            required: true
          },
          valid: false,
          touched: false
        },
        firmWare: {
          elementType: "input",
          elementConfig: {
            label: "Firm Ware"
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
      },
      deviceGroupForm: {
        deviceGroupName: {
          elementType: "input",
          elementConfig: {
            label: "Device Group Name"
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
            label: "Device Group ID"
          },
          value: "",
          validation: {
            required: true
          },
          valid: false,
          touched: false
        },
        staticProperties:{
          elementType: "button",
          elementConfig: {
            label: "Static Properties"
          },
          value: "",
          validation: {
            required: true
          },
          valid: false,
          touched: false
        },
        dynamicProperties:{
          elementType: "button",
          elementConfig: {
            label: "Dynamic Properties"
          },
          value: "",
          validation: {
            required: true
          },
          valid: false,
          touched: false
        },
        createdBy: {
          elementType: "",
          elementConfig: {
            label: "Created By User"
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
            label: "Created Date"
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
    this.displayDeviceForm = this.displayDeviceForm.bind(this);
    this.displayDeviceGroupForm = this.displayDeviceGroupForm.bind(this);
    this.appendStaticInput = this.appendStaticInput.bind(this);
    this.appendDynamicInput = this.appendDynamicInput.bind(this);
  }

  
  displayDeviceForm(){
    this.setState({
      displayDeviceForm : !this.state.displayDeviceForm,
      displayDeviceGroupForm : !this.state.displayDeviceGroupForm,
    })
  }

  
  displayDeviceGroupForm(){
    this.setState({
      displayDeviceGroupForm : !this.state.displayDeviceGroupForm,
      displayDeviceForm : !this.state.displayDeviceForm
    })
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
    const updatedDeviceForm = {
      ...this.state.deviceForm
    };
    const updatedFormElement = {
      ...updatedDeviceForm[inputIdentifier]
    };
    updatedFormElement.value = event.target.value;
    updatedFormElement.valid = this.checkValidity(
      updatedFormElement.value,
      updatedFormElement.validation
    );
    updatedFormElement.touched = true;
    updatedDeviceForm[inputIdentifier] = updatedFormElement;
    let formIsValid = true;
    for (let inputIdentifier in updatedDeviceForm) {
      formIsValid = updatedDeviceForm[inputIdentifier].valid && formIsValid;
    }
    this.setState({
      deviceForm: updatedDeviceForm,
      formIsValid: formIsValid
    });
  };

  addDeviceHandler = () => {
    this.setState(prevState => ({
      formIsValid: !prevState.formIsValid
    }));
    const deviceData = {
      configType: "devices",
      key: "ML-Chiller",
      status: "Active",
      data: {
        id: this.state.deviceForm.deviceId.value,
        displayName: this.state.deviceForm.deviceName.value,
        deviceGroups: this.state.deviceForm.deviceGroup.value,
        location: [
          {
            address: this.state.deviceForm.addrerss.value,
            lattitude: this.state.deviceForm.latitude.value,
            longitude: this.state.deviceForm.longitude.value
          }
        ],
        properties: [
          {
            makeNmodel: this.state.deviceForm.makeNModel.value,
            description: this.state.deviceForm.propertyDescription.value,
            typeOfRefrigerant: this.state.deviceForm.type.value,
            firmwareVersion: this.state.deviceForm.firmWare.value,
            firmwareUpdateStatus: "Updated",
            deviceStatus: "Online"
          }
        ]
      }
    }
    axios.post("http://localhost:3000/api/devices/add", deviceData)
    .then(response => {
      if(response.status === 200){
        this.props.closeDrawer([200, "Device added successfully!"]);
        const newDeviceData = {
          deviceId: deviceData.data.id,
          url: '',
          modelNumber: deviceData.data.properties[0].makeNmodel,
          location: deviceData.data.location[0].address,
          description: deviceData.data.properties[0].description,
          status: deviceData.data.properties[0].deviceStatus
        }
        this.props.addToDeviceList(newDeviceData)
      }
    });
  }

  addDeviceGroupHandler = () => {
    
  }



  renderForm = () => {
    const formElementsArray: FormElement[] = [];
    for (let key in this.state.deviceForm) {
      const formElement: FormElement = {
        id: key,
        config: this.state.deviceForm[key]
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
          <Button clicked={this.props.cancleForm} btnType="default" disabled={false} icon={<CancelIcon />}>
            CANCEL
          </Button>
          <Button
            btnType="primary"
            disabled={!this.state.formIsValid}
            icon={<AddIcon />}
            clicked={this.addDeviceHandler}
          >
            Add Device
          </Button>
        </div>
      </form>
    );

    return form;
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
        {formElementsArray.map(formElement => {
          let inputElement = <div key={formElement.id} className={classes.DeviceFormContent}>
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
                            </div>;

          let buttonElement = <div style={{marginTop: "10px"}}>
                                <Button
                                  clicked={
                                    formElement.config.elementConfig.label === 'Static Properties' ?
                                    this.appendStaticInput : this.appendDynamicInput}
                                    btnType="primary" disabled={false} icon={<AddIcon />}
                                    
                                >
                                   {formElement.config.elementConfig.label} 
                                </Button>
                                {formElement.config.elementConfig.label === 'Static Properties' && 
                                <div id="staticInput">
                                    {this.state.inputsStatic.map((input,id) => 
                                      <Grid container key={input}>
                                        <Grid item md={10}>
                                          <TextField  id={`${input}`} label="Static Properties" style={{margin: "5px 0", width : "100%"}} />                    
                                        </Grid>
                                        <Grid item md={2}>
                                          <Button clicked={this.deleteStaticInput(id)} btnType="primary" disabled={false} icon={<CancelIcon />} width='50%' >
                                          </Button>
                                        </Grid>                                         
                                      </Grid>)}
                                </div>}
                                {formElement.config.elementConfig.label === 'Dynamic Properties' && 
                                <div id="dynamicInput">
                                    {this.state.inputsDynamic.map((input,id) =>
                                      <Grid container key={input}>
                                        <Grid item md={10}>
                                          <TextField  id={`${input}`} label="Dynamic Properties" style={{margin: "5px 0",width : "100%"}} />
                                        </Grid>
                                        <Grid item md={2}>
                                          <Button clicked={this.deleteDynamicInput(id)} btnType="primary" disabled={false} icon={<CancelIcon />} width='50%'>                                            
                                          </Button>
                                        </Grid>
                                      </Grid>)}
                                </div>}
                            </div>;
          if(formElement.config.elementType === 'input'){
            return inputElement;
          }else if(formElement.config.elementType === 'button'){
            return buttonElement;
          }else{
            return(
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
            </div>);
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
            clicked={this.addDeviceGroupHandler}
          >
            Add Device Group
          </Button>
        </div>
      </form>
    );

    return form;
  };

  appendStaticInput() {
      var newInput = `inputsStatic-${this.state.inputsStatic.length}`;
      this.setState(prevState => ({ inputsStatic: prevState.inputsStatic.concat([newInput]) }));
  }

  appendDynamicInput() {
    var newInput = `inputsDynamic-${this.state.inputsDynamic.length}`;
    this.setState(prevState => ({ inputsDynamic: prevState.inputsDynamic.concat([newInput]) }));
  }

  deleteStaticInput = id => () => {
    this.setState({
      inputsStatic: this.state.inputsStatic.filter((s, idx) => id !== idx)
    });
  };

  deleteDynamicInput = id => () => {
    this.setState({
      inputsDynamic: this.state.inputsDynamic.filter((s, idx) => id !== idx)
    });
  };

  render() {
    return (
      <div>
        {/* <div className={classes.HeaderForRightDrawer}>Add Device</div> */}
        <Grid container>
          <Grid item xs={6} >
            <Button clicked={this.displayDeviceForm}  btnType="primary" disabled={false} icon={<AddIcon />}>
              Add Device
            </Button>
          </Grid>
          <Grid item xs={6}>
            <Button clicked={this.displayDeviceGroupForm}  btnType="primary" disabled={false} icon={<AddIcon />}>
              Add Device Group
            </Button>
          </Grid>
          {this.state.displayDeviceForm && 
          <Grid item xs={12}>
            <this.renderForm />
          </Grid>}
          {this.state.displayDeviceGroupForm &&
          <Grid item xs={12}>
            <this.renderGroupForm />
          </Grid>}
        </Grid>
        
      </div>
    )
  }
}



export default DeviceForm;
