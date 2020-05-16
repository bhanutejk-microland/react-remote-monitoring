import React , {Component} from "react";
import * as am4core from "@amcharts/amcharts4/core";

import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
am4core.useTheme(am4themes_animated);

class GaugeChart extends Component{
    onChartInitialise(){
        let chart = am4core.create(`gaugeChartdiv${this.props.name}`, am4charts.GaugeChart);

        // Create axis
        let axis = chart.xAxes.push(new am4charts.ValueAxis()); 
        axis.min = this.props.property.minimum;
        axis.max = this.props.property.maximum;
        axis.strictMinMax = true;
        axis.renderer.labels.template.dy = -20;
        // Set inner radius
        chart.innerRadius = 70;
        chart.radius = 30;
        chart.logo.__disabled = true;
        // Add ranges
        let range = axis.axisRanges.create();
        range.value = 0;
        range.endValue = 50;
        range.axisFill.fillOpacity = 0.6;
        range.axisFill.fill = am4core.color("#009900");
        range.axisFill.zIndex = - 1;

        let range2 = axis.axisRanges.create();
        range2.value = 50;
        range2.endValue = 70;
        range2.axisFill.fillOpacity = 0.6;
        range2.axisFill.fill = am4core.color("#ffa000");
        range2.axisFill.zIndex = - 1;

        let range3 = axis.axisRanges.create();
        range3.value = 70;
        range3.endValue = this.props.property.maximum;
        range3.axisFill.fillOpacity = 0.6;
        range3.axisFill.fill = am4core.color("#dd2c00");
        range3.axisFill.zIndex = - 1;

        // Add hand
        let hand = chart.hands.push(new am4charts.ClockHand());
        hand.value = Math.ceil(this.props.property.value);
        hand.pin.disabled = true;
        hand.fill = am4core.color("#2D93AD");
        hand.stroke = am4core.color("#2D93AD");
        hand.innerRadius = am4core.percent(20);
        hand.radius = 60;
        hand.startWidth = 5;
        // hand.events.on("propertychanged", function(ev) {
        //     range.endValue = ev.target.value;
        //     range3.value = ev.target.value;
        //     axis.invalidate();
        // });

        // Add label
        let label = chart.radarContainer.createChild(am4core.Label);
        label.isMeasured = false;
        label.fontSize = 20;
        label.x = am4core.percent(50);
        label.y = 20;
        label.horizontalCenter = "middle";
        label.verticalCenter = "top";
        label.text = Math.ceil(this.props.property.value)+' '+this.props.property.unit;

        
        this.chart = chart;
    }
    componentDidMount(){
        // Create chart
        this.onChartInitialise();
    }

    componentDidUpdate(prevProps, prevState) {
        // only update chart if the data has changed
        if (prevProps.property !== this.props.property) {
            this.onChartInitialise();
        }
      }

    componentWillUnmount(){
        if(this.chart){
            this.chart.dispose();
        }
    }

    render(){
        const chartIndexing = `gaugeChartdiv${this.props.name}`;
        return(
            <div id={chartIndexing} style={{ width: "100%", height: "100%" }}></div>
        )
    }
}

export default GaugeChart;

