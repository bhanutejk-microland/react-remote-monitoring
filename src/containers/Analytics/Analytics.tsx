import React, { Component } from "react";

import AnalyticsElementComponent from "./AnalyticsElementComponent/AnalyticsElementComponent";
import AnalyticsProbabilityComponent from './AnalyticsProbabilityComponent/AnalyticsProbabilityComponent';

interface AnalyticsProps {}

interface analyticalElement {
  name: string;
  min: number;
  max: number;
  value: number;
}

interface AnalyticsState {
  analyticalElementInfo: analyticalElement[];
}

class Analytics extends Component<AnalyticsProps, AnalyticsState> {
  constructor(props: AnalyticsState) {
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
      ]
    };
  }

  render() {
    return (
      <div style={{ margin: "0 15px" }}>
        <AnalyticsElementComponent
          analyticalElementInfo={this.state.analyticalElementInfo}
        />
        <AnalyticsProbabilityComponent />
        <div>Predictions</div>
      </div>
    );
  }
}

export default Analytics;
