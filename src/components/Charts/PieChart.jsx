import React, { Component } from "react";

import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";

am4core.useTheme(am4themes_animated);

class PieChart extends Component {

  onChartInitialise(){
    let chart = am4core.create(
      `pieChartdiv`,
      am4charts.PieChart
    );   
    
    chart.data = this.props.chartData;
    chart.logo.__disabled = true;
    
    // Add and configure Series
    let pieSeries = chart.series.push(new am4charts.PieSeries());
    pieSeries.dataFields.value = "value";
    pieSeries.dataFields.category = "name";
    // pieSeries.slices.template.propertyFields.fill = "color";
    pieSeries.slices.template.strokeWidth = 2;
    pieSeries.slices.template.strokeOpacity = 1;

    // This creates initial animation
    pieSeries.hiddenState.properties.opacity = 1;
    pieSeries.hiddenState.properties.endAngle = -90;
    pieSeries.hiddenState.properties.startAngle = -90;
    
    // chart.legend = new am4charts.Legend();

    // Modify chart's colors
    pieSeries.colors.list = [
      am4core.color("#bec4f8"),
      am4core.color("#a5abee"),
      am4core.color("#6a6dde"),
      am4core.color("#4d42cf"),
      am4core.color("#713e8d"),
      am4core.color("#a160a0"),
    ];

    this.chart = chart;
  }

  componentDidMount() {
    this.onChartInitialise();
  }

  componentDidUpdate(prevProps, prevState) {
    // only update chart if the data has changed
    
    if (prevProps.chartData !== this.props.chartData) {
        this.onChartInitialise();
    }
  }

  componentWillUnmount() {
    if (this.chart) {
      this.chart.dispose();
    }
  }

  render() {
    const chartIndexing = `pieChartdiv`;
    return (
      <div id={chartIndexing} style={{ width: "100%", height: "250px" }}></div>
    );
  }
}

export default PieChart;
