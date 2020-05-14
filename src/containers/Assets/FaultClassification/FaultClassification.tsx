import React, { Component } from "react";
import { connect } from "react-redux";
import { gaugeInfoModel } from "../../../interfaceModels/gaugeInfoModel";
import { predictionListModel } from "../../../interfaceModels/predictionListModel";
import * as actions from '../../../store/actions/index';
import AnalyticsElementComponent from "../../../components/Assets/FaultAnalysis/AnalyticsElementComponent/AnalyticsElementComponent";
import AnalyticsProbabilityComponent from '../../../components/Assets/FaultAnalysis/AnalyticsProbabilityComponent/AnalyticsProbabilityComponent';
import AnalyticsPredictionComponent from "../../../components/Assets/FaultAnalysis/AnalyticsPredictionComponent/AnalyticsPredictionComponent";

interface FaultClassificationProps {
    onGetGaugeValue: () => void;
    onGetLastTenPrediction: () => void;
    onGetProbabilityStatus: () => void;
    onGetCountStatus: () => void;
    onGetIdentificationGaugeValue: () => void;
    onGetIdentificationLastTenPrediction: () => void;
    onGetIdentificationProbabilityStatus: () => void;
    onGetIdentificationCountStatus: () => void;
    gaugeInfo: gaugeInfoModel[];
    predictionList: predictionListModel[];
    analyticalProbabilityInfo: analyticalProbabilityProperties;
    analyticalCountInfo: analyticalCountProperties;
    assetId: string;
    configType: string;
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

let configType:string;
let deviceId:string;
let toStartInterval:any;
let fromTimeStamp:any;
let toTimeStamp:any;
let today = new Date();
let todayStartingTime = today.toDateString();
let todayCurrentTime = today.toString();
fromTimeStamp = Date.parse(todayStartingTime);
toTimeStamp = Date.parse(todayCurrentTime);

class FaultClassification extends Component<FaultClassificationProps> {
  constructor(props: FaultClassificationProps) {
    super(props);
  }

  componentDidMount() {
    deviceId = this.props.assetId;
    configType = this.props.configType;
    if(configType === 'FaultClassification'){
      toStartInterval = setInterval(() => {
          this.invokeClassificationTabGraph();
      },10000);
    }else{
      toStartInterval = setInterval(() => {
          this.invokeIdentificationTabGraph();
      },30000);
    }
    
  }

  invokeClassificationTabGraph = () =>{
    this.props.onGetGaugeValue();
    this.props.onGetLastTenPrediction();
    this.props.onGetProbabilityStatus();
    this.props.onGetCountStatus();
  }

  invokeIdentificationTabGraph = () =>{
    this.props.onGetIdentificationGaugeValue();
    this.props.onGetIdentificationLastTenPrediction();
    this.props.onGetIdentificationProbabilityStatus();
    this.props.onGetIdentificationCountStatus();
  }

  onSelectTimePeriod = (timePeriod) => {
    if(timePeriod === 'today'){
      fromTimeStamp = Date.parse(todayStartingTime);
      toTimeStamp = Date.parse(todayCurrentTime);
    }else if(timePeriod === 'lastday'){
      const yesterday = new Date(today);
      let lastday = yesterday.setDate(yesterday.getDate() - 1);
      let start = new Date(lastday);
      fromTimeStamp = start.setHours(0,0,0,0);
      let end = new Date(lastday);
      toTimeStamp = end.setHours(23,59,59,999);
    }else if(timePeriod === 'lastweek'){
    }else if(timePeriod === 'lastmonth'){
    }
  }

  componentWillUnmount(){
      clearInterval(toStartInterval);
  }

  render() {
    return (
      <div style={{ margin: "0 15px" }}>
        <AnalyticsElementComponent
          analyticalElementInfo={this.props.gaugeInfo}
        />
        <AnalyticsProbabilityComponent 
          analyticalProbabilityInfo={this.props.analyticalProbabilityInfo}
          analyticalCountInfo={this.props.analyticalCountInfo}
          onSelectTimePeriod={this.onSelectTimePeriod}
        />
        <AnalyticsPredictionComponent analyticalPredictionList={this.props.predictionList} />
      </div>
    );
  }
}



const mapStateToProps = (state,configType) => {
  switch (configType.configType) {
    case "FaultClassification":
      return {
        gaugeInfo : state.faultClassification.gaugeInfo,
        predictionList : state.faultClassification.predictionList,
        analyticalProbabilityInfo : state.faultClassification.analyticalProbabilityInfo,
        analyticalCountInfo : state.faultClassification.analyticalCountInfo,
    }
    case "FaultIdentification":
      return {
        gaugeInfo : state.faultIdentification.gaugeInfo,
        predictionList : state.faultIdentification.predictionList,
        analyticalProbabilityInfo : state.faultIdentification.analyticalProbabilityInfo,
        analyticalCountInfo : state.faultIdentification.analyticalCountInfo,
    }
  } 
}

const mapDispatchToProps = (dispatch,configType) => {
  switch (configType.configType) {
    case "FaultClassification":
      return {
        onGetGaugeValue: () => dispatch(actions.getGaugeValue(configType.configType,deviceId)),
        onGetLastTenPrediction: () => dispatch(actions.getLastTenPredictionValue(configType.configType,deviceId)),
        onGetProbabilityStatus: () => dispatch(actions.getProbabilityStatusValue(configType.configType,deviceId,fromTimeStamp,toTimeStamp)),
        onGetCountStatus: () => dispatch(actions.getCountStatusValue(configType.configType,deviceId,fromTimeStamp,toTimeStamp))
      }
    case "FaultIdentification":
      return {
        onGetIdentificationGaugeValue: () => dispatch(actions.getIdentificationGaugeValue(configType.configType,deviceId)),
        onGetIdentificationLastTenPrediction: () => dispatch(actions.getIdentificationLastTenPredictionValue(configType.configType,deviceId)),
        onGetIdentificationProbabilityStatus: () => dispatch(actions.getIdentificationProbabilityStatusValue(configType.configType,deviceId,fromTimeStamp,toTimeStamp)),
        onGetIdentificationCountStatus: () => dispatch(actions.getIdentificationCountStatusValue(configType.configType,deviceId,fromTimeStamp,toTimeStamp))
    }
  }
    
}


export default connect(mapStateToProps,mapDispatchToProps)(FaultClassification);
