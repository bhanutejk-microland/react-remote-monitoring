import React, { Component } from "react";
import { unixTimestampToDateTimeconverter } from '../../../utilities/timeStampConverter';
import AnalyticsElementComponent from "./AnalyticsElementComponent/AnalyticsElementComponent";
import AnalyticsProbabilityComponent from './AnalyticsProbabilityComponent/AnalyticsProbabilityComponent';
import AnalyticsPredictionComponent from "./AnalyticsPredictionComponent/AnalyticsPredictionComponent";

interface FaultIdentificationProps{}

interface analyticalElement {
    name: string;
    min: number;
    max: number;
    value: number;
  }
  
  interface predictionElementProperties {
    dateTime: string;
    head: number;
    speed: number;
    flow: number;
    torque: number;
    faultStatus: string;
  }
  
  interface analyticalProbabilityElement{
    name: string;
    value: number;
  }
  
  interface analyticalCountElement{
    name: string;
    value: number;
  }
  
  interface analyticalProbabilityProperties{
    valueAxes : string;
    categoryAxes : string;
    probabilityList : analyticalProbabilityElement[];
  }
  
  interface analyticalCountProperties{
    valueAxes : string;
    categoryAxes : string;
    countList : analyticalCountElement[];
  }
  
  interface FaultIdentificationState {
    analyticalElementInfo: analyticalElement[],
    analyticalProbabilityInfo: analyticalProbabilityProperties,
    analyticalCountInfo: analyticalCountProperties,
    analyticalPredictionList: predictionElementProperties[]
  }
  

class FaultIdentificationAnalysis extends Component<FaultIdentificationProps,FaultIdentificationState>{
    constructor(props:FaultIdentificationProps){
        super(props);
        this.state = {
                analyticalElementInfo: [
                  {
                    name: "Head",
                    min: 0,
                    max: 100,
                    value: 65
                  },
                  {
                    name: "Flow",
                    min: 0,
                    max: 100,
                    value: 75
                  },
                  {
                    name: "Speed",
                    min: 0,
                    max: 100,
                    value: 45
                  },
                  {
                    name: "Torque",
                    min: 0,
                    max: 100,
                    value: 55
                  }
                ],
                analyticalProbabilityInfo :{
                  categoryAxes : "Probability of assets status",
                  valueAxes : "Probability",
                  probabilityList : [{
                    "name": "Fault",
                    "value": 40,
                  }, {
                    "name": "No Fault",
                    "value": 32,
                  }]
                },
                analyticalCountInfo :{
                  categoryAxes : "Count Occurence",
                  valueAxes : "Count",
                  countList : [{
                    "name": "Fault",
                    "value": 300,
                  }, {
                    "name": "No Fault",
                    "value": 222,
                  }]
                },
                analyticalPredictionList :[{
                  dateTime: unixTimestampToDateTimeconverter(new Date()),
                  head: 10,
                  speed: 10,
                  flow: 10,
                  torque: 10,
                  faultStatus: "Fault"
                },{
                  dateTime: unixTimestampToDateTimeconverter(new Date()),
                  head: 10,
                  speed: 10,
                  flow: 10,
                  torque: 10,
                  faultStatus: "No Fault"
                },{
                  dateTime: unixTimestampToDateTimeconverter(new Date()),
                  head: 10,
                  speed: 10,
                  flow: 10,
                  torque: 10,
                  faultStatus: "Fault"
                },{
                  dateTime: unixTimestampToDateTimeconverter(new Date()),
                  head: 10,
                  speed: 10,
                  flow: 10,
                  torque: 10,
                  faultStatus: "Fault"
                },{
                  dateTime: unixTimestampToDateTimeconverter(new Date()),
                  head: 10,
                  speed: 10,
                  flow: 10,
                  torque: 10,
                  faultStatus: "Fault"
                },{
                  dateTime: unixTimestampToDateTimeconverter(new Date()),
                  head: 10,
                  speed: 10,
                  flow: 10,
                  torque: 10,
                  faultStatus: "Fault"
                },{
                  dateTime: unixTimestampToDateTimeconverter(new Date()),
                  head: 10,
                  speed: 10,
                  flow: 10,
                  torque: 10,
                  faultStatus: "No Fault"
                },{
                  dateTime: unixTimestampToDateTimeconverter(new Date()),
                  head: 10,
                  speed: 10,
                  flow: 10,
                  torque: 10,
                  faultStatus: "Fault"
                },{
                  dateTime: unixTimestampToDateTimeconverter(new Date()),
                  head: 10,
                  speed: 10,
                  flow: 10,
                  torque: 10,
                  faultStatus: "Fault"
                },{
                  dateTime: unixTimestampToDateTimeconverter(new Date()),
                  head: 10,
                  speed: 10,
                  flow: 10,
                  torque: 10,
                  faultStatus: "Fault"
                }]
            }  
        }
    

    render(){
        return(
            <div>
                <AnalyticsElementComponent
                    analyticalElementInfo={this.state.analyticalElementInfo}
                />
                <AnalyticsProbabilityComponent 
                    analyticalProbabilityInfo={this.state.analyticalProbabilityInfo}
                    analyticalCountInfo={this.state.analyticalCountInfo}
                />
                <AnalyticsPredictionComponent analyticalPredictionList={this.state.analyticalPredictionList} />
            </div>
        )
    }
}

export default FaultIdentificationAnalysis;