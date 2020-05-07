import React, { Component, Fragment } from "react";
import Grid from "@material-ui/core/Grid";
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import XyChartColumnSeries from '../../../Charts/XyChartColumnSeries';

interface AnalyticsElementComponentProps {
  analyticalProbabilityInfo: analyticalProbabilityProperties,
  analyticalCountInfo: analyticalCountProperties,
  classes: any
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

const useStyles = theme => ({
  root: {
    flexGrow: 1,
  },
});

class AnalyticsProbabilityComponent extends Component<AnalyticsElementComponentProps,any> {
  constructor(props: AnalyticsElementComponentProps){
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.state = {value : 'lastDay'}
  }

 
  handleChange(event: React.ChangeEvent<{}>, newValue: string){
    console.log(newValue);
    this.setState({
        value: newValue
    });
  }

  shouldComponentUpdate(nextProps, nextState) {
    return  (
      this.props.analyticalProbabilityInfo !== nextProps.analyticalProbabilityInfo || this.props.analyticalCountInfo !== nextProps.analyticalCountInfo || this.state.value !== nextState.value
    );
  }

  render() {
    const { classes } = this.props;
    console.log(this.state.value);
    return (
      
      <Fragment>
        <Grid container spacing={2} justify="space-between">
          <Grid item xs={12} sm={6}>            
            <h2>Probability of Status</h2>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Paper className={classes.root}>
              <Tabs
                value={this.state.value}
                onChange={this.handleChange}
                indicatorColor="primary"
                textColor="primary"
                variant="scrollable"
                scrollButtons="auto"
                aria-label="scrollable auto tabs example"
              >
                <Tab label="Today" value="today" />
                <Tab label="Last Day" value="lastDay" />
                <Tab label="Last Week" value="lastWeek" />
                <Tab label="Last Month" value="lastMonth" />
              </Tabs>
            </Paper>
            
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

export default withStyles(useStyles)(AnalyticsProbabilityComponent);
