import React, { FunctionComponent } from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Switch from '@material-ui/core/Switch';


interface UISwitchProps {
    disabled?: boolean;
    changed: (event?: any) => void;
    checkedStatus: boolean;
  }

const UISwitch : FunctionComponent<UISwitchProps> = ({
    disabled,
    changed,
    checkedStatus
  }) => {
    return (
        <Typography component="div">
        <Grid component="label" container alignItems="center" spacing={1}>          
          <Grid item>
            <Switch  checked={checkedStatus} onChange={changed} disabled={disabled} />       
          </Grid>
        </Grid>
      </Typography>
      );
  }

  
export default UISwitch;

