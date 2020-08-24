import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    formControl: {
      marginLeft: theme.spacing(1),
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  }),
);

export default function SimpleSelect(props) {
  const { onSelectFaultName } = props;  
  const classes = useStyles();
  const [fault, setFault] = React.useState('');

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setFault(event.target.value as string);
    onSelectFaultName(event.target.value);
  };

  return (
    <div>
      <FormControl className={classes.formControl}>
        <InputLabel id="demo-simple-select-label">Fault Name</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={fault}
          onChange={handleChange}
          label="faultName"
        >
          <MenuItem value="Healthy">Healthy</MenuItem>
          <MenuItem value="Broken Blade">Broken Blade</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
}