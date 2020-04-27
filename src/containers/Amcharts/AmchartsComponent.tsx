import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import ChordDiagramChartComponent from "../../components/Charts/ChordDiagramChart";
import ForceDirectedTreeChartComponent from "../../components/Charts/ForceDirectedTreeChart";
import PieChartComponent from "../../components/Charts/PieChart";
import RadarChartComponent from "../../components/Charts/RadarChart";
import SankeyDiagramChartComponent from "../../components/Charts/SankeyChart";
import SlicedChartComponent from "../../components/Charts/SlicedFunnelChart";
import SunburstChartComponent from "../../components/Charts/SunburstChart";
import TimelineChartComponent from "../../components/Charts/TimelineChart";
import TreemapChartComponent from "../../components/Charts/TreemapChart";

class AmchartsComponent extends Component{
    render(){
        return(
            <div>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <ChordDiagramChartComponent />
                    </Grid>
                    {/* <Grid item xs={12}>
                        <ForceDirectedTreeChartComponent />
                    </Grid> */}
                    <Grid item xs={12}>
                        <PieChartComponent />
                    </Grid>
                    <Grid item xs={12}>
                        <RadarChartComponent />
                    </Grid>
                    <Grid item xs={12}>
                        <SankeyDiagramChartComponent />
                    </Grid>
                    <Grid item xs={12}>
                        <SlicedChartComponent />
                    </Grid>
                    <Grid item xs={12}>
                        <SunburstChartComponent />
                    </Grid>
                    {/* <Grid item xs={12}>
                        <TimelineChartComponent />
                    </Grid> */}
                    <Grid item xs={12}>
                        <TreemapChartComponent />
                    </Grid>
                </Grid>
            </div>
        )
    }
}

export default AmchartsComponent;