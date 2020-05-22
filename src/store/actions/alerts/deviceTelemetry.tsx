import * as actionTypes from '../actionTypes';
import axios from '../../../axios';

export const setDeviceTelemetry = (telemetryData,telemetryfield) => {
  return {
    type: actionTypes.SET_ALERT_TELEMETRY,
    telemetryProperty: {telemetryData,telemetryfield}
  }
}

export const initDeviceTelemetry = (deviceId,field,fromTimeStamp, toTimeStamp) => {
  return dispatch => {
    axios.get("api/alerts/getTelemetry?deviceId=" + deviceId+"&field="+field+"&fromTimeStamp="+fromTimeStamp+"&toTimeStamp="+toTimeStamp).then(response => {
      dispatch(setDeviceTelemetry(response.data,field))
    })
  }
}
