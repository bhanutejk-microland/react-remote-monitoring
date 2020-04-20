import "date-fns";
import React, { FunctionComponent } from "react";
import TextField from "@material-ui/core/TextField";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker
} from "@material-ui/pickers";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";

import classes from "./Input.css";

interface InputProps {
  invalid: boolean;
  shouldValidate: any;
  touched: boolean;
  elementType: string;
  elementConfig: any;
  value: string;
  changed(event: any): void;
}

const Input: FunctionComponent<InputProps> = ({
  invalid,
  shouldValidate,
  touched,
  elementConfig,
  elementType,
  value,
  changed
}) => {
  let inputElement: any = null;

  const [selectedDate, setSelectedDate] = React.useState<Date | null>(
    new Date()
  );

  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date);
  };

  const checkForError = () => {
    return invalid && shouldValidate && touched;
  };

  switch (elementType) {
    case "input":
      inputElement = (
        <TextField
          className={classes.InputElement}
          error={checkForError() ? true : false}
          id={
            checkForError()
              ? "standard-error-helper-text"
              : "standard-full-width"
          }
          {...elementConfig}
          value={value}
          onChange={changed}
          helperText={checkForError() ? "Incorrect entry." : null}
        />
      );
      break;
    case "dropdown":
      inputElement = (
        <FormControl className={classes.InputElement}>
          <InputLabel id="demo-simple-select-label">
            {elementConfig.label}
          </InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            onChange={changed}
            value={value}
          >
            {elementConfig.options.map(option => {
              return (
                <MenuItem value={option} key={option}>
                  {option}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
      );
      break;
    default:
      inputElement = (
        <TextField
          type="date"
          className={classes.InputElement}
          error={checkForError() ? true : false}
          id="date"
          {...elementConfig}
          value={value}
          onChange={changed}
          helperText={checkForError() ? "Incorrect entry." : null}
          InputLabelProps={{
            shrink: true
          }}
        />
      );
  }

  return inputElement;
};

export default Input;
