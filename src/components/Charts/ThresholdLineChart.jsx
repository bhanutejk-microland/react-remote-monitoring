import React, { Component } from "react";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";

am4core.useTheme(am4themes_animated);

class ThresholdLineChart extends Component {
  state = {
    data: [],
    count: null
  }

  componentDidMount() {
    this.initChart();
  }

  componentWillUnmount() {
    if (this.chart) {
      this.chart.dispose();
    }
  }

  componentDidUpdate(prevProps) {
    // if (prevProps.count !== this.props.count) {
      this.initChart();
    // }
  }

  initChart() {
    let chart = am4core.create(`ThresholdLineChartdiv${this.props.indexing || 0}`, am4charts.XYChart);


    let interfaceColors = new am4core.InterfaceColorSet();
    //
    // let propData = this.props.data;

    // console.log(">>><<<<<<<<<<<<<<<>>>>>>>>>>>>>>>", propData);
    // chart.data = data;
    let data = this.props.teleData || [];
    // let visits = 10;
    // for (let i = 1; i < 10; i++) {
    //   visits += Math.round((Math.random() < 0.5 ? 1 : 1) * Math.random() * 10);
    //   data.push({
    //     date: ""+new Date(2018, i, 0).getMonth(),
    //     value: visits
    //   });
    // }
    chart.data = data;
    // Create axes
    let categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
    categoryAxis.dataFields.category = "date";
    categoryAxis.renderer.minGridDistance = 50;
    categoryAxis.renderer.labels.template.rotation = -45;
    categoryAxis.renderer.grid.template.location = 0.5;
    categoryAxis.startLocation = 0.5;
    categoryAxis.endLocation = 0.5;

    // Create value axis
    let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
    valueAxis.baseValue = 82;

    // Create series
    let series = chart.series.push(new am4charts.LineSeries());
    series.dataFields.valueY = "value";
    series.dataFields.categoryX = "date";
    series.strokeWidth = 2;
    series.tensionX = 0.77;

    // bullet is added because we add tooltip to a bullet for it to change color
    let bullet = series.bullets.push(new am4charts.Bullet());
    bullet.tooltipText = "{valueY}";

    bullet.adapter.add("fill", function (fill, target) {
      if (target.dataItem.valueY > 82) {
        return am4core.color("#ff0000");
      }
      return fill;
    })
    let range = valueAxis.createSeriesRange(series);
    range.value = 82;
    range.endValue = 300;
    range.contents.stroke = am4core.color("#ff0000");
    range.contents.fill = range.contents.stroke;

    // Add scrollbar
    // let scrollbarX = new am4charts.XYChartScrollbar();
    // scrollbarX.series.push(series);
    // chart.scrollbarX = scrollbarX;

    chart.cursor = new am4charts.XYCursor();
  }

  render() {
    const chartIndexing = `ThresholdLineChartdiv${this.props.indexing || 0}`;
    return (
      <div id={chartIndexing} style={{ width: "100%", height: "450px" }}></div>
    );
  }
}

export default ThresholdLineChart;
