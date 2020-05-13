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
  changed(event: any, objKey: string): void;
  selectedValues: any;
}

const FilterBar: FunctionComponent<FilterBarProps> = ({
  showFilterBar,
  showMaxContent,
  filterList,
  changed,
  selectedValues
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
                  <InputLabel id="demo-simple-select-label">{objKey}</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    onChange={(event) => changed(event, objKey)}
                    value={selectedValues[objKey]}
                  >
                    {filterList[objKey].map(option => {
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
        })}
      </Grid>
    </aside>
  );

export default FilterBar;
