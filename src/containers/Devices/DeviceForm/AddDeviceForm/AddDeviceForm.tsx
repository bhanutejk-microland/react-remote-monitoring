import React, {Component} from 'react';
import { DeviceFormModel } from '../../../../interfaceModels/DeviceFormModel';
import { FormInputModel } from '../../../../interfaceModels/FormInputModel';
import AddIcon from "@material-ui/icons/Add";
import CancelIcon from "@material-ui/icons/Cancel";
import Input from '../../../../components/UI/Input/Input';
import { connect } from 'react-redux';
import * as actions from '../../../../store/actions/index';
import Button from '../../../../components/UI/Button/Button';import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import classes from '../../DeviceForm/DeviceForm.css';
import TextField from '@material-ui/core/TextField';

interface AddDeviceFormProps { 
    closeDrawer(status: any): any;
    cancleForm: (event: any) => void;
    devicesGroup: any;
    allDeviceGroupDetails: any;
    deviceFormData?: any[];
    addDeviceFormDataDispatcher?: any;
    addAssetToListDispatcher?: any; 
    addToDeviceList(deviceData: any): any;
}

interface AddDeviceFormState {
    deviceForm: DeviceFormModel;
    value : number;
    formIsValid: boolean;
    deviceGroupValue: string;
    staticProperties: any[],    
    dynamicProperties: any[]
    staticPropertiesValues: any[],    
    dynamicPropertiesValues: any[],    
    deviceFormData: any[]
}

interface FormElement {
    id: string;
    config: FormInputModel;
}

