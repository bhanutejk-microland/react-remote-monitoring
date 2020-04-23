import React, { Component } from "react";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4plugins from "@amcharts/amcharts4/plugins/sunburst"; 
import am4themes_animated from "@amcharts/amcharts4/themes/animated";

am4core.useTheme(am4themes_animated);

class SunburstChartComponent extends Component {
    componentDidMount() {
      let chart = am4core.create("sunburstChart", am4plugins.Sunburst);
      chart.radius = am4core.percent(100);

        // Make colors more distinctive
        chart.colors.step = 2;

        // Add multi-level data
        chart.data = [{
        name: "First",
        children: [
            { name: "A1", value: 100 },
            { name: "A2", value: 60 }
        ]
        },
        {
        name: "Second",
        children: [
            { name: "B1", value: 135 },
            { name: "B2", value: 98 }
        ]
        },
        {
        name: "Third",
        children: [
            {
            name: "C1",
            children: [
                { name: "EE1", value: 130 },
                { name: "EE2", value: 87 },
                { name: "EE3", value: 55 }
            ]
            },
            { name: "C2", value: 148 },
            {
            name: "C3", children: [
                { name: "CC1", value: 53 },
                { name: "CC2", value: 30 }
            ]
            },
            { name: "C4", value: 26 }
        ]
        },
        {
        name: "Fourth",
        children: [
            { name: "D1", value: 415 },
            { name: "D2", value: 148 },
            { name: "D3", value: 89 }
        ]
        },
        {
        name: "Fifth",
        children: [
            {
            name: "E1",
            children: [
                { name: "EE1", value: 33 },
                { name: "EE2", value: 40 },
                { name: "EE3", value: 89 }
            ]
            },
            {
            name: "E2",
            value: 148
            }
        ]
        }];

        // Define data fields
        chart.dataFields.value = "value";
        chart.dataFields.name = "name";
        chart.dataFields.children = "children";

        // Configure levels
        var level0 = chart.seriesTemplates.create("0");
        level0.labels.template.text = "{category}";

        var level1 = chart.seriesTemplates.create("1");
        level1.slices.template.fillOpacity = 0.75;
        level1.labels.template.text = "{category}";

        var level2 = chart.seriesTemplates.create("2");
        level2.slices.template.fillOpacity = 0.5;
        level2.labels.template.text = "{category}";
      this.chart = chart;
    }
  
    componentWillUnmount() {
      if (this.chart) {
        this.chart.dispose();
      }
    }
  
    render() {
      return (
        <div id="sunburstChart" style={{ width: "100%", height: "400px" }}></div>
      );
    }
  }
  
  export default SunburstChartComponent;
  