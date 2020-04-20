import React, { Component, Fragment } from "react";
import * as atlas from "azure-maps-control";

// import Aux from "../../hoc/Aux";
import keys from '../../config/keys';
import pump from "../../assets/icons/pump_green.svg";

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
      center: [12.984056, 77.6906928],
      zoom: 2,
      view: "Auto",
      language: "en-US",
      authOptions: {
        authType: "subscriptionKey",
        subscriptionKey: keys.AZURE_MAP_SUB_KEY
      }
    });
    this.setState({ mapInstant: map });
    this.initializeMap();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.mapInfo !== this.props.mapInfo) {
      this.initializeMap();
    }
  }

  initializeMap() {
    let categories = ['bar', 'coffee', 'restaurant'];

    const mapInfo = this.props.mapInfo;
    
    if(this.state.mapInstant){
      this.state.mapInstant.events.add('ready', () => {
        //Create a data source and add it to the map.
        let datasource = new atlas.source.DataSource();
        this.state.mapInstant.sources.add(datasource);
  
        this.state.mapInstant.imageSprite.add(
          "my-custom-icon",
          pump
        ).then(() => {
          this.state.mapInstant.layers.add(new atlas.layer.SymbolLayer(datasource, '', {
            iconOptions: {
              //Pass in the id of the custom icon that was loaded into the map resources.
              image: 'my-custom-icon',
  
              //Optionally scale the size of the icon.
              size: 0.1
            },
            textOptions: {
              //Convert the temperature property of each feature into a string and concatenate "°F".
              textField: ['concat', ['to-string', ['get', 'temperature']], '°F'],
  
              //Offset the text so that it appears on top of the icon.
              offset: [0, -2]
            }
          }));
        });
  
  
        //Add a data set to the data source. 
        if (mapInfo.length > 0) {
          // mapInfo.map(mapCoords => {
          //   datasource.add(new atlas.data.Feature(new atlas.data.Point(mapCoords)))
          // })
          let atlasCoords = mapInfo.map(mapCoords => {
            return new atlas.data.Feature(new atlas.data.Point(mapCoords))
          });
          datasource.add([...atlasCoords]);
        }
  
        // datasource.add([
        //   new atlas.data.Feature(new atlas.data.Point([-122.338913, 47.607471])),
        //   new atlas.data.Feature(new atlas.data.Point([-122.341187, 47.608192])),
        //   new atlas.data.Feature(new atlas.data.Point([-122.335014, 47.607960])),
        //   new atlas.data.Feature(new atlas.data.Point([-122.337555, 47.608620])),
        //   new atlas.data.Feature(new atlas.data.Point([-122.338524, 47.606907])),
        //   new atlas.data.Feature(new atlas.data.Point([-122.336655, 47.606251])),
        //   new atlas.data.Feature(new atlas.data.Point([-122.336182, 47.607185])),
        //   new atlas.data.Feature(new atlas.data.Point([-122.337784, 47.607784])),
        //   new atlas.data.Feature(new atlas.data.Point([-122.338455, 47.606880])),
        //   new atlas.data.Feature(new atlas.data.Point([-122.336823, 47.607239])),
        //   new atlas.data.Feature(new atlas.data.Point([-122.339027, 47.608040])),
        //   new atlas.data.Feature(new atlas.data.Point([-122.335892, 47.607594]))
        // ]);
  
        //Create a symbol layer for each category.
        categories.forEach((category) => {
          //Create a symbol layer for the category. Give each layer an id so we can easily retrieve it later.
          this.state.mapInstant.layers.add(new atlas.layer.SymbolLayer(datasource, category, {
            iconOptions: {
              //The map control has built in icons for bar, coffee and restaurant that we can use.
              image: category,
              anchor: 'center',
              allowOverlap: true
            },
  
            //Create a filter which will only render points for the specified category in this layer.
            filter: ['==', ['get', 'category'], category]
          }));
        });
      });
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
