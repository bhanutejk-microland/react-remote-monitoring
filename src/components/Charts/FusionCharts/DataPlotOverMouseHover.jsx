Promise.all([
  loadData(
    "https://s3.eu-central-1.amazonaws.com/fusion.store/ft/data/data-plot-hover-mouse-event_data.json"
  ),
  loadData(
    "https://s3.eu-central-1.amazonaws.com/fusion.store/ft/schema/data-plot-hover-mouse-event_schema.json"
  )
]).then(function(res) {
  var data = res[0];
  var schema = res[1];
  var dataStore = new FusionCharts.DataStore();

  new FusionCharts({
    type: "timeseries",
    renderAt: "chart-container",
    id: "data-plot-hover-mouse-event",
    width: "100%",
    height: "100%",
    dataSource: {
      chart: {
        theme: "fusion"
      },
      caption: {
        text: "Web visits & downloads"
      },
      subcaption: {
        text: "since 2015"
      },
      yAxis: [
        {
          plot: [
            {
              value: "Downloads",
              type: "column"
            },
            {
              value: "Web Visits",
              type: "line"
            }
          ]
        }
      ],
      data: dataStore.createDataTable(data, schema)
    },
    events: {
      dataPlotRollOver: function(e) {
        var infoElem = document.getElementById("infolbl");
        infoElem.innerHTML =
          "You are hovering over the plot with binning from <b>" +
          e.data.startText +
          "</b> to <b>" +
          e.data.endText +
          "</b>. Aggregated value (avg.) is <b>" +
          Math.round(e.data.binValue * 100) / 100 +
          " (" +
          e.data.measure +
          ")</b>";
      },
      dataPlotRollOut: function(e) {
        var infoElem = document.getElementById("infolbl");
        infoElem.innerHTML = "Hover over the plots to see the details.";
      }
    }
  }).render();
});

