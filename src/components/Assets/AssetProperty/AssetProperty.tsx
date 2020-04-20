import React, { FunctionComponent } from "react";
import Grid from "@material-ui/core/Grid";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Skeleton from "@material-ui/lab/Skeleton";

import classes from "./AssetProperty.css";
import XyChart from "../../Charts/XyChart";
import { AssetPropertyModel } from "../../../interfaceModels/AssetPropertyModel";

interface AssetPropertyProps {
  property: AssetPropertyModel | null;
}

const AssetProperty: FunctionComponent<AssetPropertyProps> = ({ property }) => {
  const newTelemetryData = new Array();
  if (property && property.telemetry !== undefined) {
    property.telemetry.map(telData => {
      newTelemetryData.push({
        date: new Date(telData.timestamp),
        value: telData.tempValue
      });
    });
  }

  const renderAssetPropertySkeleten = () => {
    return (
      <Grid container spacing={2}>
        <Grid item xs={6} md={4} className={classes.AssetPropertyList}>
          {[1, 2, 3, 4].map(item => {
            return (
              <Grid container key={"AssetPropertySkeleten" + item}>
                <Grid item xs={6}>
                  <Skeleton variant="text" width="100%" />
                </Grid>
                <Grid item xs={6}>
                  <Skeleton variant="text" width="100%" />
                </Grid>
              </Grid>
            );
          })}
        </Grid>
        <Grid item xs={6} md={8}>
          <Skeleton width="100%" height="50px" />
          <Skeleton width="100%" height="200px" />
        </Grid>
      </Grid>
    );
  };

  const renderAssetPropertyContent = () => {
    if (property && property.telemetry !== undefined) {
      return (
        <Grid container spacing={2}>
          <Grid item xs={6} md={4} className={classes.AssetPropertyList}>
            {Object.keys(property).map((propertyKey, index) => {
              return propertyKey !== "telemetry" ? (
                <ListItem key={"AssetProperty" + propertyKey + index}>
                  <ListItemText
                    className={classes.ListContent}
                    primary={propertyKey}
                  />
                  <ListItemText
                    className={classes.ListContent}
                    primary={property[propertyKey].toString()}
                  />
                </ListItem>
              ) : null;
            })}
          </Grid>
          <Grid item xs={6} md={8}>
            <XyChart
              chartData={newTelemetryData}
              indexing={property.name}
              chartHeight="300px"
            />
          </Grid>
        </Grid>
      );
    } else {
      return renderAssetPropertySkeleten();
    }
  };

  return (
    <div className={classes.AssetPropertyCard}>
      {renderAssetPropertyContent()}
    </div>
  );
};

export default AssetProperty;
