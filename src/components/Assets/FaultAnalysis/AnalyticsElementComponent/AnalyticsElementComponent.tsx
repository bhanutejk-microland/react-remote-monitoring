import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import GaugeChart from "../../../Charts/GaugeChart";
import { gaugeInfoModel } from "../../../../interfaceModels/gaugeInfoModel";
import classes from "../FaultAnalysis.css";

interface AnalyticsElementComponentProps {
  analyticalElementInfo: gaugeInfoModel[];
}

class AnalyticsElementComponent extends Component<AnalyticsElementComponentProps> {
  constructor(props: AnalyticsElementComponentProps) {
    super(props);
  }

  
  shouldComponentUpdate(nextProps, nextState) {
    return this.props.analyticalElementInfo !== nextProps.analyticalElementInfo
  }

  render() {
    return (
          <Grid container spacing={2} justify="space-between">
            {this.props.analyticalElementInfo.map((element, index) => {
              if(element.name === "status"){
                return (
                  <Grid item xs={12} sm={6} md={4} lg={2} key={index}>
                    <div className={classes.ElementCard}>
                      <h3 style={{textAlign: "center",  margin : "10px 0 0"}}>STATUS</h3>
                      {
                        element.property.value === 'Healthy' ?
                        (<p className={classes.statusIndicator} style={{background:"green"}}>{element.property.value}</p>) :
                        element.property.value === 'No Fault' ? 
                        (<p className={classes.statusIndicator} style={{background:"green"}}>{element.property.value}</p>) :
                        (<p className={classes.statusIndicator} style={{background:"red"}}>{element.property.value}</p>)
                      }
                      
                    </div>          
                  </Grid>
                )
              }else{
                return (
                  <Grid item xs={12} sm={6} md={4} lg={2} key={index}>
                    <div className={classes.ElementCard}>
                      <h3 style={{textAlign: "center", margin : "5px 0 0"}}>{element.name.toUpperCase()}</h3>
                      <GaugeChart 
                        name={element.name}
                        property={element.property}
                      />
                    </div>
                  </Grid>
                );
              }
            })}
          </Grid>
        
    );
  }
}

export default AnalyticsElementComponent;
