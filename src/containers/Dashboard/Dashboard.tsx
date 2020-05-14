import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import CircularProgress from "@material-ui/core/CircularProgress";
import { connect } from 'react-redux';

import classes from "./Dashboard.css";
import TicketContainerComponent from "../../components/TicketContainerComponent/TicketContainerComponent";
import DashboardMapComponent from "../../components/DashboardMapComponent/DashboardMapComponent";
import DashboardAlertsComponent from "../../components/DashboardAlertsComponent/AlertsComponent";
import { AlertModel } from '../../interfaceModels/AlertModel';
import { kpiInfoModel } from "../../interfaceModels/kpiInfoModel";
import { TicketsInfoModel } from "../../interfaceModels/TicketsInfoModel";
import * as actions from '../../store/actions/index';

interface DashboardProps {
  onInitKpiTotalAssetsInfo: (appFilters: any) => void;
  onInitKpiTotalActiveInfo: (appFilters: any) => void;
  onInitKpiTotalTrippedInfo: (appFilters: any) => void;
  onInitKpiTotalInactiveInfo: (appFilters: any) => void;
  onInitKpiTotalCriticalAlertsInfo: (appFilters: any) => void;
  onInitKpiTotalFletupTimeInfo: (appFilters: any) => void;
  onInitDashboardAlerts: () => void;
  onInitDashboardMapInfo: () => void;
  kpiInfo: kpiInfoModel;
  alertsInfo: Array<AlertModel>;
  mapInfo: any[];
  appFilterInfo: any;
}

interface DashboardState {
  showAlertDrawer: boolean;
  ticketsInfo: TicketsInfoModel;
}

const alertInfoHeaders = [
  { id: "assetId", numeric: false, disablePadding: false, label: "ASSETID" },
  { id: "dateTime", numeric: false, disablePadding: false, label: "DATETIME" },
  { id: "status", numeric: false, disablePadding: false, label: "STATUS" },
  { id: "type", numeric: false, disablePadding: false, label: "TYPE" },
  { id: "summary", numeric: false, disablePadding: false, label: "DESCRIPTION" }
];

const ticketsDataPoints = [
  { name: "Open Tickets", y: 75, color: "#ff3200d9" },
  { name: "Closed Tickets", y: 15, color: "#08bda9" },
  { name: "Pending Tickets", y: 10, color: "#f39c12c2" }
];

class Dashboard extends Component<DashboardProps, DashboardState> {
  constructor(props: DashboardProps) {
    super(props);
    this.state = {
      showAlertDrawer: false,
      // mapInfo: [],
      ticketsInfo: {
        totalTickets: 100,
        openTickets: 75,
        closedTickets: 15,
        pendingTickets: 10,
        tickets: [
          {
            ticketId: "asd1",
            ticketDescription: "aaaaaaaaa",
            createdBy: "aaaaa",
            createdAt: new Date(),
            status: "open"
          },
          {
            ticketId: "asd2",
            ticketDescription: "bbbbbbbbb",
            createdBy: "bbbbb",
            createdAt: new Date(),
            status: "open"
          },
          {
            ticketId: "asd3",
            ticketDescription: "ccccccccc",
            createdBy: "ccccc",
            createdAt: new Date(),
            status: "open"
          },
          {
            ticketId: "asd4",
            ticketDescription: "ddddddddd",
            createdBy: "ddddd",
            createdAt: new Date(),
            status: "open"
          }
        ]
      }
    };
  }

  componentDidMount() {
    const appFilters = this.props.appFilterInfo;
    this.props.onInitKpiTotalAssetsInfo(appFilters);
    this.props.onInitKpiTotalActiveInfo(appFilters);
    this.props.onInitKpiTotalTrippedInfo(appFilters);
    this.props.onInitKpiTotalInactiveInfo(appFilters);
    this.props.onInitKpiTotalCriticalAlertsInfo(appFilters);
    this.props.onInitKpiTotalFletupTimeInfo(appFilters);
    this.props.onInitDashboardAlerts();
    this.props.onInitDashboardMapInfo();
  }

