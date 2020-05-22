import React, { Component } from "react";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";

am4core.useTheme(am4themes_animated);

class XyComparisonChart extends Component {
  state = {
    data: []
  }
  initChart() {
    let chart = am4core.create(`XyComparisonChartdiv${this.props.indexing || 0}`, am4charts.XYChart);


    let interfaceColors = new am4core.InterfaceColorSet();
    //
    let propData = this.props.data;
    if (propData.length > 0) {
      propData = this.props.data.map(obj => {
        return {
          ...obj,
          date: new Date(obj.dateForms.year, obj.dateForms.monthNumber, obj.dateForms.day, obj.dateForms.hours, obj.dateForms.minutes.substr(-2))
        }
      })
    }
    console.log(">>><<<<<<<<<<<<<<<>>>>>>>>>>>>>>>", propData);
    chart.data = propData
    chart.leftAxesContainer.layout = "vertical";
    let dateAxis = chart.xAxes.push(new am4charts.DateAxis());

    dateAxis.tooltipDateFormat = "HH:mm, d MMMM";
    dateAxis.dateFormats.setKey("day", "MMMM dt");
    dateAxis.renderer.grid.template.disabled = true;
    dateAxis.renderer.ticks.template.disabled = false;
    if (propData.length > 0) {

      Object.keys(propData[0]).map((propDataKey) => {
        if (propDataKey !== 'date' && propDataKey !== 'dateForms') {
          if (propData[0][propDataKey]) {
            let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
            valueAxis.marginTop = 30;
            valueAxis.zIndex = 3;
            valueAxis.renderer.labels.template.padding(2, 2, 2, 2);
            valueAxis.renderer.gridContainer.background.fill = interfaceColors.getFor("alternativeBackground");
            valueAxis.renderer.gridContainer.background.fillOpacity = 0.05;
            this.addSeries(propDataKey, valueAxis, chart);
          }
        }
      })
    }
    chart.cursor = new am4charts.XYCursor();
    chart.cursor.xAxis = dateAxis;
    this.chart = chart;
  }

  addSeries = (valueY, valueAxis, chart) => {
    console.log("???????", valueY);
    let series = new am4charts.LineSeries();
    var seriesId = chart.series.length + 1;

    // series.stacked = true;

    series.dataFields.dateX = "date";
    series.dataFields.valueY = valueY;
    series.yAxis = valueAxis;
    series.tooltipText = "{dateX.formatDate('HH:mm, d MMMM')} : {valueY.value}";
    series.name = "Series #" + seriesId;
    series = chart.series.push(series);
  }

  componentDidMount() {
    this.initChart();
  }

  componentWillUnmount() {
    if (this.chart) {
      this.chart.dispose();
      console.log("THIS CHART>>>>>>>", this.chart);
    }
    am4core.disposeAllCharts();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.data !== this.props.data) {
      this.initChart();
    }
  }

  render() {
    const chartIndexing = `XyComparisonChartdiv${this.props.indexing || 0}`;
    return (
      <div id={chartIndexing} style={{ width: "100%", height: "450px" }}></div>
    );
  }
}

export default XyComparisonChart;
