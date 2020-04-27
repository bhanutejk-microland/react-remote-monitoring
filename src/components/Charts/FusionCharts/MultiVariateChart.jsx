import React from "react";
import ReactFC from "react-fusioncharts";
import FusionCharts from "fusioncharts";
import TimeSeries from "fusioncharts/fusioncharts.timeseries";
ReactFC.fcRoot(FusionCharts, TimeSeries);

const jsonify = res => res.json();
const dataFetch = fetch(
  "https://s3.eu-central-1.amazonaws.com/fusion.store/ft/data/different-plot-type-for-each-variable-measure-data.json"
).then(jsonify);
const schemaFetch = fetch(
  "https://s3.eu-central-1.amazonaws.com/fusion.store/ft/schema/different-plot-type-for-each-variable-measure-schema.json"
).then(jsonify);

const dataSource = {
  chart: {},
  caption: {
    text: "Sales Performance"
  },
  yaxis: [
    {
      plot: {
        value: "Sale Amount",
        type: "area"
      },
      title: "Sale Amount",
      format: {
        prefix: "$"
      }
    },
    {
      plot: {
        value: "Units Sold",
        type: "column"
      },
      title: "Units Sold"
    }
  ]
};

  class MultiVariateChart extends React.Component{
    constructor(props) {
        super(props);
        this.onFetchData = this.onFetchData.bind(this);
        this.state = {
          timeseriesDs: {
            type: "timeseries",
            renderAt: "container",
            width: "600",
            height: "400",
            dataSource
          }
        };
      }
    
      componentDidMount() {
        this.onFetchData();
      }
    
      onFetchData() {
        Promise.all([dataFetch, schemaFetch]).then(res => {
          const data = res[0];
          const schema = res[1];
          const fusionTable = new FusionCharts.DataStore().createDataTable(
            data,
            schema
          );
          const timeseriesDs = Object.assign({}, this.state.timeseriesDs);
          timeseriesDs.dataSource.data = fusionTable;
          this.setState({
            timeseriesDs
          });
        });
      }
    
      render() {
        return (
          <div>
            {this.state.timeseriesDs.dataSource.data ? (
              <ReactFC {...this.state.timeseriesDs} />
            ) : (
              "loading"
            )}
          </div>
        );
      }
  }

  export default MultiVariateChart;