import React, { Component, MouseEvent } from "react";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelActions from "@material-ui/core/ExpansionPanelActions";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Drawer from "@material-ui/core/Drawer";
import Divider from "@material-ui/core/Divider";

import classes from "./TicketContainerComponent.css";
import DoughnutChart from "../Charts/DoughnutChart";
import TicketForm from "../Ticket/TicketForm";

interface DataPoint {
  name: string;
  y: number;
  color: string;
}

interface TicketContainerComponentProps {
  dataPoints: Array<DataPoint>;
}

interface TicketContainerComponentState {
  showAlertDrawer: boolean;
}

class TicketContainerComponent extends Component<
  TicketContainerComponentProps,
  TicketContainerComponentState
> {
  constructor(props: TicketContainerComponentProps) {
    super(props);
    this.toggleAlertDrawer = this.toggleAlertDrawer.bind(this);
    this.state = {
      showAlertDrawer: false
    };
  }

  shouldComponentUpdate(nextProps, nextState) {
    return (
      this.props.dataPoints !== nextProps.dataPoints ||
      this.state.showAlertDrawer !== nextState.nextState
    );
  }

  toggleAlertDrawer = (event: MouseEvent) => {
    this.setState({
      showAlertDrawer: !this.state.showAlertDrawer
    });
  };

  render() {
    return (
      <ExpansionPanel defaultExpanded>
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          className={classes.TicketsPanelHeader}
        >
          <div className={classes.PanelHeaderContent}>
            <Typography className={classes.heading}>TICKETS</Typography>
          </div>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <div style={{ minHeight: "420px", width: "100%" }}>
            <DoughnutChart datapoints={this.props.dataPoints} />
          </div>
          <Drawer
            anchor="right"
            open={this.state.showAlertDrawer}
            onClose={this.toggleAlertDrawer}
          >
            <div className={classes.DrawerContainer}>
              <TicketForm />
            </div>
          </Drawer>
        </ExpansionPanelDetails>
        <Divider />
        <ExpansionPanelActions>
          <Button
            className={classes.BtnTicketCreate}
            size="small"
            variant="contained"
            onClick={this.toggleAlertDrawer}
          >
            Create
          </Button>
        </ExpansionPanelActions>
      </ExpansionPanel>
    );
  }
}

export default TicketContainerComponent;
