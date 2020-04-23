import React, { Component } from "react";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";

am4core.useTheme(am4themes_animated);

class ChordDiagramChartComponent extends Component {
    componentDidMount() {
      let chart = am4core.create("chordDiagramChart", am4charts.ChordDiagram);
      chart.data = [
        { "from": "A", "to": "D", "value": 10 },
        { "from": "B", "to": "D", "value": 8 },
        { "from": "B", "to": "E", "value": 4 },
        { "from": "B", "to": "C", "value": 2 },
        { "from": "C", "to": "E", "value": 14 },
        { "from": "E", "to": "D", "value": 8 },
        { "from": "C", "to": "A", "value": 4 },
        { "from": "G", "to": "A", "value": 7 },
        { "from": "D", "to": "B", "value": 1 }
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
        <div id="chordDiagramChart" style={{ width: "100%", height: "400px" }}></div>
      );
    }
  }
  
  export default ChordDiagramChartComponent;
  