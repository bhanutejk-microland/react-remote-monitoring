import React, { Component } from "react";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";

am4core.useTheme(am4themes_animated);

class XyComparisonChart extends Component {
  state = {
    data: []
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
    if (prevProps.data !== this.props.data) {
      this.initChart();
    }
  }

  initChart() {
    let chart = am4core.create(`XyComparisonChartdiv${this.props.indexing || 0}`, am4charts.XYChart);


    let interfaceColors = new am4core.InterfaceColorSet();
    //
    let propData = this.props.data;

    console.log(">>><<<<<<<<<<<<<<<>>>>>>>>>>>>>>>", propData);
    // chart.data = data;
    chart.data = propData
    chart.leftAxesContainer.layout = "vertical";

    let dateAxis = chart.xAxes.push(new am4charts.DateAxis());
    dateAxis.renderer.grid.template.location = 0;
    dateAxis.renderer.ticks.template.length = 8;
    dateAxis.renderer.ticks.template.strokeOpacity = 0.1;
    dateAxis.renderer.grid.template.disabled = true;
    dateAxis.renderer.ticks.template.disabled = false;
    dateAxis.renderer.ticks.template.strokeOpacity = 0.2;

    // these two lines makes the axis to be initially zoomed-in
    //dateAxis.start = 0.7;
    dateAxis.keepSelection = true;
    if (propData.length > 0) {

      Object.keys(propData[0]).map((propDataKey) => {
        if (propDataKey !== 'date') {
          if (propData[0][propDataKey]) {
            let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
            valueAxis.tooltip.disabled = true;
            valueAxis.marginTop = 30;
            valueAxis.zIndex = 3;
            valueAxis.renderer.baseGrid.disabled = true;
  
            // Set up axis
            valueAxis.renderer.inside = false;
            valueAxis.renderer.labels.template.verticalCenter = "bottom";
            valueAxis.renderer.labels.template.padding(2, 2, 2, 2);
            valueAxis.renderer.fontSize = "0.8em"
  
            // uncomment these lines to fill plot area of this axis with some color
            valueAxis.renderer.gridContainer.background.fill = interfaceColors.getFor("alternativeBackground");
            valueAxis.renderer.gridContainer.background.fillOpacity = 0.05;
            this.addSeries(propDataKey, valueAxis, chart);
          }
        }
      })
    }
    chart.cursor = new am4charts.XYCursor();
    chart.cursor.xAxis = dateAxis;
  }

  addSeries = (valueY, valueAxis, chart) => {
  console.log("???????", valueY);
  let series = new am4charts.LineSeries();
  var seriesId = chart.series.length + 1;

  // series.stacked = true;

  series.dataFields.dateX = "date";
  series.dataFields.valueY = valueY;
  series.yAxis = valueAxis;
  series.tooltipText = "{valueY.value}";
  series.name = "Series #" + seriesId;
  series = chart.series.push(series);
}

render() {
  const chartIndexing = `XyComparisonChartdiv${this.props.indexing || 0}`;
  return (
    <div id={chartIndexing} style={{ width: "100%", height: "450px" }}></div>
  );
}
}

export default XyComparisonChart;
