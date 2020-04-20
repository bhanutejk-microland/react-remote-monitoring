import React, { Component } from "react";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Typography from "@material-ui/core/Typography";

// import classes from "../Dashboard.css";
import Table from "../../../components/UI/Table/Table";
import { AlertHeaderInfoModel } from "../../../interfaceModels/AlertHeaderInfoModel";
import { RulesListModel } from '../../../interfaceModels/RulesListModel';

interface RulesListProps {
  rulesListInfoHeaders: AlertHeaderInfoModel[];
  rulesListInfo: RulesListModel[];
}

interface RulesListState {
  rulesListInfo: RulesListModel[];
}

class RulesListComponent extends Component<
  RulesListProps,
  RulesListState
  > {
  constructor(props: RulesListProps) {
    super(props);
    this.state = {
      rulesListInfo: []
    };
  }

  handleRulesListDeletion = (event: React.MouseEvent, rulesList: any) => {
    const dupRulesListInfo = [...this.props.rulesListInfo];
    const updatedRulesListInfo = dupRulesListInfo.filter(
      rulesListData => !rulesList.includes(rulesListData.ruleName)
    );
    this.setState({
      rulesListInfo: [...updatedRulesListInfo]
    });
  };

  shouldComponentUpdate(nextProps, nextState) {
    return (
      this.props.rulesListInfoHeaders !== nextProps.rulesListInfoHeaders ||
      this.props.rulesListInfo !== nextProps.rulesListInfo ||
      this.state.rulesListInfo !== nextState.rulesListInfo
    );
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.rulesListInfo !== this.state.rulesListInfo) {
      const newRulesList = [...this.state.rulesListInfo];
      this.setState({
        rulesListInfo: [...newRulesList]
      });
    }
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.rulesListInfo !== prevState.rulesListInfo) {
      return { rulesListInfo: nextProps.rulesListInfo };
    }
    return null;
  }
  
  tableActions = [
    {
      name: 'VIEW',
      action: () => {}
    }
  ]

  render() {
    return (
      <ExpansionPanel defaultExpanded>
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1c-content"
          id="panel1c-header"
          className={'classes.AlertPanelHeader'}
        >
          <div className={'classes.PanelHeaderContent'}>
            <Typography className={'classes.heading'}>RULES</Typography>
          </div>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Table
            headerCells={this.props.rulesListInfoHeaders}
            dataCells={this.state.rulesListInfo}
            uniqueCol="dateTime"
            handleAlertDeletion={(event, assetIds) =>
              this.handleRulesListDeletion(event, assetIds)
            }
            defaultRowText='Loading rules list ...!'
          />
        </ExpansionPanelDetails>
      </ExpansionPanel>
    );
  }
}

export default RulesListComponent;
