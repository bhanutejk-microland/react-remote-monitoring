import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";

import StatusCardComponent from "./ElementStatusCard/StatusCardComponent";
import HalfDoughnutChart from '../../../components/Charts/HalfDoughnutChart';
import classes from "../Analytics.css";

interface AnalyticsElementComponentProps {
  analyticalElementInfo: analyticalElement[];
}

interface analyticalElement {
  name: string;
  min: number;
  max: number;
  value: number;
}

class AnalyticsElementComponent extends Component<
  AnalyticsElementComponentProps
> {
  constructor(props: AnalyticsElementComponentProps) {
    super(props);
  }

  shouldComponentUpdate(nextProps, nextState) {
    return (
      this.props.analyticalElementInfo !== nextProps.analyticalElementInfo
    );
  }

  render() {
    return (
      <Grid container spacing={2}>
        <Grid item xs={10}>
          <Grid container spacing={2}>
            {this.props.analyticalElementInfo.map((element, index) => {
              return (
                <Grid item xs={12} sm={6} md={4} lg={3} key={element.name}>
                  <div className={classes.ElementCard}>
                    <StatusCardComponent
                      name={element.name}
                      min={element.min}
                      max={element.max}
                      value={element.value}
                    />
                  </div>
                </Grid>
              );
            })}
          </Grid>
        </Grid>
        <Grid item xs={2}>
          Status
        </Grid>
      </Grid>
    );
  }
}

export default AnalyticsElementComponent;
