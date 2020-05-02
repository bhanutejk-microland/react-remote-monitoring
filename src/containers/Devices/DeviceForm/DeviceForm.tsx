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

import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';


interface DeviceFormProps { 
  closeDrawer(status: any): any;
  cancleForm: (event: any) => void;
  addToDeviceList(deviceData: any): any;
}

interface DeviceFormState {
  value : number;
  deviceForm: DeviceFormModel;
  deviceGroupForm: DeviceGroupFormModel;
  formIsValid: boolean;
  formDeviceGroupIsValid: boolean;
  inputsStatic: any;
  inputsDynamic: any;
  inputsStaticValues: any[],
  inputsDynamicvalues: any[],
}

interface FormElement {
  id: string;
  config: FormInputModel;
}

class DeviceForm extends Component<DeviceFormProps, DeviceFormState > {
  constructor(props: DeviceFormProps) {
    super(props);
    this.state = {
      value: 0, 
      formIsValid: false,
      formDeviceGroupIsValid: false,
      inputsStatic: ['inputsStatic-0'],
      inputsDynamic: ['inputsDynamic-0'],
      inputsStaticValues: [],
      inputsDynamicvalues: [],
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
        // createdBy: {
        //   elementType: "",
        //   elementConfig: {
        //     label: "Created By User"
        //   },
        //   value: "",
        //   validation: {
        //     required: true
        //   },
        //   valid: false,
        //   touched: false
        // },
        // createdAt: {
        //   elementType: "",
        //   elementConfig: {
        //     label: "Created Date"
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

    this.appendStaticInput = this.appendStaticInput.bind(this);
    this.appendDynamicInput = this.appendDynamicInput.bind(this);
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
    this.setState(prevState => ({
      formDeviceGroupIsValid: !prevState.formDeviceGroupIsValid
    }));

    const deviceGroupData = {
      configType: "devices",
      key: "ML-Chiller",
      status: "Active",
      data: {
        id: this.state.deviceGroupForm.deviceGroupId.value,
        displayName: this.state.deviceGroupForm.deviceGroupName.value,
        deviceGroups: this.state.deviceForm.deviceGroup.value
      }
    }
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

  inputChangedStaticValues = (event,i) => {
    let updatedInputsStaticValues = [...this.state.inputsStaticValues];
    updatedInputsStaticValues[i] = event.target.value;
    this.setState({ inputsStaticValues : updatedInputsStaticValues });
  }

  inputChangedDynamicValues = (event,i) => {
    let updatedInputsDynamicValues = [...this.state.inputsDynamicvalues];
    updatedInputsDynamicValues[i] = event.target.value;
    this.setState({inputsDynamicvalues : updatedInputsDynamicValues });  
  }

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
      inputsStatic: this.state.inputsStatic.filter((s, idx) => id !== idx),
      inputsStaticValues: this.state.inputsStaticValues.filter((s,idx) => id !== idx)
    });
  };

  deleteDynamicInput = id => () => {
    this.setState({
      inputsDynamic: this.state.inputsDynamic.filter((s, idx) => id !== idx),
      inputsDynamicvalues: this.state.inputsDynamicvalues.filter((s, idx) => id !== idx)
    });
  };

  handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    console.log(newValue);
    this.setState({
      value :newValue
    });
  };

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
        {
        formElementsArray.map(formElement => {
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
            Add Device Group
          </Button>
        </div>
      </form>
    );
    return form;
  };


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
            <Grid item md={9}>
              <TextField 
                onChange={event => this.inputChangedStaticValues(event,id)}
                id={`${input}`}
                label="Static Properties"
                style={{margin: "5px 0", width : "100%"}}
              />                    
            </Grid>
            <Grid item md={3} style={{alignSelf: "center", paddingLeft: "6%"}}>
              <Button clicked={this.deleteStaticInput(id)} btnType="primary" disabled={false} icon={<CancelIcon />} width='50%' >
              </Button>
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
                <Grid item md={9}>
                  <TextField 
                    onChange={event => this.inputChangedDynamicValues(event,id)}
                    id={`${input}`}
                    label="Dynamic Properties"
                    style={{margin: "5px 0",width : "100%"}}
                  />
                </Grid>
                <Grid item md={3} style={{alignSelf: "center", paddingLeft: "6%"}}>
                  <Button clicked={this.deleteDynamicInput(id)} btnType="primary" disabled={false} icon={<CancelIcon />} width='50%'>                                            
                  </Button>
                </Grid>
              </Grid>)}
        </div>
      </div>
    )
    return dynamicProperty;
  };

  
  render() {
    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Tabs value={this.state.value} onChange={this.handleChange} aria-label="simple tabs example">
            <Tab label="Add Device" {...a11yProps(0)} />
            <Tab label="Add Device Group" {...a11yProps(1)} />
          </Tabs>
        </AppBar>
        <TabPanel value={this.state.value} index={0}>
          <this.renderForm />
        </TabPanel>
        <TabPanel value={this.state.value} index={1}>
          <this.renderGroupForm />
        </TabPanel>
      </div>
    )
  }
}

interface TabPanelProps {
  children?: React.ReactNode;
  index: any;
  value: any;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
          <Typography component="div">{children}</Typography>
      )}
    </div>
  );
}

function a11yProps(index: any) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default DeviceForm;
