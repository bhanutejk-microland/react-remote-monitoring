import React , {Component} from "react";
import * as am4core from "@amcharts/amcharts4/core";

import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
am4core.useTheme(am4themes_animated);

class GaugeChart extends Component{
    componentDidMount(){
        // Create chart
        let chart = am4core.create(`gaugeChartdiv${this.props.name}`, am4charts.GaugeChart);

        // Create axis
        let axis = chart.xAxes.push(new am4charts.ValueAxis()); 
        axis.min = this.props.min;
        axis.max = this.props.max;
        axis.strictMinMax = true;

        // Set inner radius
        chart.innerRadius = -20;

        // Add ranges
        let range = axis.axisRanges.create();
        range.value = 0;
        range.endValue = 70;
        range.axisFill.fillOpacity = 1;
        range.axisFill.fill = am4core.color("#88AB75");
        range.axisFill.zIndex = - 1;

        let range2 = axis.axisRanges.create();
        range2.value = 70;
        range2.endValue = 90;
        range2.axisFill.fillOpacity = 1;
        range2.axisFill.fill = am4core.color("#DBD56E");
        range2.axisFill.zIndex = - 1;

        let range3 = axis.axisRanges.create();
        range3.value = 90;
        range3.endValue = 100;
        range3.axisFill.fillOpacity = 1;
        range3.axisFill.fill = am4core.color("#DE8F6E");
        range3.axisFill.zIndex = - 1;

        // Add hand
        let hand = chart.hands.push(new am4charts.ClockHand());
        hand.value = this.props.value;
        hand.pin.disabled = true;
        hand.fill = am4core.color("#2D93AD");
        hand.stroke = am4core.color("#2D93AD");
        hand.innerRadius = am4core.percent(20);
        hand.radius = am4core.percent(80);
        hand.startWidth = 5;
        //hand.showValue(this.props.value);

        // Add label
        let label = chart.radarContainer.createChild(am4core.Label);
        label.isMeasured = false;
        label.fontSize = 30;
        label.x = am4core.percent(50);
        label.y = am4core.percent(100);
        label.horizontalCenter = "middle";
        label.verticalCenter = "top";
        label.text = "50";

        //Animate
        setInterval(function() {
            var value = Math.round(Math.random() * 100);
            label.text = value;
            hand.showValue(value, 1000, am4core.ease.cubicOut);
        }, 2000);
        this.chart = chart;
    }

    componentWillUnmount(){
        if(this.chart){
            this.chart.dispose();
        }
    }

    render(){
        const chartIndexing = `gaugeChartdiv${this.props.name}`;
        return(
            <div id={chartIndexing} style={{ width: "100%", height: "200px" }}></div>
        )
    }
}

export default GaugeChart;

