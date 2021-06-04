import React, { Component } from "react";
import { connect } from "react-redux";
import { gaugeInfoModel } from "../../../interfaceModels/gaugeInfoModel";
import { predictionListModel } from "../../../interfaceModels/predictionListModel";
import * as actions from '../../../store/actions/index';
import AnalyticsElementComponent from "../../../components/Assets/FaultAnalysis/AnalyticsElementComponent/AnalyticsElementComponent";
import AnalyticsProbabilityComponent from '../../../components/Assets/FaultAnalysis/AnalyticsProbabilityComponent/AnalyticsProbabilityComponent';
import AnalyticsPredictionComponent from "../../../components/Assets/FaultAnalysis/AnalyticsPredictionComponent/AnalyticsPredictionComponent";
import moment from 'moment';

interface FaultClassificationProps {
    onGetGaugeValue: () => void;
    onGetLastTenPrediction: () => void;
    onGetProbabilityStatus: (configType: string, fromTimeStamp:any, toTimeStamp: any) => void;
    onGetCountStatus: (configType: string, fromTimeStamp:any, toTimeStamp: any) => void;
    onGetFaultPrediction: (configType: string, fromTimeStamp:any, toTimeStamp: any) => void;
    onGetIdentificationGaugeValue: () => void;
    onGetIdentificationLastTenPrediction: () => void;
    onGetIdentificationProbabilityStatus: (configType: string, fromTimeStamp:any, toTimeStamp: any) => void;
    onGetIdentificationCountStatus: (configType: string, fromTimeStamp:any, toTimeStamp: any) => void;
    onGetIdentificationFaultPrediction: (configType: string, fromTimeStamp:any, toTimeStamp: any) => void;
    gaugeInfo: gaugeInfoModel[];
    predictionList: predictionListModel[];
    analyticalProbabilityInfo: analyticalProbabilityProperties;
    analyticalCountInfo: analyticalCountProperties;
    analyticalFaultPredictionInfo: analyticalFaultPredictionInfo;
    assetId: string;
    configType: string;
    appliedFilterDate: any;
    graphType: string;
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

interface analyticalFaultPredictionInfo{
  valueAxes : string;
  categoryAxes : string;
  predictionList : any;
}

let configType:string;
let deviceId:string;
let toStartInterval:any;
let fromTimeStamp:any;
let toTimeStamp:any;

class FaultClassification extends Component<FaultClassificationProps> {
  constructor(props: FaultClassificationProps) {
    super(props);
  }

  componentDidMount() {
    deviceId = this.props.assetId;
    configType = this.props.configType;
    let today = new Date();
    let todayStartingTime = today.toDateString();
    let todayCurrentTime = today.toString();
    fromTimeStamp = Date.parse(todayStartingTime);
    toTimeStamp = moment().valueOf();

    if(configType === 'FaultClassification'){
      this.invokeClassificationTabGraph(configType,fromTimeStamp,toTimeStamp);
      toStartInterval = setInterval(() => {
          this.invokeClassificationTabGraph(configType,fromTimeStamp,toTimeStamp);
      },30000);
    }else{
      this.invokeIdentificationTabGraph(configType,fromTimeStamp,toTimeStamp);
      toStartInterval = setInterval(() => {
          this.invokeIdentificationTabGraph(configType,fromTimeStamp,toTimeStamp);
      },30000);
    }
    
  }

  invokeClassificationTabGraph = (configType,fromTimeStamp,toTimeStamp) =>{
    this.props.onGetGaugeValue();
    this.props.onGetLastTenPrediction();
    this.props.onGetProbabilityStatus(configType,fromTimeStamp,toTimeStamp);
    this.props.onGetCountStatus(configType,fromTimeStamp,toTimeStamp);
    this.props.onGetFaultPrediction(configType,fromTimeStamp,toTimeStamp);
  }

  invokeIdentificationTabGraph = (configType,fromTimeStamp,toTimeStamp) =>{
    this.props.onGetIdentificationGaugeValue();
    this.props.onGetIdentificationLastTenPrediction();
    this.props.onGetIdentificationProbabilityStatus(configType,fromTimeStamp,toTimeStamp);
    this.props.onGetIdentificationCountStatus(configType,fromTimeStamp,toTimeStamp);
    this.props.onGetIdentificationFaultPrediction(configType,fromTimeStamp,toTimeStamp);
  }

