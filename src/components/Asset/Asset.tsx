import React, { FunctionComponent, MouseEvent } from "react";
import Grid from "@material-ui/core/Grid";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Typography from "@material-ui/core/Typography";
import ExpansionPanelActions from "@material-ui/core/ExpansionPanelActions";
import Divider from "@material-ui/core/Divider";
import Chip from "@material-ui/core/Chip";
import { Link } from "react-router-dom";
import { withRouter } from "react-router";
import Skeleton from "@material-ui/lab/Skeleton";

import classes from "./Asset.css";
import AssetIcon from "../../assets/icons/water-bomb.svg";
import NotificationIcon from "../../assets/icons/notification.svg";
import ViewIcon from "../../assets/icons/view.svg";
import DownTimeIcon from "../../assets/icons/down-arrow.svg";
import CircleTickIcon from "../../assets/icons/tick.svg";
import { IndividualAssetModel } from "../../interfaceModels/IndividualAssetModel";

interface AssetProps {
  asset: IndividualAssetModel;
  location: any;
  match: any;
}

const renderSkeleton = () => {
  return <Grid item xs={6}>
    <ExpansionPanel defaultExpanded>
      <ExpansionPanelSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1c-content"
        id="panel1c-header"
        className={classes.AssetPanelHeader}
      >
        <Skeleton variant="text" width="50%" />
      </ExpansionPanelSummary>
      <ExpansionPanelDetails className="">
        <Grid container spacing={2}>
          <Grid item xs={12} md={4} lg={3}>
            <Skeleton variant="circle" width="100px" height="100px" />
          </Grid>
          <Grid
            item
            xs={12}
            md={8}
            lg={9}
            className={classes.AssetListContent}
          >
            <div className={classes.AssetCardDetails}>
              {[1, 2, 3, 4].map(item => {
                return (
                  <Grid container key={"assetContent" + item}>
                    <Grid item xs={6}>
                      <Skeleton variant="text" width="100%" />
                    </Grid>
                    <Grid item xs={6}>
                      <Skeleton variant="text" width="100%" />
                    </Grid>
                  </Grid>
                );
              })}
            </div>
          </Grid>
        </Grid>
      </ExpansionPanelDetails>
    </ExpansionPanel>
  </Grid>
};

const Asset: FunctionComponent<AssetProps> = ({ asset, location, match }) => {
  if (Object.keys(asset).length === 0) {
    return renderSkeleton();
  }
  return (
    <Grid item xs={6} key={asset.assetId}>
      <ExpansionPanel defaultExpanded>
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1c-content"
          id="panel1c-header"
          className={classes.AssetPanelHeader}
        >
          <div className="">
            <Typography className="">
              <b>ASSET ID:</b> {asset.assetId}
            </Typography>
          </div>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails className="">
          <Grid container spacing={2}>
            <Grid item xs={12} md={4} lg={3}>
              <img src={asset.url} width="100%" />
            </Grid>
            <Grid
              item
              xs={12}
              md={8}
              lg={9}
              className={classes.AssetListContent}
            >
              <div className={classes.AssetCardDetails}>
                {Object.keys(asset).map((assetKey, index) => {
                  if (assetKey !== "url" && assetKey !== "assetId" && assetKey !== "assetTabInfo") {
                    return (
                      <Grid container key={asset[assetKey] + index}>
                        <Grid item xs={6}>
                          {assetKey}:
                        </Grid>
                        <Grid item xs={6}>
                          {asset[assetKey]}
                        </Grid>
                      </Grid>
                    );
                  }
                })}
              </div>
            </Grid>
          </Grid>
        </ExpansionPanelDetails>
        <Divider />
        <ExpansionPanelActions>
          <Chip
            variant="outlined"
            size="small"
            avatar={
              <img
                src={asset.status === "Running" ? CircleTickIcon : DownTimeIcon}
                width="100%"
                style={{ backgroundColor: "#fff", marginLeft: "6px" }}
              />
            }
            label={asset.status}
            clickable
            color="primary"
          />
          <Chip
            variant="outlined"
            size="small"
            avatar={
              <img
                src={NotificationIcon}
                width="100%"
                style={{ backgroundColor: "#fff", marginLeft: "6px" }}
              />
            }
            label="Alerts"
            clickable
            color="primary"
          />
          {match.path !== "/assetDetails/:assetId" ? (
            <Link to={`assetDetails/${match.params.assetId === undefined ? asset.assetId : match.params.assetId}`}>
              <Chip
                variant="outlined"
                size="small"
                avatar={
                  <img
                    src={ViewIcon}
                    width="100%"
                    style={{ backgroundColor: "#fff", marginLeft: "6px" }}
                  />
                }
                label="View"
                clickable
                color="primary"
              />
            </Link>
          ) : null}
        </ExpansionPanelActions>
      </ExpansionPanel>
    </Grid>
  );
};

export default withRouter(Asset);
