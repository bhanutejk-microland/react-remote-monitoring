import React, { Component } from 'react';
import AddIcon from "@material-ui/icons/Add";
import CancelIcon from "@material-ui/icons/Cancel";

import { DeviceFormModel } from '../../../interfaceModels/DeviceFormModel';
import classes from './DeviceForm.css';
import { FormInputModel } from '../../../interfaceModels/FormInputModel';
import Input from '../../../components/UI/Input/Input';
import Button from '../../../components/UI/Button/Button';
import axios from '../../../axios';
import { unixTimestampToDateTimeconverter } from '../../../utilities/timeStampConverter';

interface DeviceFormProps { 
  closeDrawer(status: any): any;
  addToDeviceList(deviceData: any): any;
}

interface DeviceFormState {
  deviceForm: DeviceFormModel;
  formIsValid: boolean;
}

interface FormElement {
  id: string;
  config: FormInputModel;
}

class DeviceForm extends Component<DeviceFormProps, DeviceFormState> {
  constructor(props: DeviceFormProps) {
    super(props);
    this.state = {
      formIsValid: false,
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
          <Button btnType="default" disabled={false} icon={<CancelIcon />}>
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

  render() {
    return (
      <div>
        <div className={classes.HeaderForRightDrawer}>Add Device</div>
        <this.renderForm />
      </div>
    )
  }
}

export default DeviceForm;
