import React, { Component } from "react";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";

am4core.useTheme(am4themes_animated);

class SankeyDiagramChartComponent extends Component {
    componentDidMount() {
      let chart = am4core.create("sankeyDiagramChart", am4charts.SankeyDiagram);
      /* Add data */
        
        chart.data = [
        { "from": "A", "to": "D", "value": 10 },
        { "from": "B", "to": "D", "value": 8 },
        { "from": "B", "to": "E", "value": 4 },
        { "from": "C", "to": "E", "value": 3 },
        { "from": "D", "to": "G", "value": 5 },
        { "from": "D", "to": "I", "value": 2 },
        { "from": "D", "to": "H", "value": 3 },
        { "from": "E", "to": "H", "value": 6 },
        { "from": "G", "to": "J", "value": 5 },
        { "from": "I", "to": "J", "value": 1 },
        { "from": "H", "to": "J", "value": 9 }
        ];
        
        chart.dataFields.fromName = "from";
        chart.dataFields.toName = "to";
        chart.dataFields.value = "value";
      this.chart = chart;
    }
  
    componentWillUnmount() {
      if (this.chart) {
        this.chart.dispose();
      }
    }
  
    render() {
      return (
        <div id="sankeyDiagramChart" style={{ width: "100%", height: "400px" }}></div>
      );
    }
  }
  
  export default SankeyDiagramChartComponent;
  