  componentDidUpdate(prevProps) {
    const appFilters = this.props.appFilterInfo;
    if (prevProps.appFilterInfo !== appFilters) {
      this.props.onInitKpiTotalAssetsInfo(appFilters);
      this.props.onInitKpiTotalActiveInfo(appFilters);
      this.props.onInitKpiTotalTrippedInfo(appFilters);
      this.props.onInitKpiTotalInactiveInfo(appFilters);
      this.props.onInitKpiTotalCriticalAlertsInfo(appFilters);
      this.props.onInitKpiTotalFletupTimeInfo(appFilters);
    }
  }

  handleAlertDeletion = (event: React.MouseEvent, alerts: any) => {
    const dupAlertsInfo = [...this.props.alertsInfo];
    const updatedAlertsInfo = dupAlertsInfo.filter(
      alertData => !alerts.includes(alertData.assetId)
    );
  };

  renderKpiInfo = () => {
    return (
      <Grid container spacing={2} className={classes.SectionContainer}>
        {Object.keys(this.props.kpiInfo).map(keyOfKpi => {
          const kpiValue = this.props.kpiInfo[keyOfKpi].value;
          return (
            <Grid item xs={12} sm={6} md={4} lg={2} xl={2} key={keyOfKpi}>
              <Grid container className={classes.kpiInfoCard}>
                <Grid
                  item
                  className={classes.KpiIconContent}
                  xs={4}
                  md={5}
                  style={{
                    backgroundColor: this.props.kpiInfo[keyOfKpi].iconBgColor
                  }}
                >
                  <FontAwesomeIcon icon={this.props.kpiInfo[keyOfKpi].fontAwesomeName} size="3x" />
                </Grid>
                <Grid item xs={8} md={7}>
                  <div>
                    <div className={classes.KpiCardValueStyle}>
                      {kpiValue !== null ? (
                        kpiValue
                      ) : (
                          <CircularProgress disableShrink />
                        )}
                    </div>
                    <div className={classes.KpiCardLabelContent}>
                      {this.props.kpiInfo[keyOfKpi].label}
                    </div>
                  </div>
                </Grid>
              </Grid>
            </Grid>
          );
        })}
      </Grid>
    );
  };

  renderMapContainer = () => {
    return (
      <Grid container spacing={2} className={classes.SectionContainer}>
        <Grid item xs={12}>
          <DashboardMapComponent mapInfo={this.props.mapInfo} />
        </Grid>
      </Grid>
    );
  };

  renderAlertTicketContainer = () => {
    return (
      <Grid container spacing={2} className={classes.SectionContainer}>
        <Grid item xs={12} md={8}>
          <DashboardAlertsComponent
            alertInfoHeaders={alertInfoHeaders}
            alertsInfo={this.props.alertsInfo}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <TicketContainerComponent dataPoints={ticketsDataPoints} />
        </Grid>
      </Grid>
    );
  };

  render() {
    return (
      <div style={{ margin: "0 15px" }}>
        <this.renderKpiInfo />
        <this.renderMapContainer />
        <this.renderAlertTicketContainer />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    kpiInfo: state.dashboard.kpiInfo,
    alertsInfo: state.dashboardAlerts.alertsInfo,
    mapInfo: state.dashboardMapInfo.mapInfo,
    appFilterInfo: state.appliedFilterInfo.appliedFiltersInfo
  };
}

const mapDispatchToProps = dispatch => {
  return {
    onInitKpiTotalAssetsInfo: (appFilters) => dispatch(actions.initKpiTotalAssetsInfo(appFilters)),
    onInitKpiTotalActiveInfo: (appFilters) => dispatch(actions.initKpiTotalActiveInfo(appFilters)),
    onInitKpiTotalTrippedInfo: (appFilters) => dispatch(actions.initKpiTotalTrippedInfo(appFilters)),
    onInitKpiTotalInactiveInfo: (appFilters) => dispatch(actions.initKpiTotalInactiveInfo(appFilters)),
    onInitKpiTotalCriticalAlertsInfo: (appFilters) => dispatch(actions.initKpiTotalCriticalAlertsInfo(appFilters)),
    onInitKpiTotalFletupTimeInfo: (appFilters) => dispatch(actions.initKpiTotalFletupTimeInfo(appFilters)),
    onInitDashboardAlerts: () => dispatch(actions.initDashboardAlerts()),
    onInitDashboardMapInfo: () => dispatch(actions.initDashboardMapInfo())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
