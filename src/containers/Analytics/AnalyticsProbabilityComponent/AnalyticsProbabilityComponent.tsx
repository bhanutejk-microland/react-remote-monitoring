import React, { Component, Fragment } from "react";
import Grid from "@material-ui/core/Grid";
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
// import Aux from "../../../hoc/Aux";
import XyChartColumnSeries from '../../../components/Charts/XyChartColumnSeries';

interface AnalyticsElementComponentProps {
  analyticalProbabilityInfo: analyticalProbabilityProperties,
  analyticalCountInfo: analyticalCountProperties
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



class AnalyticsProbabilityComponent extends Component<AnalyticsElementComponentProps> {
  constructor(props: AnalyticsElementComponentProps){
    super(props);
  }

 

  shouldComponentUpdate(nextProps, nextState) {
    return  (
      this.props.analyticalProbabilityInfo !== nextProps.analyticalProbabilityInfo || this.props.analyticalCountInfo !== nextProps.analyticalCountInfo
    );
  }

  render() {
    return (
      <Fragment>
        <Grid container spacing={2} justify="space-between">
          <Grid item xs={12} sm={6}>            
            <h2>Probability of Status</h2>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl variant="outlined" style={{minWidth : "200px",marginLeft : "60%", marginTop : "2%"}}>
              <InputLabel id="demo-simple-select-outlined-label">Filter</InputLabel>
              <Select
                labelId="demo-simple-select-outlined-label"
                id="demo-simple-select-outlined"
                label="Filter"
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value={"lastDay"}>Last Day</MenuItem>
                <MenuItem value={"lastWeek"}>Last Week</MenuItem>
                <MenuItem value={"lastMonth"}>Last Month</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <XyChartColumnSeries analyticalInfo={this.props.analyticalProbabilityInfo} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <XyChartColumnSeries analyticalInfo={this.props.analyticalCountInfo} />
          </Grid>
        </Grid>
      </Fragment>
    );
  }
}

export default AnalyticsProbabilityComponent;
