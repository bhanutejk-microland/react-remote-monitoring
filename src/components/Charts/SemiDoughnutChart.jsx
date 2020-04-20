import React, { Component } from "react";
import CanvasJSReact from "../../assets/canvas/canvasjs.react";
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

class SemiDoughnutChart extends Component {
  _addTransparentDoughtnutDataPoint = dataPoints => {
    // let sum = 0;
    // for (let i = 0; i < dataPoints.length; i++) {
    //   sum += dataPoints[i].y;
    // }

    // dataPoints.splice(0, 0, {
    //   y: sum,
    //   color: "transparent",
    //   name: "",
    //   toolTipContent: null,
    //   highlightEnabled: false,
    //   visible: false
    // });
    return dataPoints;
  };

  render() {
    const doughnutDataPoints = this._addTransparentDoughtnutDataPoint(
      this.props.dataPoints
    );
    const options = {
      animationEnabled: true,
      height: 250,
      width: 436,
      subtitles: [
        {
          text: this.props.dataPoints[0].y.toString() + "%",
          verticalAlign: "center",
          fontSize: 24,
          dockInsidePlotArea: true
        }
      ],
      data: [
        {
          type: "doughnut",
          innerRadius: 50,
          showInLegend: false,
          // indexLabel: "{name} {name !== '' ? y : null}",
          yValueFormatString: "#,###'%'",
          dataPoints: doughnutDataPoints
        }
      ]
    };

    return (
      <div>
        <CanvasJSChart options={options} />
      </div>
    );
  }
}

export default SemiDoughnutChart;
