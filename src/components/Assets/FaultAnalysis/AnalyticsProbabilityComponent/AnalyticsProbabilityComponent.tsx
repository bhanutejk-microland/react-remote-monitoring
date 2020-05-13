import React, { Component, Fragment } from "react";
import Grid from "@material-ui/core/Grid";
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import XyChartColumnSeries from '../../../Charts/XyChartColumnSeries';
import classes from "../FaultAnalysis.css";

interface AnalyticsElementComponentProps {
  analyticalProbabilityInfo: analyticalProbabilityProperties,
  analyticalCountInfo: analyticalCountProperties,
  onSelectTimePeriod: any
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
    this.handleChangeSelectTimePeriod = this.handleChangeSelectTimePeriod.bind(this);
    this.state = {value : 'today'}
  }

 
  handleChangeSelectTimePeriod(event: React.ChangeEvent<{}>, timePeriod: string){
    this.setState({
        value: timePeriod
    });
    this.props.onSelectTimePeriod(timePeriod);
  }

  shouldComponentUpdate(nextProps, nextState) {
    return  (this.props.analyticalProbabilityInfo !== nextProps.analyticalProbabilityInfo) ||
            (this.props.analyticalCountInfo !== nextProps.analyticalCountInfo) ||
            (this.state.value !== nextState.value)
  }

  render() {
    return (
      
      <Fragment>
        <Grid container spacing={2} justify="space-between">
          <Grid item xs={12} sm={6}>            
            <h2 className={classes.chartHeading}>Probability of Status</h2>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Paper className={classes.root}>
              <Tabs
                value={this.state.value}
                onChange={this.handleChangeSelectTimePeriod}
                indicatorColor="primary"
                textColor="primary"
                variant="scrollable"
                scrollButtons="auto"
                aria-label="scrollable auto tabs example"
                className={classes.Tabs}
              >
                <Tab className={classes.Tabs} label="Today" value="today" />
                <Tab className={classes.Tabs} label="Last Day" value="lastday" />
                <Tab className={classes.Tabs} label="Last Week" value="lastweek" />
                <Tab className={classes.Tabs} label="Last Month" value="lastmonth" />
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