  onSelectTimePeriod = (timePeriod) => {
    let today = new Date();
    if(timePeriod === 'today'){
      let todayStartingTime = today.toDateString();
      let todayCurrentTime = moment().valueOf();
      fromTimeStamp = Date.parse(todayStartingTime);
      toTimeStamp = todayCurrentTime;
      if(configType === 'FaultClassification'){
        this.props.onGetProbabilityStatus(configType,fromTimeStamp,toTimeStamp);
        this.props.onGetCountStatus(configType,fromTimeStamp,toTimeStamp);
        this.props.onGetFaultPrediction(configType,fromTimeStamp,toTimeStamp);
      }else{
        this.props.onGetIdentificationProbabilityStatus(configType,fromTimeStamp,toTimeStamp);
        this.props.onGetIdentificationCountStatus(configType,fromTimeStamp,toTimeStamp);
        this.props.onGetIdentificationFaultPrediction(configType,fromTimeStamp,toTimeStamp);
      }      
    }else if(timePeriod === 'lastday'){
      const yesterday = new Date(today);
      let lastday = yesterday.setDate(yesterday.getDate() - 1);
      let start = new Date(lastday);
      fromTimeStamp = start.setHours(0,0,0,0);
      let end = new Date(lastday);
      toTimeStamp = end.setHours(23,59,59,999);
      if(configType === 'FaultClassification'){
        this.props.onGetProbabilityStatus(configType,fromTimeStamp,toTimeStamp);
        this.props.onGetCountStatus(configType,fromTimeStamp,toTimeStamp);
        this.props.onGetFaultPrediction(configType,fromTimeStamp,toTimeStamp);
      }else{
        this.props.onGetIdentificationProbabilityStatus(configType,fromTimeStamp,toTimeStamp);
        this.props.onGetIdentificationCountStatus(configType,fromTimeStamp,toTimeStamp);
        this.props.onGetIdentificationFaultPrediction(configType,fromTimeStamp,toTimeStamp);
      }
    }else if(timePeriod === 'lastweek'){
      let lastWeekStartDay = moment().subtract(1, 'week').startOf('week');
      let lastWeekEndDay = moment().subtract(1, 'week').endOf('week');
      fromTimeStamp = lastWeekStartDay;
      toTimeStamp = lastWeekEndDay;
      if(configType === 'FaultClassification'){
        this.props.onGetProbabilityStatus(configType,fromTimeStamp,toTimeStamp);
        this.props.onGetCountStatus(configType,fromTimeStamp,toTimeStamp);
        this.props.onGetFaultPrediction(configType,fromTimeStamp,toTimeStamp);
      }else{
        this.props.onGetIdentificationProbabilityStatus(configType,fromTimeStamp,toTimeStamp);
        this.props.onGetIdentificationCountStatus(configType,fromTimeStamp,toTimeStamp);
        this.props.onGetIdentificationFaultPrediction(configType,fromTimeStamp,toTimeStamp);
      }
    }else if(timePeriod === 'lastmonth'){
      let lastMonthStartDay = moment().subtract(1, 'month').startOf('month');
      let lastMonthEndDay = moment().subtract(1, 'month').endOf('month');
      fromTimeStamp = lastMonthStartDay;
      toTimeStamp = lastMonthEndDay;
      if(configType === 'FaultClassification'){
        this.props.onGetProbabilityStatus(configType,fromTimeStamp,toTimeStamp);
        this.props.onGetCountStatus(configType,fromTimeStamp,toTimeStamp);
        this.props.onGetFaultPrediction(configType,fromTimeStamp,toTimeStamp);
      }else{
        this.props.onGetIdentificationProbabilityStatus(configType,fromTimeStamp,toTimeStamp);
        this.props.onGetIdentificationCountStatus(configType,fromTimeStamp,toTimeStamp);
        this.props.onGetIdentificationFaultPrediction(configType,fromTimeStamp,toTimeStamp);
      }
    }
  }

