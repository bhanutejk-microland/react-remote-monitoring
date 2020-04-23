import React, { Component } from "react";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";

am4core.useTheme(am4themes_animated);

class SlicedChartComponent extends Component {
    componentDidMount() {
      let chart = am4core.create("slicedDiagramChart", am4charts.SlicedChart);
      /* Add data */
      chart.data = [{
        "name": "Stage #1",
        "value": 600
      }, {
        "name": "Stage #2",
        "value": 300
      }, {
        "name": "Stage #3",
        "value": 200
      }, {
        "name": "Stage #4",
        "value": 180
      }, {
        "name": "Stage #5",
        "value": 50
      }, {
        "name": "Stage #6",
        "value": 20
      }, {
        "name": "Stage #7",
        "value": 10
      }];
      
      let series = chart.series.push(new am4charts.FunnelSeries());
      series.dataFields.value = "value";
      series.dataFields.category = "name";
      series.alignLabels = true;
      
      var fillModifier = new am4core.LinearGradientModifier();
      fillModifier.brightnesses = [-0.5, 1, -0.5];
      fillModifier.offsets = [0, 0.5, 1];
      series.slices.template.fillModifier = fillModifier;
      
      series.sliceLinks.template.height = 30;
      series.sliceLinks.template.fillOpacity = 0.2
      this.chart = chart;
    }
  
    componentWillUnmount() {
      if (this.chart) {
        this.chart.dispose();
      }
    }
  
    render() {
      return (
        <div id="slicedDiagramChart" style={{ width: "100%", height: "400px" }}></div>
      );
    }
  }
  
  export default SlicedChartComponent;
  