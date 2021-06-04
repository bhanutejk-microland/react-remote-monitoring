import React, { Component } from "react";

import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";

am4core.useTheme(am4themes_animated);

class StackedColumnBarChart extends Component {
  componentDidMount() {
    this.initChart();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.chartData !== this.props.chartData) {
      this.initChart();
    }
  }

  initChart() {
    // Create chart instance
    var chart = am4core.create("chartdiv", am4charts.XYChart);

    // Add data
    chart.data = this.props.chartData;
    chart.logo.__disabled = true;

    // Create axes
    var categoryAxis = chart.xAxes.push(new am4charts.DateAxis());
    categoryAxis.dataFields.category = "timestamp";
    categoryAxis.renderer.grid.template.location = 0;
    categoryAxis.renderer.minGridDistance = 50;

    var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
    valueAxis.renderer.inside = false;
    valueAxis.renderer.labels.template.disabled = false;

    chart.events.on("ready", function(ev) {
      valueAxis.min = 0;
      valueAxis.max = 1;
    });
    // valueAxis.min = 0;
    // valueAxis.max = 1.2;

   

    // Modify chart's colors
    chart.colors.list = [
      am4core.color("#bec4f8"),
      am4core.color("#a5abee"),
      am4core.color("#6a6dde"),
      am4core.color("#4d42cf"),
      am4core.color("#713e8d"),
      am4core.color("#a160a0"),
    ];

    // Create series
    function createSeries(field, name) {
      // Set up series
      var series = chart.series.push(new am4charts.ColumnSeries());
      series.name = name;
      series.dataFields.valueY = field;
      series.dataFields.dateX = "timestamp";
      series.sequencedInterpolation = true;
      

      // Make it stacked
      series.stacked = true;

      // Configure columns
      series.columns.template.width = am4core.percent(60);
      series.columns.template.tooltipText =
        "[bold]{name}[/]\n[font-size:14px] {valueY}";

      // Add label
      var labelBullet = series.bullets.push(new am4charts.LabelBullet());
      // labelBullet.label.text = "{valueY}";
      labelBullet.locationY = 0.5;
      labelBullet.label.hideOversized = true;

      return series;
    }

    createSeries("brokenBlade", "Broken Blade");
    createSeries("cavitation", "Cavitation");
    createSeries("clearanceWear", "Clearance Wear");    
    createSeries("healthy", "Healthy");
    createSeries("inletDeposit", "Inlet Deposit");
    createSeries("outletDeposit", "Outlet Deposit");

    // Legend
    chart.legend = new am4charts.Legend();

    // generate some random data, quite different range
    this.chart = chart;
  }

  componentWillUnmount() {
    if (this.chart) {
      this.chart.dispose();
    }
  }

  render() {
    const chartIndexing = `chartdiv`;
    return (
      <div
        id={chartIndexing}
        style={{ width: "100%", height: this.props.chartHeight || "300px" }}
      ></div>
    );
  }
}

export default StackedColumnBarChart;
