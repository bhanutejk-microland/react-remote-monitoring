/* App.js */
import React, { Component } from "react";
import CanvasJSReact from "../../assets/canvas/canvasjs.react";
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

var startTime = 0, endTime = 0;

class PerformanceChart extends Component {
    
    render() {
        var limit = 100;
        var y = 100;
        var data = [];
        var dataSeries = { type: "line" };
        var dataPoints = [];

        for (var i = 0; i < limit; i += 1) {
            y += Math.round(Math.random() * 10 - 5);
            dataPoints.push({
                x: i,
                y: y
            });
        }
        dataSeries.dataPoints = dataPoints;
        data.push(dataSeries);

        const spanStyle = {
            position: 'absolute',
            top: '10px',
            fontSize: '20px',
            fontWeight: 'bold',
            backgroundColor: '#d85757',
            padding: '0px 4px',
            color: '#ffffff'
        }

        const options = {
          backgroundColor: "#00000000",
          zoomEnabled: true,
          animationEnabled: true,
          axisY: {
            includeZero: false
          },
          data: data // random data
        };

        startTime = new Date();

        return (
            <div>
                <CanvasJSChart options={options}
                    onRef={ref => this.chart = ref}
                />
                {/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}
                <span id="timeToRender" style={spanStyle}></span>
            </div>
        );
    }
}

export default PerformanceChart;
