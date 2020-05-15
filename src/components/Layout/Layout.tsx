import React, { Component, MouseEvent, Fragment } from "react";
import {
  faTachometerAlt,
  faChartLine,
  faChartBar,
  faCubes,
  faList,
  faBell,
  faCogs
} from "@fortawesome/free-solid-svg-icons";
import { connect } from 'react-redux';

// import Aux from "../../hoc/Aux";
import Header from "../Header/Header";
import LeftMenu from "../LeftMenu/LeftMenu";
import FilterBar from "../FilterBar/FilterBar";
import MainContent from "../MainContent/MainContent";
import * as actions from '../../store/actions/index';

interface LayoutProps {
  initFilterInfo: () => void;
  appFilters: any;
  applyFilterChanges: (filtersInfo: any) => any;
  alertsInfo: any;
}

interface LayoutState {
  showMiniLeftMenu: boolean;
  showFilterBar: boolean;
  selectedFilters: {
    orgCodes: string,
    locCodes: string,
    assetIds: string,
    assetTypes: string,
    statuses: string
  };
};

const menuList = [
  { label: "Dashboard", menuIcon: faTachometerAlt, path: "/" },
  { label: "Assets", menuIcon: faCubes, path: "/assets" },
  { label: "Analytics", menuIcon: faChartLine, path: "/analytics" },
  { label: "Alerts", menuIcon: faBell, path: "/alerts" },
  { label: "Rules", menuIcon: faList, path: "/rules" },
  { label: "Trends", menuIcon: faChartBar, path: "/trends" },
  { label: "Configuration", menuIcon: faCogs, path: "/configuration" }
];

class Layout extends Component<LayoutProps, LayoutState> {
  constructor(props: LayoutProps) {
    super(props);
    this.toggleMiniLeftMenu = this.toggleMiniLeftMenu.bind(this);
    this.toggleFilterBar = this.toggleFilterBar.bind(this);
    this.state = {
      showMiniLeftMenu: false,
      showFilterBar: false,
      selectedFilters: {
        orgCodes: '',
        locCodes: '',
        assetIds: '',
        assetTypes: '',
        statuses: ''
      },
    };
  }

  componentDidMount() {
    this.props.initFilterInfo();
  }

  toggleMiniLeftMenu(event: MouseEvent) {
    this.setState({
      showMiniLeftMenu: !this.state.showMiniLeftMenu
    });
  }

  toggleFilterBar(event: MouseEvent) {
    this.setState({
      showFilterBar: !this.state.showFilterBar
    });
  }

  selectFilterHandler = (event, filterId) => {
    this.setState(prevState => ({
      ...prevState,
      selectedFilters: {
        ...prevState.selectedFilters,
        [filterId]: event.target.value
      }
    }), () => {
      this.props.applyFilterChanges(this.state.selectedFilters)
    });
  }

  render() {
    return (
      <Fragment>
        <Header
          clickForMiniMenu={this.toggleMiniLeftMenu}
          clickForFilterBar={this.toggleFilterBar}
          alertsCount={this.props.alertsInfo.length}
        />
        <LeftMenu
          showMiniLeftMenu={this.state.showMiniLeftMenu}
          menuList={menuList}
        />
        <FilterBar
          showFilterBar={this.state.showFilterBar}
          showMaxContent={this.state.showMiniLeftMenu}
          filterList={this.props.appFilters}
          changed={(event, filterId) => this.selectFilterHandler(event, filterId)}
          selectedValues={this.state.selectedFilters}
        />
        <MainContent showMaxContent={this.state.showMiniLeftMenu}>
          {this.props.children}
        </MainContent>
      </Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    appFilters: state.appFilter.filterInfo,
    alertsInfo: state.dashboardAlerts.alertsInfo
  }
}

const mapDispatchToProps = dispatch => {
  return {
    initFilterInfo: () => dispatch(actions.initFilterInfo()),
    applyFilterChanges: (filtersInfo) => dispatch(actions.applyFilterChanges(filtersInfo))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Layout);
