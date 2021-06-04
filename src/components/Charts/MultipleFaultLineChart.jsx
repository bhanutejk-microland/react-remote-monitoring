import React, { Component } from "react";

import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";

am4core.useTheme(am4themes_animated);



class MultipleFaultLineChart extends Component {  

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

//

// Increase contrast by taking evey second color
chart.colors.step = 2;

// Add data
chart.data = this.props.chartData;

// Create axes
var dateAxis = chart.xAxes.push(new am4charts.DateAxis());
dateAxis.renderer.minGridDistance = 50;

// Create series
function createAxisAndSeries(field, name, opposite, bullet) {
  var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
  valueAxis.baseValue = 0.5;
  if(chart.yAxes.indexOf(valueAxis) != 0){
  	valueAxis.syncWithAxis = chart.yAxes.getIndex(0);
  }

  chart.events.on("ready", function(ev) {
    valueAxis.min = 0;
    valueAxis.max = 1;
  });
  
  var series = chart.series.push(new am4charts.LineSeries());
  series.dataFields.valueY = field;
  series.dataFields.dateX = "timestamp";
  series.strokeWidth = 2;
  series.yAxis = valueAxis;
  series.name = name;
  series.tooltipText = `{name}: [bold]{valueY}[/]
                          Head: {head}
                          Flow: {flow}
                          Speed: {speed}
                          Torque: {torque}`;
  series.tensionX = 0.8;
  series.showOnInit = true;
  series.tooltip.pointerOrientation = "vertical";
  var interfaceColors = new am4core.InterfaceColorSet();
  
  switch(bullet) {
    case "triangle":
      var bullet = series.bullets.push(new am4charts.Bullet());
      bullet.width = 12;
      bullet.height = 12;
      bullet.horizontalCenter = "middle";
      bullet.verticalCenter = "middle";
      bullet.adapter.add("fill", function(fill, target){
          if(target.dataItem.valueY > 0.5){
              return am4core.color("#FF0000");
          }
          return fill;
      });

      var range = valueAxis.createSeriesRange(series);
      range.value = 0.5;
      range.endValue = 1;
      range.contents.stroke = am4core.color("#FF0000");
      range.contents.fill = am4core.color("#222d32");
      
      var triangle = bullet.createChild(am4core.Triangle);
      triangle.stroke = interfaceColors.getFor("background");
      triangle.strokeWidth = 2;
      triangle.direction = "top";
      triangle.width = 12;
      triangle.height = 12;
      break;
    case "rectangle":
      var bullet2 = series.bullets.push(new am4charts.Bullet());
      bullet2.width = 10;
      bullet2.height = 10;
      bullet2.horizontalCenter = "middle";
      bullet2.verticalCenter = "middle";
      bullet2.adapter.add("fill", function(fill, target){
          if(target.dataItem.valueY > 0.5){
              return am4core.color("#FF0000");
          }
          return fill;
      });

      var range2 = valueAxis.createSeriesRange(series);
      range2.value = 0.5;
      range2.endValue = 1;
      range2.contents.stroke = am4core.color("#FF0000");
      range2.contents.fill = range2.contents.stroke;
      
      var rectangle = bullet2.createChild(am4core.Rectangle);
      rectangle.stroke = interfaceColors.getFor("background");
      rectangle.strokeWidth = 2;
      rectangle.width = 10;
      rectangle.height = 10;
      break;
    default:
      var bullet = series.bullets.push(new am4charts.CircleBullet());
      bullet.circle.stroke = interfaceColors.getFor("background");
      bullet.circle.strokeWidth = 2;
      break;
  }
  
  valueAxis.renderer.line.strokeOpacity = 1;
  valueAxis.renderer.line.strokeWidth = 2;
  valueAxis.renderer.line.stroke = series.stroke;
  valueAxis.renderer.labels.template.fill = series.stroke;
  valueAxis.renderer.opposite = opposite;
}

// createAxisAndSeries("healthy", "Healthy", false, "circle");
createAxisAndSeries("brokenBlade", "Broken Blade", true, "triangle");
// createAxisAndSeries("hits", "Hits", true, "rectangle");

// Add legend
chart.legend = new am4charts.Legend();

// Add cursor
chart.cursor = new am4charts.XYCursor();

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
        style={{ width: "100%", height: this.props.chartHeight || '300px' }}
      ></div>
    );
  }
}

export default MultipleFaultLineChart;
