import React, { Component } from "react";

import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";

am4core.useTheme(am4themes_animated);

class MultiLineChart extends Component {

  componentDidMount() {
    this.initChart();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.chartData !== this.props.chartData) {
      this.initChart();
    }
  }

  initChart() {
    let chart = am4core.create(
      `MultiLineChartdiv${this.props.indexing || 0}`,
      am4charts.XYChart
    );

    chart.paddingRight = 20;

    var dateAxis = chart.xAxes.push(new am4charts.DateAxis());
    dateAxis.renderer.grid.template.location = 0;
    dateAxis.renderer.minGridDistance = 30;

    var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());

    // Create series
    function createSeries(field, name, id, props) {
      var series = chart.series.push(new am4charts.LineSeries());
      series.dataFields.valueY = field;
      series.dataFields.dateX = "date";
      series.name = name;
      series.tooltipText = "{dateX}: [b]{valueY}[/]";
      series.strokeWidth = 2;

      var bullet = series.bullets.push(new am4charts.CircleBullet());
      bullet.circle.stroke = am4core.color("#fff");
      bullet.circle.strokeWidth = 2;

      // Add data pre-processor
      const seriesData = props.chartData.deviceTrends.map(trends => {
        return {
          ...trends,
          date: new Date(trends.dateForms.year, trends.dateForms.monthNumber, trends.dateForms.day, trends.dateForms.hours, trends.dateForms.minutes.substr(-2))
        }
      });
      console.log("MULTI LINE CHART>>>>>>>>>>", seriesData);
      series.data = seriesData || data;
      series.events.on("beforedatavalidated", function (ev) {
        var source = ev.target.data;
        var data = [];
        for (var i = 0; i < source.length; i++) {
          var row = source[i];
          if (row.device == id) {
            data.push(row);
          }
        }
        ev.target.data = data;
      });

      return series;
    }

    if (this.props.chartData !== undefined && this.props.chartData.deviceTrends.length > 0) {
      const tendObj = this.props.trendPropertyInfo.find((property) => property.deviceName === this.props.chartData.deviceName);
      if (tendObj !== undefined) {
        tendObj.deviceMeasures.map((measure) => {
          createSeries("value", measure, measure, this.props);
        })
      } else {
        if (this.chart) {
          this.chart.dispose();
        }
      }
    }

    chart.legend = new am4charts.Legend();
    chart.cursor = new am4charts.XYCursor();

    this.chart = chart;
  }

  componentWillUnmount() {
    if (this.chart) {
      this.chart.dispose();
    }
  }

  render() {
    const chartIndexing = `MultiLineChartdiv${this.props.indexing || 0}`;
    return (
      <div
        id={chartIndexing}
        style={{ width: "100%", height: this.props.chartHeight || '300px' }}
      ></div>
    );
  }
}

export default MultiLineChart;
