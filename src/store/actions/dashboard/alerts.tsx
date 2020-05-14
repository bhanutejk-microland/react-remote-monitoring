import * as actionTypes from '../actionTypes';
import axios from '../../../axios';

export const setDashboardAlertsInfo = (alerts) => {
  return {
    type: actionTypes.SET_DASHBOARD_ALERTS,
    alerts: alerts
  }
}

export const initDashboardAlerts = (appFilters) => {
  return dispatch => {
    axios.post("api/alarms/listAll", appFilters).then(response => {
      dispatch(setDashboardAlertsInfo(response.data));
    });
  }
}
