import React, { Component } from "react";
import { unixTimestampToDateTimeconverter } from '../../utilities/timeStampConverter';
import AnalyticsElementComponent from "./AnalyticsElementComponent/AnalyticsElementComponent";
import AnalyticsProbabilityComponent from './AnalyticsProbabilityComponent/AnalyticsProbabilityComponent';
import AnalyticsPredictionComponent from "../Analytics/AnalyticsPredictionComponent/AnalyticsPredictionComponent";
import { gaugeInfoModel } from "../../interfaceModels/gaugeInfoModel";
interface AnalyticsProps { }

interface predictionElementProperties {
  dateTime: string;
  head: number;
  speed: number;
  flow: number;
  torque: number;
  faultStatus: string;
}

interface analyticalProbabilityElement {
  name: string;
  value: number;
}

interface analyticalCountElement {
  name: string;
  value: number;
}

interface analyticalProbabilityProperties {
  valueAxes: string;
  categoryAxes: string;
  probabilityList: analyticalProbabilityElement[];
}

interface analyticalCountProperties {
  valueAxes: string;
  categoryAxes: string;
  countList: analyticalCountElement[];
}

interface AnalyticsState {
  analyticalElementInfo: gaugeInfoModel[],
  analyticalProbabilityInfo: analyticalProbabilityProperties,
  analyticalCountInfo: analyticalCountProperties,
  analyticalPredictionList: predictionElementProperties[]
}

const predictionInfoHeaders = [
  { id: "dateTime", numeric: false, disablePadding: false, label: "DATETIME" },
  { id: "head", numeric: false, disablePadding: false, label: "HEAD" },
  { id: "flow", numeric: false, disablePadding: false, label: "FLOW" },
  { id: "speed", numeric: false, disablePadding: false, label: "SPEED" },
  { id: "torque", numeric: false, disablePadding: false, label: "TORQUE" },
  { id: "faultStatus", numeric: false, disablePadding: false, label: "FAULT STATUS" }
];

class Analytics extends Component<AnalyticsProps, AnalyticsState> {
  constructor(props: AnalyticsState) {
    super(props);
    this.state = {
      analyticalElementInfo: [
        {
          name: "head",
          property: {
            minimum: 0,
            maximum: 100,
            value: "65"
          }
        },
        {
          name: "flow",
          property: {
            minimum: 0,
            maximum: 100,
            value: "65"
          }
        },
        {
          name: "speed",
          property: {
            minimum: 0,
            maximum: 100,
            value: "65"
          }
        },
        {
          name: "torque",
          property: {
            minimum: 0,
            maximum: 100,
            value: "65"
          }
        },
        {
          name: "status",
          property: {
            value: "Healthy"
          }
        }
      ],
      analyticalProbabilityInfo: {
        categoryAxes: "Probability of assets status",
        valueAxes: "Probability",
        probabilityList: [{
          "name": "Broken Blade",
          "value": 40,
        }, {
          "name": "Cavitation",
          "value": 32,
        }, {
          "name": "Clearance Wear",
          "value": 10,
        }, {
          "name": "Healthy",
          "value": 5,
        }, {
          "name": "Inlet Deposit",
          "value": 10,
        }, {
          "name": "Outlet Deposit",
          "value": 3,
        }]
      },
      analyticalCountInfo: {
        categoryAxes: "Count Occurence",
        valueAxes: "Count",
        countList: [{
          "name": "Broken Blade",
          "value": 300,
        }, {
          "name": "Cavitation",
          "value": 222,
        }, {
          "name": "Clearance Wear",
          "value": 176,
        }, {
          "name": "Healthy",
          "value": 200,
        }, {
          "name": "Inlet Deposit",
          "value": 123,
        }, {
          "name": "Outlet Deposit",
          "value": 145,
        }]
      },
      analyticalPredictionList: [{
        dateTime: unixTimestampToDateTimeconverter(new Date()),
        head: 10,
        speed: 10,
        flow: 10,
        torque: 10,
        faultStatus: "Healthy"
      }, {
        dateTime: unixTimestampToDateTimeconverter(new Date()),
        head: 10,
        speed: 10,
        flow: 10,
        torque: 10,
        faultStatus: "Healthy"
      }, {
        dateTime: unixTimestampToDateTimeconverter(new Date()),
        head: 10,
        speed: 10,
        flow: 10,
        torque: 10,
        faultStatus: "Healthy"
      }, {
        dateTime: unixTimestampToDateTimeconverter(new Date()),
        head: 10,
        speed: 10,
        flow: 10,
        torque: 10,
        faultStatus: "Healthy"
      }, {
        dateTime: unixTimestampToDateTimeconverter(new Date()),
        head: 10,
        speed: 10,
        flow: 10,
        torque: 10,
        faultStatus: "Healthy"
      }, {
        dateTime: unixTimestampToDateTimeconverter(new Date()),
        head: 10,
        speed: 10,
        flow: 10,
        torque: 10,
        faultStatus: "Healthy"
      }, {
        dateTime: unixTimestampToDateTimeconverter(new Date()),
        head: 10,
        speed: 10,
        flow: 10,
        torque: 10,
        faultStatus: "Healthy"
      }, {
        dateTime: unixTimestampToDateTimeconverter(new Date()),
        head: 10,
        speed: 10,
        flow: 10,
        torque: 10,
        faultStatus: "Healthy"
      }, {
        dateTime: unixTimestampToDateTimeconverter(new Date()),
        head: 10,
        speed: 10,
        flow: 10,
        torque: 10,
        faultStatus: "Healthy"
      }, {
        dateTime: unixTimestampToDateTimeconverter(new Date()),
        head: 10,
        speed: 10,
        flow: 10,
        torque: 10,
        faultStatus: "Healthy"
      }]
    }
  }

  render() {
    return (
      <div style={{ margin: "0 15px" }}>
        <AnalyticsElementComponent
          analyticalElementInfo={this.state.analyticalElementInfo}
        />
        <AnalyticsProbabilityComponent
          analyticalProbabilityInfo={this.state.analyticalProbabilityInfo}
          analyticalCountInfo={this.state.analyticalCountInfo}
        />
        <AnalyticsPredictionComponent analyticalPredictionList={this.state.analyticalPredictionList} />
      </div>
    );
  }
}

export default Analytics;
