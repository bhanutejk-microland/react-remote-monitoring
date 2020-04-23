import React, { Component } from "react";

import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";

am4core.useTheme(am4themes_animated);

class XyChartColumnSeries extends Component {
  componentDidMount() {
    let data = [];
    let chart = null;
    if(this.props.analyticalInfo.valueAxes == "Probability"){
        chart = am4core.create(
            `xYchartdiv${this.props.analyticalInfo.valueAxes}`,
            am4charts.XYChart
        );
        data = this.props.analyticalInfo.probabilityList;
    }else{
        chart = am4core.create(
            `xYchartdiv${this.props.analyticalInfo.valueAxes}`,
            am4charts.XYChart
        );
        data = this.props.analyticalInfo.countList;
    }
    chart.data = data;

    // Create axes
    let categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
    categoryAxis.dataFields.category = "name";
    categoryAxis.title.text = this.props.analyticalInfo.categoryAxes;
    categoryAxis.renderer.grid.template.location = 0;
    categoryAxis.renderer.minGridDistance = 90;


    let  valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
    valueAxis.title.text = this.props.analyticalInfo.valueAxes;
    valueAxis.min = 0;

    // Create series
    let series = chart.series.push(new am4charts.ColumnSeries());
    series.dataFields.valueY = "value";
    series.dataFields.categoryX = "name";
    series.name = this.props.analyticalInfo.categoryAxes;
    series.tooltipText = "{name}: [bold]{valueY}[/]";
    series.stacked = false;

    // Add cursor
    chart.cursor = new am4charts.XYCursor();

    this.chart = chart;
  }

  componentWillUnmount() {
    if (this.chart) {
      this.chart.dispose();
    }
  }

  render() {
    let chartIndexing = '';
    if(this.props.analyticalInfo.valueAxes == "Probability"){
        chartIndexing = `xYchartdiv${this.props.analyticalInfo.valueAxes}`;
    }else{
        chartIndexing = `xYchartdiv${this.props.analyticalInfo.valueAxes}`;
    }
    return (
      <div
        id={chartIndexing}
        style={{ width: "100%", height: this.props.chartHeight || '350px' }}
      ></div>
    );
  }
}

export default XyChartColumnSeries;
