import React, { Component } from "react";

import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import * as am4plugins_bullets from "@amcharts/amcharts4/plugins/bullets";

am4core.useTheme(am4themes_animated);

class AnomalyBulletChart extends Component {

  componentDidMount() {
    this.initChart();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.data !== this.props.data) {
      this.initChart();
    }
  }

  initChart() {
    let chart = am4core.create(
      `AnomalyBulletChartdiv${this.props.indexing || 0}`,
      am4charts.XYChart
    );
    chart.maskBullets = false;
    let chartData = [];
    if (this.props.data.length > 0) {
      this.props.data.map((anomalyData) => {
        chartData.push({
          date: anomalyData.date,
          value: anomalyData.value,
          hideBullet: !anomalyData.showDot,
          bulletColor: am4core.color("#c00")
        })
      })
    }
    // Add data
    chart.data = chartData;

    // Create axes
    var dateAxis = chart.xAxes.push(new am4charts.DateAxis());
    dateAxis.renderer.labels.template.location = 0.5;
    dateAxis.renderer.minGridDistance = 100;

    var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
    valueAxis.min = 0;
    valueAxis.max = 150;

    // Create series
    function createSeries(field, name) {
      var series = chart.series.push(new am4charts.LineSeries());
      series.dataFields.valueY = field;
      series.dataFields.dateX = "date";
      series.name = name;
      series.tooltipText = "{dateX}: [b]{valueY}[/]";
      series.strokeWidth = 3;

      // Creating a bullet
      var bullet = series.bullets.push(new am4plugins_bullets.FlagBullet());

      // Setting label to display values from data
      // bullet.label.text = "{bulletText}\n[bold]{valueY}[/]";
      // bullet.label.textAlign = "middle";

      // Disabling all bullets, except ones that are explicitly enabled via data
      bullet.disabled = true;
      bullet.propertyFields.disabled = "hideBullet";

      // Allowing controlling pole height via data (negative height means upside down flag)
      // We also instruct pole to draw its color from "bulletColor" in data
      bullet.propertyFields.poleHeight = "height";
      bullet.pole.propertyFields.stroke = "bulletColor";

      // Background is a WavedRectangle, which we configure, as well as instruct
      // it to get its fill and border color from data field "bulletColor"
      bullet.background.waveLength = 15;
      bullet.background.fillOpacity = 0;
      bullet.background.propertyFields.fill = "bulletColor";
      bullet.background.propertyFields.stroke = "bulletColor";

      // Add a circle to pole base
      var circle = bullet.createChild(am4core.Circle);
      circle.radius = 5;
      circle.opacity = 0.5;
      circle.strokeWidth = 0;
      circle.stroke = am4core.color("#fff");
      circle.propertyFields.fill = "bulletColor";
    }

    createSeries("value", "Series #1");

    chart.cursor = new am4charts.XYCursor();

    this.chart = chart;
  }

  componentWillUnmount() {
    if (this.chart) {
      this.chart.dispose();
    }
  }

  render() {
    const chartIndexing = `AnomalyBulletChartdiv${this.props.indexing || 0}`;
    return (
      <div id={chartIndexing} style={{ width: "100%", height: "250px" }}></div>
    );
  }
}

export default AnomalyBulletChart;
