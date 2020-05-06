import React, { FunctionComponent } from "react";

import HalfDoughnutChart from '../../../../Charts/HalfDoughnutChart';
import classes from "./StatusCardComponent.css";

interface StatusCardComponentProps {
  name: string;
  min: number;
  max: number;
  value: number;
}

const StatusCardComponent: FunctionComponent<StatusCardComponentProps> = ({
  name,
  min,
  max,
  value
}) => (
    <div>
      <div className={classes.CardHeader}>
        <span className={classes.CardHeaderTitle}>{name}</span>
      </div>
      {/* <SemiDoughnutChart
      dataPoints={[
        {
          name: name,
          y: value,
          color:
            "#" +
            (((Math.random() * 0xffffff) << 0).toString(16) === "ffffff"
              ? ((Math.random() * 0xfffff1) << 0).toString(16)
              : ((Math.random() * 0xffffff) << 0).toString(16))
        },
        { name: "Remained", y: max - value, color: "#badbe2" }
      ]}
    /> */}
      <HalfDoughnutChart
        indexing={name}
        dataPoints={[
          {
            name: name,
            value: value
          },
          { name: "Remained", value: max - value }
        ]}
      />
    </div>
  );

export default StatusCardComponent;
