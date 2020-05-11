import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import GaugeChart from "../../../Charts/GaugeChart";
import classes from "../FaultIdentificationAnalysis.css";

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
          <Grid container >
            {this.props.analyticalElementInfo.map((element, index) => {
              return (
                <Grid item xs={12} sm={6} md={4} lg={3} key={element.name}>
                  <div className={classes.ElementCard}>
                    <h3 style={{textAlign: "center", margin : "5px 0 0"}}>{element.name}</h3>
                    <GaugeChart 
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
          <div className={classes.ElementCard}>
            <h3 style={{textAlign: "center",  margin : "10px 0 0"}}>Status</h3>
            <p className={classes.statusIndicator} style={{background:"green"}}>HEALTHY</p>
          </div>          
        </Grid>
      </Grid>
    );
  }
}

export default AnalyticsElementComponent;
