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
  if(chart.yAxes.indexOf(valueAxis) != 0){
  	valueAxis.syncWithAxis = chart.yAxes.getIndex(0);
  }

  chart.events.on("ready", function(ev) {
    valueAxis.min = 0;
    valueAxis.max = 120;
  });
  
  var series = chart.series.push(new am4charts.LineSeries());
  series.dataFields.valueY = field;
  series.dataFields.dateX = "timestamp";
  series.strokeWidth = 2;
  series.yAxis = valueAxis;
  series.name = name;
  series.tooltipText = "{name}: [bold]{valueY}[/]";
  series.tensionX = 0.8;
  series.showOnInit = true;
  
  var interfaceColors = new am4core.InterfaceColorSet();
  
  switch(bullet) {
    case "triangle":
      var bullet = series.bullets.push(new am4charts.Bullet());
      bullet.width = 12;
      bullet.height = 12;
      bullet.horizontalCenter = "middle";
      bullet.verticalCenter = "middle";
      
      var triangle = bullet.createChild(am4core.Triangle);
      triangle.stroke = interfaceColors.getFor("background");
      triangle.strokeWidth = 2;
      triangle.direction = "top";
      triangle.width = 12;
      triangle.height = 12;
      break;
    case "rectangle":
      var bullet = series.bullets.push(new am4charts.Bullet());
      bullet.width = 10;
      bullet.height = 10;
      bullet.horizontalCenter = "middle";
      bullet.verticalCenter = "middle";
      
      var rectangle = bullet.createChild(am4core.Rectangle);
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

createAxisAndSeries("healthy", "Healthy", false, "circle");
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
