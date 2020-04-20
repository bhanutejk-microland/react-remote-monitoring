import React, { Component, MouseEvent, Fragment } from "react";
import {
  faTachometerAlt,
  faChartLine,
  faChartBar,
  faCubes,
  faList,
  faBell,
} from "@fortawesome/free-solid-svg-icons";

// import Aux from "../../hoc/Aux";
import Header from "../Header/Header";
import LeftMenu from "../LeftMenu/LeftMenu";
import FilterBar from "../FilterBar/FilterBar";
import MainContent from "../MainContent/MainContent";
import axios from '../../axios';

interface LayoutProps { }

type LayoutState = {
  showMiniLeftMenu: boolean;
  showFilterBar: boolean;
  filterList: {
    location: {
      type: string,
      label: string,
      options: any[]
    },
    status: {
      type: string,
      label: string,
      options: any[]
    },
    assetType: {
      type: string,
      label: string,
      options: any[]
    },
    assetName: {
      type: string,
      label: string,
      options: any[]
    },
    assetId: {
      type: string,
      label: string
    },
  }
};

const menuList = [
  { label: "Dashboard", menuIcon: faTachometerAlt, path: "/" },
  { label: "Assets", menuIcon: faCubes, path: "/assets" },
  { label: "Analytics", menuIcon: faChartLine, path: "/analytics" },
  { label: "Alerts", menuIcon: faBell, path: "/alerts" },
  { label: "Rules", menuIcon: faList, path: "/rules" },
  { label: "Trends", menuIcon: faChartBar, path: "/trends" }
];

class Layout extends Component<LayoutProps, LayoutState> {
  constructor(props: LayoutProps) {
    super(props);
    this.toggleMiniLeftMenu = this.toggleMiniLeftMenu.bind(this);
    this.toggleFilterBar = this.toggleFilterBar.bind(this);
    this.state = {
      showMiniLeftMenu: false,
      showFilterBar: false,
      filterList: {
        location: {
          type: "select",
          label: "Location",
          options: []
        },
        status: {
          type: "select",
          label: "Status",
          options: []
        },
        assetType: {
          type: "select",
          label: "Asset Type",
          options: []
        },
        assetName: {
          type: "select",
          label: "Asset Name",
          options: []
        },
        assetId: {
          type: "input",
          label: "Asset ID"
        }
      }
    };
  }

  componentDidMount() {
    axios.get("api/lookups/locations").then(response => {
      this.setFilterLocation(response.data.results);
    });
    
    axios.get("api/lookups/status").then(response => {
      this.setFilterStatuses(response.data.results);
    });
    
    axios.get("api/lookups/assetType").then(response => {
      this.setFilterAssetTypes(response.data.results);
    });
    
    axios.get("api/lookups/assetName").then(response => {
      this.setFilterAssetNames(response.data.results);
    });
  }

  private setFilterLocation = locations => {
    const filterLocations = locations.map(loc => {
      return loc.LocName
    });
    this.setState(prevState => ({
      ...prevState,
      filterList: {
        ...prevState.filterList,
        location: {
          ...prevState.filterList.location,
          options: [...filterLocations]
        }
      }
    }))
  }
  
  private setFilterStatuses = statuses => {
    const filterStatuses = statuses.map(status => {
      return status.Status
    });
    this.setState(prevState => ({
      ...prevState,
      filterList: {
        ...prevState.filterList,
        status: {
          ...prevState.filterList.status,
          options: [...filterStatuses]
        }
      }
    }))
  }
  
  private setFilterAssetTypes = assetTypes => {
    const filterAssetTypes = assetTypes.map(assetType => {
      return assetType.assetType
    });
    this.setState(prevState => ({
      ...prevState,
      filterList: {
        ...prevState.filterList,
        assetType: {
          ...prevState.filterList.assetType,
          options: [...filterAssetTypes]
        }
      }
    }))
  }
  
  private setFilterAssetNames = assetNames => {
    const filterAssetNames = assetNames.map(assetName => {
      return assetName.assetName
    });
    this.setState(prevState => ({
      ...prevState,
      filterList: {
        ...prevState.filterList,
        assetName: {
          ...prevState.filterList.assetName,
          options: [...filterAssetNames]
        }
      }
    }))
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

  render() {
    return (
      <Fragment>
        <Header
          clickForMiniMenu={this.toggleMiniLeftMenu}
          clickForFilterBar={this.toggleFilterBar}
        />
        <LeftMenu
          showMiniLeftMenu={this.state.showMiniLeftMenu}
          menuList={menuList}
        />
        <FilterBar
          showFilterBar={this.state.showFilterBar}
          showMaxContent={this.state.showMiniLeftMenu}
          filterList={this.state.filterList}
        />
        <MainContent showMaxContent={this.state.showMiniLeftMenu}>
          {this.props.children}
        </MainContent>
      </Fragment>
    );
  }
}

export default Layout;
