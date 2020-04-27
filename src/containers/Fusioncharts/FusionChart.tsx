import React, {Component} from "react";
import Grid from "@material-ui/core/Grid";
import SampleFusionChart from "../../components/Charts/FusionCharts/SampleFusionChart";
import MultiVariateChart from "../../components/Charts/FusionCharts/MultiVariateChart";
import MultipleSeriesOnTimeAxis from "../../components/Charts/FusionCharts/MultipleSeriesOnTimeAxis";
import SplinePlotWithTimeAxis from "../../components/Charts/FusionCharts/SplinePlotWithTimeAxis";
import JoinMissingDataChart from "../../components/Charts/FusionCharts/JoinMissingDataChart";

class FusionChart extends Component{
    render(){
        return(
            <Grid container spacing={2}>
                <Grid item xs={12} >
                    <SampleFusionChart />
                </Grid>
                <Grid item xs={12} >
                    <MultiVariateChart />
                </Grid>
                <Grid item xs={12} >
                    <MultipleSeriesOnTimeAxis />
                </Grid>
                <Grid item xs={12} >
                    <SplinePlotWithTimeAxis />
                </Grid>
                <Grid item xs={12} >
                    <JoinMissingDataChart />
                </Grid>
            </Grid>
        )
    }
}

export default FusionChart;