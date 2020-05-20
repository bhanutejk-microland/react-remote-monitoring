import React, { Component } from 'react';
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import Drawer from "@material-ui/core/Drawer";
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';
import Grid from "@material-ui/core/Grid";
import { connect } from 'react-redux';

import classes from './Rules.css';
import RulesFormComponent from './RulesForm/RulesForm';
import RulesListComponent from './RulesList/RulesList';
import { RulesListModel } from '../../interfaceModels/RulesListModel';
import * as actions from '../../store/actions/index';

interface RulesProps { 
  onInitRules: () => void;
  rulesListInfo: Array<RulesListModel>;
  onAddToRulesList: (rule: any) => void;
}

interface RulesState {
  showRulesDrawer: boolean;
  snackbarInfo: {
    open: boolean;
    alertType: "error" | "success" | "info" | "warning" | undefined;
    message: string;
  };
}

function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const rulesListInfoHeaders = [
  { id: "Name", numeric: false, disablePadding: false, label: "RULE NAME" },
  { id: "Description", numeric: false, disablePadding: false, label: "RULE DESCRIPTION" },
  { id: "deviceGroup", numeric: false, disablePadding: false, label: "ASSET GROUP" },
  { id: "Severity", numeric: false, disablePadding: false, label: "SEVERITY LEVEL" }
];

class Rules extends Component<RulesProps, RulesState> {

  constructor(props: RulesProps) {
    super(props);
    this.state = {
      showRulesDrawer: false,
      snackbarInfo: {
        open: false,
        alertType: 'success',
        message: ''
      }
    }
  }

  componentDidMount() {
    this.props.onInitRules();
  }

  toggleRulesDrawer = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    this.setState({
      showRulesDrawer: !this.state.showRulesDrawer
    });
  };

  closeDrawer = (status) => {
    this.setState({
      showRulesDrawer: false
    });
    if (status[0] === 200) {
      this.handleSnackbar('success', status[1]);
    }
  }

  handleSnackbar = (type, message) => {
    this.setState(prevState => ({
      ...prevState,
      snackbarInfo: {
        ...prevState.snackbarInfo,
        open: true,
        alertType: type,
        message: message
      }
    }));
  }

  renderRulesForm = () => {
    return (
      <Drawer
        anchor="right"
        open={this.state.showRulesDrawer}
        onClose={this.toggleRulesDrawer}
      >
        <div className={classes.DrawerContainer}>
          <RulesFormComponent 
            closeDrawer={(status) => this.closeDrawer(status)}
            addToRulesList={(rulesData) => this.props.onAddToRulesList(rulesData)}
            cancleForm={this.toggleRulesDrawer} />
        </div>
      </Drawer>
    );
  };

  renderFabIcon = () => {
    return (
      <Fab
        color="secondary"
        className={classes.fab}
        onClick={this.toggleRulesDrawer}
      >
        <AddIcon />
      </Fab>
    );
  };

  handleSnackbarClose = () => {
    this.setState(prevState => ({
      ...prevState,
      snackbarInfo: {
        ...prevState.snackbarInfo,
        open: false,
        alertType: undefined,
        message: ''
      }
    }));
  }

  renderSnackBar = () => {
    return (
      <Snackbar open={this.state.snackbarInfo.open} autoHideDuration={3000} onClose={this.handleSnackbarClose}>
        <Alert severity={this.state.snackbarInfo.alertType} onClose={this.handleSnackbarClose}>
          {this.state.snackbarInfo.message}
        </Alert>
      </Snackbar>
    );
  }

  renderRulesList = () => {
    return (
      <Grid container spacing={2} className={classes.SectionContainer}>
        <Grid item xs={12}>
          <RulesListComponent
            rulesListInfoHeaders={rulesListInfoHeaders}
            rulesListInfo={this.props.rulesListInfo}
          />
        </Grid>
      </Grid>
    )
  }

  render() {
    return (
      <div style={{ margin: "0 15px" }}>
        <this.renderRulesList />
        <this.renderRulesForm />
        <this.renderFabIcon />
        <this.renderSnackBar />
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    rulesListInfo: state.rulesInfo.rules
  };
}

const mapDispatchToProps = dispatch => {
  return {
    onInitRules: () => dispatch(actions.initRules()),
    onAddToRulesList: (rule) => dispatch(actions.addToRulesList(rule))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Rules);
