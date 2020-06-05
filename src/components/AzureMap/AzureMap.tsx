import React, { Component, Fragment } from "react";
import * as atlas from "azure-maps-control";

// import Aux from "../../hoc/Aux";
import keys from '../../config/keys';
import classes from './AzureMap.css';

interface AzureMapProps {
  mapInfo: Array<any>
}

interface AzureMapState {
  mapInstant: any
}

export default class AzureMap extends Component<AzureMapProps, AzureMapState> {

  constructor(props: AzureMapProps) {
    super(props);
    this.state = {
      mapInstant: null
    }
  }

  componentDidMount() {
    let map = new atlas.Map("map", {
      center: [77.6906928, 12.984056],
      // center: [-122.33, 47.64],
      zoom: 8,
      view: "Auto",
      language: "en-US",
      authOptions: {
        authType: "subscriptionKey",
        subscriptionKey: keys.AZURE_MAP_SUB_KEY
      }
    });
    this.setState({ mapInstant: map }, () => {
      this.initializeMap();
    });
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.mapInfo !== this.props.mapInfo) {
      this.initializeMap();
    }
  }

  initializeMap() {
    var datasource, popup;
    var popupTemplate = `<div class="${classes.customInfobox}">
                          <img src="{img_url}" alt="asset Img" width="100px" height="100px">
                          <div class="${classes.name}">{name}</div>
                            {address}
                        </div>`;
    //Wait until the map resources are ready.
    this.state.mapInstant.events.add('ready', () => {

      //Create a data source and add it to the map.
      datasource = new atlas.source.DataSource('', {
        cluster: true
      });
      this.state.mapInstant.sources.add(datasource);

      const dataPoints = this.props.mapInfo.map(data => {
        return new atlas.data.Feature(new atlas.data.Point(data.coordinates), {
          name: data.name,
          address: data.address,
          url: data.url
        });
      })
      //Add the symbol to the data source.
      datasource.add([...dataPoints]);
      //Add a layer for rendering point data as symbols.
      var symbolLayer = new atlas.layer.SymbolLayer(datasource, '', {
        iconOptions: {
          image: 'pin-red'
        }
      });
      this.state.mapInstant.layers.add(symbolLayer);
      //Create a popup but leave it closed so we can update it and display it later.
      popup = new atlas.Popup({
        pixelOffset: [0, -18]
      });
      //Add a click event to the symbol layer.
      this.state.mapInstant.events.add('click', symbolLayer, symbolClicked);
    });

    const symbolClicked = (e) => {
      //Make sure the event occured on a point feature.
      if (e.shapes && e.shapes.length > 0) {
        var content, coordinate;
        //Check to see if the first value in the shapes array is a Point Shape.
        if (e.shapes[0] instanceof atlas.Shape && e.shapes[0].getType() === 'Point') {
          var properties = e.shapes[0].getProperties();
          content = popupTemplate.replace(/{img_url}/g, properties.url).replace(/{name}/g, properties.name).replace(/{address}/g, properties.address);
          coordinate = e.shapes[0].getCoordinates();
        } else if (e.shapes[0].type === 'Feature' && e.shapes[0].geometry.type === 'Point') {
          //Check to see if the feature is a cluster.
          if (e.shapes[0].properties.cluster) {
            content = '<div style="padding:10px;"><b>Cluster of ' + e.shapes[0].properties.point_count + ' Assets</b></div>';
          } else {
            //Feature is likely from a VectorTileSource.
            content = popupTemplate.replace(/{img_url}/g, properties.url).replace(/{name}/g, properties.name).replace(/{address}/g, properties.address);
          }
          coordinate = e.shapes[0].geometry.coordinates;
        }
        if (content && coordinate) {
          //Populate the popupTemplate with data from the clicked point feature.
          popup.setOptions({
            //Update the content of the popup.
            content: content,
            //Update the position of the popup with the symbols coordinate.
            position: coordinate
          });
          //Open the popup.
          popup.open(this.state.mapInstant);
        }
      }
    }
  }

  render() {
    return (
      <Fragment>
        <div
          id="map"
          style={{
            width: "100%",
            height: "calc(100 % - 50px)"
          }}
        ></div>
      </Fragment>
    );
  }
}
