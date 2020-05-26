import React, { Component } from "react";

import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";

am4core.useTheme(am4themes_animated);

class XyChart extends Component {
  componentDidMount() {
    let chart = am4core.create(
      `xYchartdiv${this.props.indexing || 0}`,
      am4charts.XYChart
    );

    chart.paddingRight = 20;

    let data = [];

    chart.data = this.props.chartData || data;

    let dateAxis = chart.xAxes.push(new am4charts.DateAxis());
    dateAxis.renderer.grid.template.location = 0;

    let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
    valueAxis.tooltip.disabled = true;
    valueAxis.renderer.minWidth = 35;

    let series = chart.series.push(new am4charts.LineSeries());
    series.dataFields.dateX = "date";
    series.dataFields.valueY = "value";

    series.tooltipText = "{valueY.value}";
    chart.cursor = new am4charts.XYCursor();

    let scrollbarX = new am4charts.XYChartScrollbar();
    scrollbarX.series.push(series);
    chart.scrollbarX = scrollbarX;

    this.chart = chart;
  }

  componentWillUnmount() {
    if (this.chart) {
      this.chart.dispose();
    }
  }

  render() {
    const chartIndexing = `xYchartdiv${this.props.indexing || 0}`;
    return (
      <div
        id={chartIndexing}
        style={{ width: "100%", height: this.props.chartHeight || '500px' }}
      ></div>
    );
  }
}

export default XyChart;
