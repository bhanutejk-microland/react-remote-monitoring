import * as actionTypes from '../actionTypes';
import axios from '../../../axios';

export const setAlertsListInfo = (alerts) => {
  return {
    type: actionTypes.SET_ALERTS,
    alerts: alerts
  }
}

export const initAlerts = (deviceObj) => {
  return dispatch => {
    axios.post("api/alerts/listAll",deviceObj).then(response => {
      dispatch(setAlertsListInfo(response.data));
    }).catch((error) => {
      console.log("MMMMMMMMMMMMMMMM", error)
    });
  }
}

export const updateAlertListInfo = (alertData) => {
  return {
    type : actionTypes.UPDATE_ALERT_INFO_LIST,
    alertData : alertData
  }
}

export const updateAlertFormData = (alertFormData) => {
  
  return dispatch => {
    axios.post("api/alerts/updateAlarms",alertFormData).then(response => {
      dispatch(updateAlertListInfo(response.data));
    }).catch((error) => {
      console.log("Error",error)
    });
  }
}
