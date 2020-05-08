import React, { Component } from "react";
import { connect } from "react-redux";
import { gaugeInfoModel } from "../../../interfaceModels/gaugeInfoModel";
import { predictionListModel } from "../../../interfaceModels/predictionListModel";
import * as actions from '../../../store/actions/index';
import { unixTimestampToDateTimeconverter } from '../../../utilities/timeStampConverter';
import AnalyticsElementComponent from "../../../components/Assets/FaultAnalysis/AnalyticsElementComponent/AnalyticsElementComponent";
import AnalyticsProbabilityComponent from '../../../components/Assets/FaultAnalysis/AnalyticsProbabilityComponent/AnalyticsProbabilityComponent';
import AnalyticsPredictionComponent from "../../../components/Assets/FaultAnalysis/AnalyticsPredictionComponent/AnalyticsPredictionComponent";

interface FaultClassificationProps {
    onGetGaugeValue: () => void;
    onGetFaultStatus: () => void;
    onGetLastTenPrediction: () => void;
    gaugeInfo: gaugeInfoModel[];
    faultStatus: {fault : string};
    predictionList: predictionListModel[];
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

interface AnalyticsState {
  analyticalElementInfo: gaugeInfoModel[],
  analyticalProbabilityInfo: analyticalProbabilityProperties,
  analyticalCountInfo: analyticalCountProperties,
  analyticalPredictionList: predictionListModel[]
}

let toStartInterval:any;

class FaultClassification extends Component<FaultClassificationProps, AnalyticsState> {
  constructor(props: FaultClassificationProps) {
    super(props);
    this.state = {
      analyticalElementInfo : [],  
      analyticalProbabilityInfo :{
        categoryAxes : "Probability of assets status",
        valueAxes : "Probability",
        probabilityList : [{
          "name": "Broken Blade",
          "value": 40,
        }, {
          "name": "Cavitation",
          "value": 32,
        },{
          "name": "Clearance Wear",
          "value": 10,
        },{
          "name": "Healthy",
          "value": 5,
        },{
          "name": "Inlet Deposit",
          "value": 10,
        },{
          "name": "Outlet Deposit",
          "value": 3,
        }]
      },
      analyticalCountInfo :{
        categoryAxes : "Count Occurence",
        valueAxes : "Count",
        countList : [{
          "name": "Broken Blade",
          "value": 300,
        }, {
          "name": "Cavitation",
          "value": 222,
        },{
          "name": "Clearance Wear",
          "value": 176,
        },{
          "name": "Healthy",
          "value": 200,
        },{
          "name": "Inlet Deposit",
          "value": 123,
        },{
          "name": "Outlet Deposit",
          "value": 145,
        }]
      },
      analyticalPredictionList :[]
    }
  }

  componentDidMount() {
    toStartInterval = setInterval(() => {
        this.props.onGetGaugeValue();
        this.props.onGetFaultStatus();
        this.props.onGetLastTenPrediction();
    },10000);
  }

  componentWillUnmount(){
      clearInterval(toStartInterval);
  }

  render() {
    return (
      <div style={{ margin: "0 15px" }}>
        <AnalyticsElementComponent
          analyticalElementInfo={this.props.gaugeInfo}
          faultStatus={this.props.faultStatus}
        />
        <AnalyticsProbabilityComponent 
          analyticalProbabilityInfo={this.state.analyticalProbabilityInfo}
          analyticalCountInfo={this.state.analyticalCountInfo}
        />
        <AnalyticsPredictionComponent analyticalPredictionList={this.props.predictionList} />
      </div>
    );
  }
}

const mapStateToProps = state => {
    return{
        gaugeInfo : state.faultClassification.gaugeInfo,
        faultStatus : state.faultClassification.faultStatus,
        predictionList : state.faultClassification.predictionList
    }
}

const mapDispatchToProps = dispatch => {
    return{
        onGetGaugeValue: () => dispatch(actions.getGaugeValue()),
        onGetFaultStatus: () => dispatch(actions.getFaultStatusValue()),
        onGetLastTenPrediction: () => dispatch(actions.getLastTenPredictionValue())
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(FaultClassification);
