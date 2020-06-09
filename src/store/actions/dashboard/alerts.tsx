import * as actionTypes from '../actionTypes';
import axios from '../../../axios';

export const setDashboardAlertsInfo = (alerts) => {
  return {
    type: actionTypes.SET_DASHBOARD_ALERTS,
    alerts: alerts
  }
}

export const initDashboardAlerts = (appFilters,fromTimeStamp,toTimeStamp) => {
  return dispatch => {
    axios.post("api/alarms/listAll?fromTimeStamp="+fromTimeStamp+"&toTimeStamp="+toTimeStamp, appFilters).then(response => {
      dispatch(setDashboardAlertsInfo(response.data));
    });
  }
}
