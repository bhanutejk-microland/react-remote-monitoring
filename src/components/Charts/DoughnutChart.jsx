import React, { Component } from "react";
// import CanvasJSReact from '../../assets/canvasjs.react';
import CanvasJSReact from "../../assets/canvas/canvasjs.react";
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

class DoughnutChart extends Component {
  render() {
    const doughnutDataPoints = this.props.datapoints;
    const options = {
      animationEnabled: true,
      subtitles: [
        {
          text: "15%",
          verticalAlign: "center",
          fontSize: 24,
          dockInsidePlotArea: true
        }
      ],
      data: [
        {
          type: "doughnut",
          innerRadius: 100,
          showInLegend: true,
          indexLabel: "{name}: {y}",
          yValueFormatString: "#,###'%'",
          dataPoints: doughnutDataPoints
        }
      ]
    };

    return (
      <div>
        <CanvasJSChart
          options={options}
          /* onRef={ref => this.chart = ref} */
        />
        {/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}
      </div>
    );
  }
}

export default DoughnutChart;
