import React, { FunctionComponent } from 'react';
import Grid from "@material-ui/core/Grid";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Skeleton from "@material-ui/lab/Skeleton";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Typography from "@material-ui/core/Typography";
import ExpansionPanelActions from "@material-ui/core/ExpansionPanelActions";
import Divider from "@material-ui/core/Divider";

import ComparisonLineChart from '../../Charts/ComparisonLineChart';
import AnomalyBulletChart from '../../Charts/AnomalyBulletChart';

interface AssetAnamolyProps {
  anamoly: any,
  indexing: string
}

const AssetAnamoly: FunctionComponent<AssetAnamolyProps> = ({ anamoly, indexing }) => {

  console.log("ASSETANOMALIES>>>>>>>>>>>>>>>>>", anamoly);

  const renderAssetPropertySkeleten = () => {
    return (
      <Grid container spacing={2}>
        <Grid item xs={6} md={4}>
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

  const renderAssetAnamolyContent = () => {
    console.log("QQQQQQQQQQQQQQQQQQQQQQQQQQQ~~~~~~~~~~", anamoly);
    return Object.keys(anamoly).map((anomalyKey, indexing) => {
      return (
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <ExpansionPanel defaultExpanded>
              <ExpansionPanelSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1c-content"
                id="panel1c-header"
              // className={classes.AssetPanelHeader}
              >
                <div className="">
                  <Typography className="">
                    <b style={{ textTransform: 'uppercase' }}>{anomalyKey}</b>
                  </Typography>
                </div>

              </ExpansionPanelSummary>
              <ExpansionPanelDetails className="">
                <AnomalyBulletChart
                  indexing={indexing}
                  data={[...anamoly[anomalyKey]]}
                  chartHeight="300px"
                />
              </ExpansionPanelDetails>
            </ExpansionPanel>
          </Grid>
        </Grid>
      );
    });
    // if (anamoly && anamoly.length > 0) {
    // console.log("QQQQQQQQQQQQQQQQQQQQQQQQQQQ~~~~~~~~~~");
    // return (
    //   <Grid container spacing={2}>
    //     {/* <Grid item xs={6} md={4} className={classes.AssetPropertyList}>
    //       {Object.keys(property).map((propertyKey, index) => {
    //         return propertyKey !== "telemetry" ? (
    //           <ListItem key={"AssetProperty" + propertyKey + index}>
    //             <ListItemText
    //               className={classes.ListContent}
    //               primary={propertyKey}
    //             />
    //             <ListItemText
    //               className={classes.ListContent}
    //               primary={property[propertyKey].toString()}
    //             />
    //           </ListItem>
    //         ) : null;
    //       })}
    //     </Grid> */}
    //     <Grid item xs={12}>
    //       <ExpansionPanel defaultExpanded>
    //         <ExpansionPanelSummary
    //           expandIcon={<ExpandMoreIcon />}
    //           aria-controls="panel1c-content"
    //           id="panel1c-header"
    //         // className={classes.AssetPanelHeader}
    //         >
    //           <div className="">
    //             <Typography className="">
    //               <b style={{ textTransform: 'uppercase' }}>qqqqqq</b>
    //             </Typography>
    //           </div>

    //         </ExpansionPanelSummary>
    //         <ExpansionPanelDetails className="">
    //           <AnomalyBulletChart
    //             indexing={indexing}
    //             data={[...anamoly]}
    //             chartHeight="300px"
    //           />
    //         </ExpansionPanelDetails>
    //       </ExpansionPanel>
    //     </Grid>
    //   </Grid>
    // );
    // } else {
    //   return renderAssetPropertySkeleten();
    // }
  }

  return (
    <div>
      {renderAssetAnamolyContent()}
    </div>
  );
};

export default AssetAnamoly
