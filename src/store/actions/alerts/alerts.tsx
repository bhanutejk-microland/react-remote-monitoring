import * as actionTypes from '../actionTypes';
import axios from '../../../axios';

export const setAlertsListInfo = (alerts) => {
  return {
    type: actionTypes.SET_ALERTS,
    alerts: alerts
  }
}

export const initAlerts = () => {
  return dispatch => {
    axios.get("api/alerts/listAll").then(response => {
      dispatch(setAlertsListInfo(response.data));
    }).catch((error) => {
      console.log("MMMMMMMMMMMMMMMM", error)
    });
  }
}
