import React, { FunctionComponent } from 'react';
import Grid from "@material-ui/core/Grid";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Typography from "@material-ui/core/Typography";
import Skeleton from '@material-ui/lab/Skeleton';

import AnomalyBulletChart from '../../Charts/AnomalyBulletChart';

interface AssetAnamolyProps {
  anamoly: any,
  indexing: string
}

const AssetAnamoly: FunctionComponent<AssetAnamolyProps> = ({ anamoly, indexing }) => {

  const renderAssetAnamolyContent = () => {
    if (Object.keys(anamoly).length > 0) {
      return Object.keys(anamoly).map((anomalyKey, indexing) => {
        return (
          <Grid container spacing={2} key={indexing}>
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
    } else {
      return (
        <Grid container spacing={2} key={indexing}>
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
                    <b style={{ textTransform: 'uppercase' }}><Skeleton variant="text" width={100} /></b>
                  </Typography>
                </div>

              </ExpansionPanelSummary>
              <ExpansionPanelDetails className="">
                <Skeleton variant="rect" width="100%" height={118} />
              </ExpansionPanelDetails>
            </ExpansionPanel>
          </Grid>
        </Grid>
      );
    }
  }

  return (
    <div>
      {renderAssetAnamolyContent()}
    </div>
  );
};

export default AssetAnamoly
