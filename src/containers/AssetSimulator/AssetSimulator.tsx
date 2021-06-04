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
    onGetAssetHealthyValue: (position: number) => void;
    onPostAssetFaultValue: (faultBody: any) => void;
    onGetActualFaultValue: (faultSelectedValue: any) => void; 
    assetSimulatorList: any;
    assetSimulatorValue: any;
    assetSimulatorFaultValue: any;
    actualFaultvalue: any;
}

interface AssetSimulatorState {
    properties: propertyElement[];
    propertiesValues: any;
    pumpSwitch: boolean;
    faultSelectedName: string;
    position: number;
}

interface propertyElement {
    name: string;
    checked: boolean;
}

let startInterval: any;

let position: number = 0;

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
                },{
                    name : "Anomaly",
                    checked : false
                }
            ],
            propertiesValues : {
                head : 0,
                speed : 0,
                flow : 0,
                torque : 0,
                dischargePressure : 0,
                suctionPressure : 0,
                voltage : 0,
                current : 0,
                power : 0,
                temperature : 0,
                vibration : 0
            },
            pumpSwitch : false,
            faultSelectedName : '',
            position: 0 
        }
    }

    componentWillUnmount(){
        clearInterval(startInterval);
    }

    componentDidUpdate(prevProps){
        if(this.props.assetSimulatorFaultValue !== '' &&
            prevProps.assetSimulatorFaultValue !== this.props.assetSimulatorFaultValue){
            let faultBody = this.props.assetSimulatorFaultValue;
            this.props.onPostAssetFaultValue(faultBody);
        }

        if(this.props.assetSimulatorValue !== '' &&
            prevProps.assetSimulatorValue !== this.props.assetSimulatorValue){
            let faultBody = this.props.assetSimulatorValue;
            this.props.onPostAssetFaultValue(faultBody);
        }
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

        //Post Asset Simulator Data        
        this.setState({
            properties : updatedProperties,
            faultSelectedName : property.name
        },() => {
            if(!property.checked){
                this.props.onGetActualFaultValue({faultValue : property.name});
            }   
        });

    }

    handlePumpSwitch = () => {
        let updatedProperties = new Array();
        if(this.state.properties.filter(e => e.checked === true).length > 0){        
            let newpropertiesList = [...this.state.properties]; 
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
        }else{
            updatedProperties = [...this.state.properties];
        }    
        
        this.setState({
            pumpSwitch : !this.state.pumpSwitch,
            properties : updatedProperties
        },() => {
            if(this.state.pumpSwitch){
                let faultBody = this.props.assetSimulatorValue;
                this.props.onPostAssetFaultValue(faultBody);
                startInterval = setInterval(() => {
                    if(this.state.properties.filter(e => e.checked === true).length > 0){
                        this.props.onGetAssetFaultValue({faultValue : this.state.faultSelectedName});
                    }else{
                        if(position === 25){
                           position = 0; 
                        }
                        this.props.onGetAssetHealthyValue(position);     
                        position++;                  
                    }                       
                },1000 * 60 * 60);
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
                                        <Switch disabled={ true} checkedStatus={property.checked} changed={(event) => this.handleChange(event,property)}/>
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
        if(this.state.properties.filter(e => e.checked === true).length > 0){
            for(let key in this.props.actualFaultvalue){
                let obj = {
                    propertyName : key,
                    propertyValue : this.props.actualFaultvalue[key]
                }
                propertyValueList.push(obj);
            }           
            
        }else{
            for(let key in this.props.assetSimulatorValue){
                let obj = {
                    propertyName : key,
                    propertyValue : this.props.assetSimulatorValue[key]
                }
                propertyValueList.push(obj);
            }            
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
        actualFaultvalue : state.assetSimulator.actualFaultValue,
        assetSimulatorValue : state.assetSimulator.assetSimulatorValue,
        assetSimulatorFaultValue : state.assetSimulator.assetSimulatorFaultValue
    }
}

const mapDispatchToProps = dispatch => {
    return{
        onGetAssetFaultValue : (faultSelectedValue) => dispatch(actions.getSimulatorFaultValue(faultSelectedValue)),
        onPostAssetFaultValue :  (faultBody) => dispatch(actions.postAssetFaultValue(faultBody)),
        onGetAssetHealthyValue : (position) => dispatch(actions.getAssetHealthyValue(position)),
        onGetActualFaultValue : (faultSelectedValue) => dispatch(actions.getActualFaultValue(faultSelectedValue))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(AssetSimulator);