import React, { Component, Fragment } from "react";
import Grid from "@material-ui/core/Grid";

// import Aux from "../../../hoc/Aux";
import XyChart from '../../../components/Charts/XyChart';

class AnalyticsProbabilityComponent extends Component {
  render() {
    return (
      <Fragment>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <XyChart />
          </Grid>
          <Grid item xs={12} sm={6}>
            xf
          </Grid>
        </Grid>
      </Fragment>
    );
  }
}

export default AnalyticsProbabilityComponent;
