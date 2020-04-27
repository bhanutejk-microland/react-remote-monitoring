import React, { Component } from "react";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import * as am4plugins_timeline from "@amcharts/amcharts4/timeline"; 

am4core.useTheme(am4themes_animated);

class TimelineChartComponent extends Component {
    componentDidMount() {
      let chart = am4core.create("timelineChart", am4plugins_timeline.CurveChart);
      // Add data
        chart.data = [{
            "country": "Lithuania",
            "value": 501
        }, {
            "country": "Czechia",
            "value": 301
        }, {
            "country": "Ireland",
            "value": 201
        }, {
            "country": "Germany",
            "value": 165
        }, {
            "country": "Australia",
            "value": 139
        }, {
            "country": "Austria",
            "value": 128
        }, {
            "country": "UK",
            "value": 99
        }, {
            "country": "Belgium",
            "value": 60
        }, {
            "country": "Netherlands",
            "value": 50
        }];
        
        // Create category (X) axis
        var categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
        categoryAxis.dataFields.category = "country";
        categoryAxis.renderer.grid.template.disabled = true;
        categoryAxis.renderer.polyspline.tensionX = 0.8
        categoryAxis.renderer.minGridDistance = 30;
        categoryAxis.renderer.points = [
            { x: -400, y: 0 },
            { x: -250, y: 0 },
            { x: 0, y: 60 },
            { x: 250, y: 0 },
            { x: 400, y: 0 }
        ];
        
        // Create value (Y) axis
        var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
        valueAxis.renderer.radius = 100;
        valueAxis.renderer.innerRadius = 0;
        valueAxis.renderer.grid.template.disabled = true;
        
        // Create series
        var series = chart.series.push(new am4plugins_timeline.CurveColumnSeries());
        series.dataFields.valueY = "value";
        series.dataFields.categoryX = "country";
        series.columns.template.fillOpacity = 0.5;
        series.columns.template.strokeWidth = 2;
        
        // Add some white space around the chart
        chart.padding(40, 40, 40, 40);
      this.chart = chart;
    }
  
    componentWillUnmount() {
      if (this.chart) {
        this.chart.dispose();
      }
    }
  
    render() {
      return (
        <div id="timelineChart" style={{ width: "100%", height: "400px" }}></div>
      );
    }
  }
  
  export default TimelineChartComponent;
  