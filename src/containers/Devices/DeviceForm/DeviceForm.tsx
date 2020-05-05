import React, { Component } from 'react';
import classes from './DeviceForm.css';
import * as actions from '../../../store/actions/index';
import { connect } from 'react-redux';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import { FormInputModel } from '../../../interfaceModels/FormInputModel';
import AddDeviceForm from '../DeviceForm/AddDeviceForm/AddDeviceForm';
import AddDeviceGroupForm from '../DeviceForm/AddDeviceGroupForm/AddDeviceGroupForm';

interface DeviceFormProps { 
  closeDrawer(status: any): any;
  cancleForm: (event: any) => void;
  addToDeviceList(deviceData: any): any;
  onInitDeviceGroup: () => void;
  onInitAllDeviceGroupDetails: () => void;
  devicesGroup: any;
  allDeviceGroupDetails: any;
}

interface DeviceFormState {
  value : number;
  formIsValid: boolean;
  deviceGroupValue: string;
  staticProperties: any[],    
  dynamicProperties: any[]
  staticPropertiesValues: any[],    
  dynamicPropertiesValues: any[],
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
      deviceGroupValue: "",
      staticProperties: [],
      dynamicProperties: [],
      staticPropertiesValues: [],
      dynamicPropertiesValues: [],      
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

  handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    this.setState({
      value :newValue
    });
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
          <AddDeviceForm
            devicesGroup={this.props.devicesGroup} 
            allDeviceGroupDetails={this.props.allDeviceGroupDetails}
            closeDrawer={this.props.closeDrawer}
            cancleForm={this.props.cancleForm} />
        </TabPanel>
        <TabPanel value={this.state.value} index={1}>
          <AddDeviceGroupForm
            closeDrawer={this.props.closeDrawer}
            cancleForm={this.props.cancleForm}
          />
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

const mapStateToProps = state => {
  return {
    devicesGroup : state.assetDevicesGroup.deviceGroupList,
    allDeviceGroupDetails : state.assetDevicesGroup.allDeviceGroupDetails
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onInitDeviceGroup: () => dispatch(actions.initDeviceGroupList()),
    onInitAllDeviceGroupDetails: () => dispatch(actions.initAllDeviceGroupDetails())
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(DeviceForm);
