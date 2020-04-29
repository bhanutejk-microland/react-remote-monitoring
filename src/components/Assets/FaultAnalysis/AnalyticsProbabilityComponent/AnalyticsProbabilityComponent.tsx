import React, { Component, Fragment } from "react";
import Grid from "@material-ui/core/Grid";
import { withStyles } from '@material-ui/core/styles';
// import InputLabel from '@material-ui/core/InputLabel';
// import MenuItem from '@material-ui/core/MenuItem';
// import FormControl from '@material-ui/core/FormControl';
// import Select from '@material-ui/core/Select';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
// import Aux from "../../../hoc/Aux";
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

// const useStyles = makeStyles({
//   root: {
//     flexGrow: 1,
//   },
// });

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
            {/* <FormControl variant="outlined" style={{minWidth : "200px",marginLeft : "60%", marginTop : "2%"}}>
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
            </FormControl> */}
            <Paper className={classes.root}>
              <Tabs
                
                value={this.state.value}
                onChange={this.handleChange}
                indicatorColor="primary"
                textColor="primary"
                centered
              >
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