class AddDeviceForm extends Component<AddDeviceFormProps,AddDeviceFormState>{
    constructor(props:AddDeviceFormProps){
        super(props);
        this.state = {
            value: 0, 
            formIsValid: false,
            deviceGroupValue: "",
            staticProperties: [],
            dynamicProperties: [],
            staticPropertiesValues: [],
            dynamicPropertiesValues: [],
            deviceFormData: [],
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

    handleDeviceGroupChange = (event) => {
        let allDeviceGroupDetails = this.props.allDeviceGroupDetails;
        let object = allDeviceGroupDetails.find(o => o.displayName === event.target.value);
        let updatedStaticProperties = [...object.staticProperties];
        let updatedDynamicProperties = [...object.dynamicProperties];
        this.setState({
          deviceGroupValue : event.target.value,
          staticProperties: updatedStaticProperties,
          dynamicProperties: updatedDynamicProperties
        })
    }

    inputChangedStaticPropertyValue = (event,i,property) => {   
        let newStaticPropertiesValues = [...this.state.staticPropertiesValues];
        if(newStaticPropertiesValues.length === 0){
          let obj = {
            property : property,
            value : event.target.value
          }
          newStaticPropertiesValues.push(obj); 
          this.setState({
            staticPropertiesValues : newStaticPropertiesValues
          });
        }else{
          const propertyObj = newStaticPropertiesValues.find(o => o.property === property);
          if(propertyObj === undefined){
            let obj = {
              property : property,
              value : event.target.value
            }
            newStaticPropertiesValues.push(obj); 
            this.setState({
              staticPropertiesValues : newStaticPropertiesValues
            });
          }else{
            const objIndex = newStaticPropertiesValues.findIndex(obj => obj.property === property);
            const updatedObj = { ...newStaticPropertiesValues[objIndex], value: event.target.value};
            const updatedStaticPropertiesValuess = [
              ...newStaticPropertiesValues.slice(0, objIndex),
              updatedObj,
              ...newStaticPropertiesValues.slice(objIndex + 1),
            ];
            this.setState({
              staticPropertiesValues : updatedStaticPropertiesValuess
            });
          }
        }
      }
    
      inputChangedDynamicPropertyValue = (event,i,property) => {   
        let newDynamicPropertiesValues = [...this.state.dynamicPropertiesValues];
        if(newDynamicPropertiesValues.length === 0){
          let obj = {
            property : property,
            value : event.target.value
          }
          newDynamicPropertiesValues.push(obj); 
          this.setState({
            dynamicPropertiesValues : newDynamicPropertiesValues
          });
        }else{
          const propertyObj = newDynamicPropertiesValues.find(o => o.property === property);
          if(propertyObj === undefined){
            let obj = {
              property : property,
              value : event.target.value
            }
            newDynamicPropertiesValues.push(obj); 
            this.setState({
              dynamicPropertiesValues : newDynamicPropertiesValues
            });
          }else{
            const objIndex = newDynamicPropertiesValues.findIndex(obj => obj.property === property);
            const updatedObj = { ...newDynamicPropertiesValues[objIndex], value: event.target.value};
            const updatedDynamicPropertiesValuess = [
              ...newDynamicPropertiesValues.slice(0, objIndex),
              updatedObj,
              ...newDynamicPropertiesValues.slice(objIndex + 1),
            ];
            this.setState({
              dynamicPropertiesValues : updatedDynamicPropertiesValuess
            });
          }
        }
    }

    addDeviceHandler = () => {
        this.setState(prevState => ({
          formIsValid: !prevState.formIsValid
        }));
        const newDeviceFormData = {
          configType: "devices",
          key: "ML-Chiller",
          status: "Active",
          data: {
            id: this.state.deviceForm.deviceId.value,
            displayName: this.state.deviceForm.deviceName.value,
            deviceGroups: this.state.deviceGroupValue,
            location: [
              {
                address: this.state.deviceForm.addrerss.value,
                lattitude: this.state.deviceForm.latitude.value,
                longitude: this.state.deviceForm.longitude.value
              }
            ],
            // properties: [
            //   {
            //     // makeNmodel: this.state.deviceForm.makeNModel.value,
            //     // description: this.state.deviceForm.propertyDescription.value,
            //     // typeOfRefrigerant: this.state.deviceForm.type.value,
            //     // firmwareVersion: this.state.deviceForm.firmWare.value,
            //     staticProperties: this.state.staticPropertiesValues,
            //     dynamicProperties: this.state.dynamicPropertiesValues,
            //     firmwareUpdateStatus: "Updated",
            //     deviceStatus: "Online"
            //   }
            // ],
            properties:[...this.state.staticPropertiesValues],
            teleProperties: [...this.state.dynamicPropertiesValues]
          }
        }

        this.setState({
            deviceFormData : this.state.deviceFormData.concat(newDeviceFormData)
        },
        () => this.props.addDeviceFormDataDispatcher(this.state.deviceFormData))
        this.props.closeDrawer([200, "Device added successfully!"]);
        const newDeviceData = {
          deviceId: newDeviceFormData.data.id,
          url: '',
          modelNumber: `Hitachi ${newDeviceFormData.data.displayName}`,
          location: newDeviceFormData.data.location[0].address,
          description: 'Pump Demo',
          status: 'Online'
        }
        this.props.addToDeviceList(newDeviceData);
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
            <div className={classes.DeviceFormContent}>
              <FormControl fullWidth>
                <InputLabel id="deviceGroup-select-label">Device Group</InputLabel>
                <Select
                  labelId="deviceGroup-select-label"
                  id="deviceGroup-select"
                  value={this.state.deviceGroupValue}
                  onChange={this.handleDeviceGroupChange}
                >
                  {this.props.devicesGroup.map((name,index) => {
                    return(
                      <MenuItem key={index} value={name.groupName}>{name.groupName}</MenuItem>
                    )
                  })}
                </Select>
              </FormControl>
            </div>
            <h4 style={{marginBottom: "0px"}}>Static Properties</h4>
            {this.state.staticProperties.length > 0 && this.state.staticProperties.map((property,index) => {
              return (
                <div key={index} className={classes.DeviceFormContent}>
                  <FormControl fullWidth>
                    <TextField 
                      id={`${index}`}
                      label={property}
                      required
                      onChange={event => this.inputChangedStaticPropertyValue(event,index,property)}
                    />
                  </FormControl>
                </div>
              )
            })}
          
            <h4 style={{marginBottom: "0px"}}>Dynamic Properties</h4>
            {this.state.dynamicProperties.length > 0 && this.state.dynamicProperties.map((property,index) => {
                return (
                  <div key={index} className={classes.DeviceFormContent}>
                    <FormControl fullWidth>
                      <TextField 
                        id={`${index}`}
                        label={property}
                        required
                        onChange={event => this.inputChangedDynamicPropertyValue(event,index,property)}
                      />
                    </FormControl>
                  </div>
                )
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

      render(){
          return(
              <this.renderForm />
          )
      }
   
}

const mapStateToProps = (state) => {
    return{
        deviceFormData: state.assetAddDeviceFormData.deviceFormData
    }
}

const mapDispatchToProps = (dispatch) => {
    return{
        addDeviceFormDataDispatcher: (formData) => dispatch(actions.addDeviceFormData(formData)),
        addAssetToListDispatcher: (asset) => dispatch(actions.addAssetToList(asset))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(AddDeviceForm);