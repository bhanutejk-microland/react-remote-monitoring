import React, { Component } from "react";

import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";

am4core.useTheme(am4themes_animated);

class HalfDoughnutChart extends Component {
  componentDidMount() {
    let chart = am4core.create(
      `halfDoughnutchartdiv${this.props.indexing || 0}`,
      am4charts.PieChart
    );
    chart.hiddenState.properties.opacity = 0; // this creates initial fade-in

    chart.data = this.props.dataPoints;
    chart.radius = am4core.percent(70);
    chart.innerRadius = am4core.percent(40);
    chart.startAngle = 180;
    chart.endAngle = 360;

    let series = chart.series.push(new am4charts.PieSeries());
    series.dataFields.value = "value";
    series.dataFields.category = "name";

    series.slices.template.cornerRadius = 0;
    series.slices.template.innerCornerRadius = 0;
    series.slices.template.draggable = true;
    series.slices.template.inert = true;

    series.hiddenState.properties.startAngle = 90;
    series.hiddenState.properties.endAngle = 90;

    series.labels.template.disabled = true;
    // series.ticks.template.disabled = true;

    chart.legend = new am4charts.Legend();

    this.chart = chart;
  }

  componentWillUnmount() {
    if (this.chart) {
      this.chart.dispose();
    }
  }

  render() {
    const chartIndexing = `halfDoughnutchartdiv${this.props.indexing || 0}`;
    return (
      <div id={chartIndexing} style={{ width: "100%", height: "250px" }}></div>
    );
  }
}

export default HalfDoughnutChart;