  componentDidUpdate(prevProps){
    if(prevProps.appliedFilterDate !== this.props.appliedFilterDate){
      let fromTime  = this.props.appliedFilterDate.fromTimestamp;
      let toTime  = this.props.appliedFilterDate.toTimestamp;
      fromTimeStamp = Date.parse(fromTime.toString());
      toTimeStamp = Date.parse(toTime.toString());
      if(configType === 'FaultClassification'){
        this.props.onGetProbabilityStatus(configType,fromTimeStamp,toTimeStamp);
        this.props.onGetCountStatus(configType,fromTimeStamp,toTimeStamp); 
        this.props.onGetFaultPrediction(configType,fromTimeStamp,toTimeStamp);
      }else{
        this.props.onGetIdentificationProbabilityStatus(configType,fromTimeStamp,toTimeStamp);
        this.props.onGetIdentificationCountStatus(configType,fromTimeStamp,toTimeStamp);
        this.props.onGetIdentificationFaultPrediction(configType,fromTimeStamp,toTimeStamp);
      }      
    }
  }

  componentWillUnmount(){
      clearInterval(toStartInterval);
  }

  render() {
    let tenRecords = this.props.predictionList.filter(item => item.timestamp <= moment().valueOf()).slice(0, 10);
            
    return (
      <div style={{ margin: "0 15px" }}>
        <AnalyticsElementComponent
          analyticalElementInfo={this.props.gaugeInfo}
        />
        <AnalyticsProbabilityComponent 
          analyticalProbabilityInfo={this.props.analyticalProbabilityInfo}
          analyticalCountInfo={this.props.analyticalCountInfo}
          analyticalFaultPredictionInfo={this.props.analyticalFaultPredictionInfo}
          onSelectTimePeriod={this.onSelectTimePeriod}
          configType={this.props.configType}
          graphType={this.props.graphType}
        />
        <AnalyticsPredictionComponent analyticalPredictionList={tenRecords} />
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
        analyticalFaultPredictionInfo : state.faultClassification.analyticalFaultPredictionInfo,
        appliedFilterDate : state.assetDetailsDateFilter.appliedFilterDate
    }
    case "FaultIdentification":
      return {
        gaugeInfo : state.faultIdentification.gaugeInfo,
        predictionList : state.faultIdentification.predictionList,
        analyticalProbabilityInfo : state.faultIdentification.analyticalProbabilityInfo,
        analyticalFaultPredictionInfo : state.faultIdentification.analyticalFaultPredictionInfo,
        analyticalCountInfo : state.faultIdentification.analyticalCountInfo,
        appliedFilterDate : state.assetDetailsDateFilter.appliedFilterDate
    }
  } 
}

const mapDispatchToProps = (dispatch,configType) => {
  switch (configType.configType) {
    case "FaultClassification":
      return {
        onGetGaugeValue: () => dispatch(actions.getGaugeValue(configType.configType,deviceId)),
        onGetLastTenPrediction: () => dispatch(actions.getLastTenPredictionValue(configType.configType,deviceId)),
        onGetProbabilityStatus: (configType,fromTimeStamp,toTimeStamp) => dispatch(actions.getProbabilityStatusValue(configType,deviceId,fromTimeStamp,toTimeStamp)),
        onGetCountStatus: (configType,fromTimeStamp,toTimeStamp) => dispatch(actions.getCountStatusValue(configType,deviceId,fromTimeStamp,toTimeStamp)),
        onGetFaultPrediction: (configType,fromTimeStamp,toTimeStamp) => dispatch(actions.getFaultPredictionValue(configType,deviceId,fromTimeStamp,toTimeStamp))
      }
    case "FaultIdentification":
      return {
        onGetIdentificationGaugeValue: () => dispatch(actions.getIdentificationGaugeValue(configType.configType,deviceId)),
        onGetIdentificationLastTenPrediction: () => dispatch(actions.getIdentificationLastTenPredictionValue(configType.configType,deviceId)),
        onGetIdentificationProbabilityStatus: (configType,fromTimeStamp,toTimeStamp) => dispatch(actions.getIdentificationProbabilityStatusValue(configType,deviceId,fromTimeStamp,toTimeStamp)),
        onGetIdentificationCountStatus: (configType,fromTimeStamp,toTimeStamp) => dispatch(actions.getIdentificationCountStatusValue(configType,deviceId,fromTimeStamp,toTimeStamp)),
        onGetIdentificationFaultPrediction: (configType,fromTimeStamp,toTimeStamp) => dispatch(actions.getIdentificationFaultPredictionValue(configType,deviceId,fromTimeStamp,toTimeStamp))
    }
  }
    
}


export default connect(mapStateToProps,mapDispatchToProps)(FaultClassification);
