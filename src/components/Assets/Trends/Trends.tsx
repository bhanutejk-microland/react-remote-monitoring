import React, { Component } from 'react';
import Grid from "@material-ui/core/Grid";

import TrendProperties from './TrendProperties/TrendProperties';
import XyComparisonChart from '../../../components/Charts/XyComparisonChart'

class TrendsComponent extends Component {
  render() {
    return <div>
      {/* <Grid container spacing={2}>
        <Grid item xs={2}>
          <TrendProperties />
        </Grid>
        <Grid item xs={10}>
          <XyComparisonChart />
        </Grid>
      </Grid> */}
      <TrendProperties />
    </div>
  }
}

export default TrendsComponent;
