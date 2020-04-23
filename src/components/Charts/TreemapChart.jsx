import React, { Component } from "react";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";

am4core.useTheme(am4themes_animated);

class TreemapChartComponent extends Component {
    componentDidMount() {
      let chart = am4core.create("treemapChart", am4charts.TreeMap);
      chart.data = [{
        "name": "First",
        "value": 190,
        "color": "#A3A380"
      }, {
        "name": "Second",
        "value": 289,
        "color": "#D6CE93"
      }, {
        "name": "Third",
        "value": 635,
        "color": "#EFEBCE"
      }, {
        "name": "Fourth",
        "value": 732,
        "color": "#D8A48F"
      }, {
        "name": "Fifth",
        "value": 835,
        "color": "#BB8588"
      }];
      
      /* Set color step */
      chart.colors.step = 2;
      
      /* Define data fields */
      chart.dataFields.value = "value";
      chart.dataFields.name = "name";
      chart.dataFields.color = "color";
      this.chart = chart;
    }
  
    componentWillUnmount() {
      if (this.chart) {
        this.chart.dispose();
      }
    }
  
    render() {
      return (
        <div id="treemapChart" style={{ width: "100%", height: "400px" }}></div>
      );
    }
  }
  
  export default TreemapChartComponent;
  