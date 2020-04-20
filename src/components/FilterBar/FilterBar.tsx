import React, { FunctionComponent } from "react";
import Grid from "@material-ui/core/Grid";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import FormControl from "@material-ui/core/FormControl";
import TextField from "@material-ui/core/TextField";

import classes from "./FilterBar.css";

interface FilterBarProps {
  showFilterBar: boolean;
  showMaxContent: boolean;
  filterList: object;
}

const FilterBar: FunctionComponent<FilterBarProps> = ({
  showFilterBar,
  showMaxContent,
  filterList
}) => (
  <aside
    className={
      showFilterBar
        ? showMaxContent
          ? [classes.MainFilterbar, classes.MaxContentWrapper].join(" ")
          : [classes.MainFilterbar, classes.ContentWrapper].join(" ")
        : showMaxContent
        ? [classes.HideFilterbar, classes.MaxContentWrapper].join(" ")
        : [classes.HideFilterbar, classes.ContentWrapper].join(" ")
    }
  >
    <Grid
      container
      spacing={1}
      style={{
        minHeight: "100%",
        alignItems: "center",
        background: "#dddddd42"
      }}
      className={showMaxContent ? classes.MaxFilterGrid : classes.MinFilterGrid}
    >
      {Object.keys(filterList).map(objKey => {
        const type = filterList[objKey].type;
        const label = filterList[objKey].label;
        if (type === "select") {
          return (
            <Grid
              item
              xs={12}
              md={2}
              key={objKey}
              className={classes.FilterGridContent}
            >
              <div style={{ minHeight: "100%" }}>
                <FormControl className={classes.formControl}>
                  <InputLabel id="demo-simple-select-label">{label}</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                  >
                    {filterList[objKey].options.map(option => {
                      return (
                        <MenuItem value={option} key={option}>
                          {option}
                        </MenuItem>
                      );
                    })}
                  </Select>
                </FormControl>
              </div>
            </Grid>
          );
        } else if (type === "input") {
          return (
            <Grid
              item
              xs={12}
              md={2}
              key={objKey}
              className={classes.FilterGridContent}
            >
              <TextField
                className={classes.formControl}
                id="standard-basic"
                label={label}
              />
            </Grid>
          );
        }
      })}
    </Grid>
  </aside>
);

export default FilterBar;
