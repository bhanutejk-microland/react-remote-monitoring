import * as actionTypes from '../actionTypes';
import axios from '../../../axios';

export const setDashboardAlertsInfo = (alerts) => {
  return {
    type: actionTypes.SET_DASHBOARD_ALERTS,
    alerts: alerts
  }
}

export const initDashboardAlerts = () => {
  return dispatch => {
    axios.get("api/alarms/listAll?status=open").then(response => {
      dispatch(setDashboardAlertsInfo(response.data));
    });
  }
}
