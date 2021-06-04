import React, { Component, Fragment } from "react";
import Grid from "@material-ui/core/Grid";
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import XyChartColumnSeries from '../../../Charts/XyChartColumnSeries';
import PieChart from '../../../Charts/PieChart';
import MultipleFaultLineChart from '../../../Charts/MultipleFaultLineChart';
import StackedColumnBarChart from '../../../Charts/StackedColumnBarChart';
import classes from "../FaultAnalysis.css";

interface AnalyticsElementComponentProps {
  analyticalProbabilityInfo: analyticalProbabilityProperties;
  analyticalCountInfo: analyticalCountProperties;
  analyticalFaultPredictionInfo: analyticalFaultPredictionInfo;
  onSelectTimePeriod: any;
  configType: string;
  graphType: string;
}

interface analyticalProbabilityElement{
  name: string;
  value: number;
}

interface analyticalCountElement{
  name: string;
  value: number;
}

interface analyticalPredictionElement{
  healthy: number;
  brokenBlade: number;
  fault: string;
  timestamp: any;
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

interface analyticalFaultPredictionInfo{
  valueAxes : string;
  categoryAxes : string;
  predictionList : analyticalPredictionElement[];
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
    this.state = {value : 'today',faultText : 'Healthy'}
  }

  handleFaultName = (faultText) => {
      this.setState({
        faultText: faultText       
      });
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
            (this.props.analyticalFaultPredictionInfo !== nextProps.analyticalFaultPredictionInfo) ||
            (this.state.value !== nextState.value) ||
            (this.state.faultText !== nextState.faultText)
  }

  renderFaultClassification = () => {
    let chartData = new Array();
    this.props.analyticalProbabilityInfo.probabilityList.map((item,index) => {
      if(item.value !== undefined){
        let colors:string ;
        if(item.name === 'Healthy'){
          colors = '#66b7dc';
        }else{
          colors = '#6771dc';
        }
        let obj = {
          name : item.name,
          value : item.value,
          color : colors
        }
        chartData.push(obj);
      }      
    });

    let chartData2 = new Array();
    // let setFaultValue:string ;
    // let setFaultText:string ;
    chartData2 = this.props.analyticalFaultPredictionInfo.predictionList;
    // setFaultText = this.state.faultText;
    // const lower = this.state.faultText;
    // setFaultValue = lower.charAt(0).toLowerCase() + lower.substring(1);
    

    let section1 = (
      <Grid container justify="space-between">
        <Grid item xs={12} sm={6} md={6} lg={6}></Grid>
        <Grid item xs={12} sm={6} md={3} lg={6}>
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
          {/* <Grid item xs={12} sm={6} md={3} lg={2}>
            <SimpleSelect onSelectFaultName={this.handleFaultName} />
          </Grid> */}
          <Grid item xs={12} sm={6} md={6} lg={6}>
            <PieChart chartData={chartData} />
          </Grid>
          <Grid item xs={12} sm={6} md={6} lg={6}>     
            <StackedColumnBarChart 
              chartData={chartData2}
              // faultValue={setFaultValue.replace(/\s+/g, '')}
              // faultText={this.state.faultText} 
            />
            
          </Grid>
      </Grid>
    );

    return section1;
  }

  renderFaultIdentification = () => {
    let chartData = new Array();
    this.props.analyticalProbabilityInfo.probabilityList.map((item,index) => {
      if(item.value !== undefined){
        let colors:string ;
        if(item.name === 'Healthy'){
          colors = '#66b7dc';
        }else{
          colors = '#6771dc';
        }
        let obj = {
          name : item.name,
          value : item.value,
          color : colors
        }
        chartData.push(obj);
      }      
    });

    let chartData2 = new Array();
    // let setFaultValue:string ;
    // let setFaultText:string ;
    chartData2 = this.props.analyticalFaultPredictionInfo.predictionList;
    // setFaultText = this.state.faultText;
    // const lower = this.state.faultText;
    // setFaultValue = lower.charAt(0).toLowerCase() + lower.substring(1);
    

    let section1 = (
      <Grid container justify="space-between">
        <Grid item xs={12} sm={6} md={6} lg={6}></Grid>
        <Grid item xs={12} sm={6} md={3} lg={6}>
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
          {/* <Grid item xs={12} sm={6} md={3} lg={2}>
            <SimpleSelect onSelectFaultName={this.handleFaultName} />
          </Grid> */}
          <Grid item xs={12} sm={6} md={6} lg={6}>
            <PieChart chartData={chartData} />
          </Grid>
          <Grid item xs={12} sm={6} md={6} lg={6}>
             
          <MultipleFaultLineChart 
              chartData={chartData2}
              // faultValue={setFaultValue.replace(/\s+/g, '')}
              // faultText={this.state.faultText} 
             /> 
            
            
          </Grid>
      </Grid>
    );

    return section1;
  }

  // renderFaultIdentification = () => {
  //   let section2 = (
  //     <Grid container justify="space-between">
  //       <Grid item xs={12} sm={6} md={6} lg={6}></Grid>
  //       <Grid item xs={12} sm={6} md={6} lg={6}>
  //           <Paper className={classes.root}>
  //             <Tabs
  //               value={this.state.value}
  //               onChange={this.handleChangeSelectTimePeriod}
  //               indicatorColor="primary"
  //               textColor="primary"
  //               variant="scrollable"
  //               scrollButtons="auto"
  //               aria-label="scrollable auto tabs example"
  //               className={classes.Tabs}
  //             >
  //               <Tab className={classes.Tabs} label="Today" value="today" />
  //               <Tab className={classes.Tabs} label="Last Day" value="lastday" />
  //               {/* <Tab className={classes.Tabs} label="Last Week" value="lastweek" />
  //               <Tab className={classes.Tabs} label="Last Month" value="lastmonth" /> */}
  //             </Tabs>
  //           </Paper>            
  //         </Grid>
  //         <Grid item xs={12} sm={6} md={6} lg={6}>
  //           <XyChartColumnSeries analyticalInfo={this.props.analyticalProbabilityInfo} />
  //         </Grid>
  //         <Grid item xs={12} sm={6} md={6} lg={6}>
  //           <XyChartColumnSeries analyticalInfo={this.props.analyticalCountInfo} />
  //         </Grid>
  //     </Grid>
  //   );

  //   return section2;
  // }

  render() {
    return (
      
      <Fragment>
        <Grid container spacing={2} justify="space-between">
          <Grid item xs={12} sm={6}>            
            <h2 className={classes.chartHeading}>Probability of Status</h2>
          </Grid>
          {/* <Grid item xs={12} sm={6}>
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
          </Grid> */}
          <Grid item xs={12} sm={12} md={12} lg={12}>
            {this.props.configType !== 'FaultClassification' ? <this.renderFaultIdentification />: <this.renderFaultClassification />}
          </Grid>          
        </Grid>
      </Fragment>
    );
  }
}

export default withStyles(useStyles)(AnalyticsProbabilityComponent);
