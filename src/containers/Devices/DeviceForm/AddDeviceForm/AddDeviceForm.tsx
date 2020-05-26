import React, {Component} from 'react';
import { DeviceFormModel } from '../../../../interfaceModels/DeviceFormModel';
import { FormInputModel } from '../../../../interfaceModels/FormInputModel';
import AddIcon from "@material-ui/icons/Add";
import CancelIcon from "@material-ui/icons/Cancel";
import Input from '../../../../components/UI/Input/Input';
import { connect } from 'react-redux';
import * as actions from '../../../../store/actions/index';
import Button from '../../../../components/UI/Button/Button';
import FormControl from '@material-ui/core/FormControl';
import classes from '../../DeviceForm/DeviceForm.css';
import TextField from '@material-ui/core/TextField';
import { unixTimestampToDateTimeconverter } from '../../../../utilities/timeStampConverter';

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
            staticProperties: [],
            dynamicProperties: [],
            staticPropertiesValues: [],
            dynamicPropertiesValues: [],
            deviceFormData: [],
            deviceForm: {
              deviceName: {
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
              deviceId: {
                elementType: "input",
                elementConfig: {
                  label: "Asset ID"
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
              deviceGroup: {
                elementType: "dropdown",
                elementConfig: {
                  label: "Asset Group",
                  options: []
                },
                value: "",
                validation: {
                  required: true
                },
                valid: false,
                touched: false
              }
              // createdAt: {
              //   elementType: "",
              //   elementConfig: {
              //     label: "Created At"
              //   },
              //   value: "",
              //   validation: {
              //     required: true
              //   },
              //   valid: false,
              //   touched: false
              // }
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

        //render deviceGroup static and dynamic properties
        if(inputIdentifier === 'deviceGroup'){
          let allDeviceGroupDetails = this.props.allDeviceGroupDetails;
          let object = allDeviceGroupDetails.find(o => o.displayName === event.target.value);
          let updatedStaticProperties = [...object.staticProperties];
          let updatedDynamicProperties = [...object.dynamicProperties];
          this.setState({
            deviceForm: updatedDeviceForm,
            formIsValid: formIsValid,
            staticProperties: updatedStaticProperties,
            dynamicProperties: updatedDynamicProperties
          })
        }
        
        this.setState({
          deviceForm: updatedDeviceForm,
          formIsValid: formIsValid
        });
    };

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
            deviceGroups: this.state.deviceForm.deviceGroup.value,
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
            teleProperties: [...this.state.dynamicPropertiesValues],
            dateCreated: unixTimestampToDateTimeconverter(new Date()),
            dateModified: unixTimestampToDateTimeconverter(new Date())
          }
        }

        this.setState({
            deviceFormData : this.state.deviceFormData.concat(newDeviceFormData)
        },
        () => this.props.addDeviceFormDataDispatcher(this.state.deviceFormData))
        this.props.closeDrawer([200, "Asset added successfully!"]);
        const newDeviceData = {
          deviceId: newDeviceFormData.data.id,
          url: '',
          makeNmodel: `Hitachi ${newDeviceFormData.data.displayName}`,
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
        let deviceGroupOptions = this.props.devicesGroup.map(group => group.groupName);
        let form = (
          <form className={classes.DeviceFormContainer}>
            {
            formElementsArray.map(formElement => {
              return (
                formElement.config.elementType === 'input' ? 
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
                :
                <div key={formElement.id} className={classes.DeviceFormContent}>
                  <Input
                    elementType={formElement.config.elementType}
                    elementConfig={formElement.config.elementConfig}
                    value={formElement.config.value}
                    invalid={!formElement.config.valid}
                    shouldValidate={formElement.config.validation}
                    options={deviceGroupOptions}
                    touched={formElement.config.touched}
                    changed={event => this.inputChangedHandler(event, formElement.id)}
                  />
                </div>
              );
            })}
            
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
                        disabled={true}
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
                Add Asset
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