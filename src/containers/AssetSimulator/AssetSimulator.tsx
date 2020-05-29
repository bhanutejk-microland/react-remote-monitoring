import React, {Component} from "react";
import Grid from "@material-ui/core/Grid";
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';

import Switch from "../../components/UI/Switch/Switch";
import classes from "../AssetSimulator/AssetSimulator.css";

interface AssetSimulatorProps {
    onGetAssetFaultValue: (faultSelectedValue: any) => void;
    onGetAssetHealthyValue: () => void;
    onPostAssetFaultValue: (faultBody: any) => void;
    assetSimulatorList: any;
    assetSimulatorValue: any;
}

interface AssetSimulatorState {
    properties: propertyElement[];
    propertiesValues: any;
    pumpSwitch: boolean;
}

interface propertyElement {
    name: string;
    checked: boolean;
}

let row:number = 0;
let startInterval: any;
let assetPropertyForDispatch : string;

class AssetSimulator extends Component<AssetSimulatorProps, AssetSimulatorState>{
    constructor(props:AssetSimulatorProps){
        super(props);
        this.state = {
            properties : [
                {
                    name : "Broken Blade",
                    checked : false
                },{
                    name : "Cavitation",
                    checked : false
                },{
                    name : "Clearance Wear",
                    checked : false
                },{
                    name : "Inlet Deposit",
                    checked : false
                },{
                    name : "Outlet Deposit",
                    checked : false
                }
            ],
            propertiesValues : {
                Head : 0,
                Speed : 0,
                Flow : 0,
                Torque : 0,
                DischargePressure : 0,
                SuctionPressure : 0,
                Voltage : 0,
                Current : 0,
                Power : 0,
                Temperature : 0,
                Vibration : 0
            },
            pumpSwitch : false 
        }
    }

    componentWillUnmount(){
        clearInterval(startInterval);
    }

    handleChange = (event: React.MouseEvent,property) => {
        let newpropertiesList = [...this.state.properties];
        let updatedProperties = new Array();
        let objIndex = newpropertiesList.findIndex(propertyName => propertyName.name === property.name);
        
        newpropertiesList.forEach(element => {
            if(element.checked){
                updatedProperties.push({
                    name : element.name,
                    checked : !element.checked
                })
            }else{
                updatedProperties.push({
                    name : element.name,
                    checked : element.checked
                }) 
            }
        });

        let newObj = {
            name : property.name,
            checked : !property.checked
        }
        
        let updateObj = {
            ...updatedProperties[objIndex],
            ...newObj
        };
        
        updatedProperties[objIndex] = updateObj;

        let faultBody = {
            "deviceId": "ML-Pump002",
            "temperature": "35",
            "dischargePressure": "29",
            "suctionPressure": "39",
            "vibration": "19",
            "flow": "31.097",
            "head": "24.059",
            "speed": "2858.9",
            "torque": "10.171",
            "power": "200",
            "voltage": "220",
            "current": "80"
        }
        
        this.setState({
            properties : updatedProperties
        },() => {
            if(!property.checked){
                this.props.onGetAssetFaultValue({faultValue : property.name});
                this.props.onPostAssetFaultValue(faultBody);
                clearInterval(startInterval);
            }else{
                this.props.onGetAssetFaultValue({faultValue : "No Value"});
                if(this.state.pumpSwitch){
                    this.props.onGetAssetHealthyValue();
                    startInterval = setInterval(() => {
                        this.props.onGetAssetHealthyValue();            
                    }, 60000);
                }                
            }      
            
        });

    }

    handlePumpSwitch = () => {
        this.setState({
            pumpSwitch : !this.state.pumpSwitch
        },() => {
            if(this.state.pumpSwitch){
                this.props.onGetAssetHealthyValue();
                startInterval = setInterval(() => {
                    this.props.onGetAssetHealthyValue();            
                },60000);
            }else{
                clearInterval(startInterval); 
            }
        });
    }

    renderAssetProperty = () => {
        let assetPropertyList = (
            <div>
                <h2 className={classes.propertyHeading}>Controls</h2>
                {this.state.properties.map((property,index) => {
                    return(  
                        <Card key={index} className={classes.root} elevation={2}>
                            <CardContent className={classes.cardContent}>
                                <Grid container item key={index} spacing={2} justify="space-between" alignItems="center">
                                    <Grid item>
                                        {property.name}                                    
                                    </Grid>
                                    <Grid item>
                                        <Switch disabled={!this.state.pumpSwitch} checkedStatus={property.checked} changed={(event) => this.handleChange(event,property)}/>
                                    </Grid>
                                </Grid>
                            </CardContent>                            
                        </Card>                    
                    )
                })}
            </div>            
        );        
        return assetPropertyList;
    }

    renderAssetPropertyImage = () => {
        let assetPropertyImage = (
            <Card className={classes.root} elevation={2}>
                <CardContent className={classes.cardContent}>
                {this.state.pumpSwitch === false ? 
                    <div className={classes.pump}></div>
                    :
                    <div className={classes.pump_animation}></div>
                }
                </CardContent>
            </Card>
        )
        return assetPropertyImage;
    }

    renderAssetPropertyValue = () => {
        const propertyValueList = new Array();

        for(let key in this.props.assetSimulatorValue){
            let obj = {
                propertyName : key,
                propertyValue : this.props.assetSimulatorValue[key]
            }
            propertyValueList.push(obj);
        }
        let assetPropertyValueList = (
            <div>
                <Card className={classes.root} elevation={2}>
                    <CardContent className={classes.cardContent}>
                        <Grid container spacing={2} justify="space-between" alignItems="center">
                            <Grid item>
                                Pump
                            </Grid>
                            <Grid item>
                                <Switch checkedStatus={this.state.pumpSwitch} changed={this.handlePumpSwitch}/>
                            </Grid>
                        </Grid> 
                    </CardContent>
                </Card>
                
                <h2 className={classes.propertyHeading}>Tag Values</h2>
                
                {propertyValueList.map((property,index) => {
                    return(
                        <Card key={index} className={classes.root} elevation={3}>
                            <CardContent className={classes.propertyValue}>
                                <Grid item container key={index} spacing={2} justify="space-between" alignItems="center">
                                    <Grid item>
                                        {property.propertyName}                                    
                                    </Grid>
                                    <Grid item>
                                        {property.propertyValue}
                                    </Grid>
                                </Grid>
                            </CardContent>
                        </Card>
                         
                    )
                })}
            </div>
        )
        return assetPropertyValueList;
    }

    render(){        
        return(
            <Grid container spacing={2}>
                <Grid item xs={12} md={3} lg={3}>
                    <this.renderAssetProperty />
                </Grid>
                <Grid item xs={12} md={6} lg={6}>
                    <this.renderAssetPropertyImage />
                </Grid>
                <Grid item xs={12} md={3} lg={3}>
                    <this.renderAssetPropertyValue />
                </Grid>   
            </Grid>
        )
    }
}

const mapStateToProps = state => {
    return{
        assetSimulatorValue : state.assetSimulator.assetSimulatorValue,
    }
}

const mapDispatchToProps = dispatch => {
    return{
        onGetAssetFaultValue : (faultSelectedValue) => dispatch(actions.getSimulatorFaultValue(faultSelectedValue)),
        onPostAssetFaultValue :  (faultBody) => dispatch(actions.postAssetFaultValue(faultBody)),
        onGetAssetHealthyValue : () => dispatch(actions.getAssetHealthyValue())
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(AssetSimulator);