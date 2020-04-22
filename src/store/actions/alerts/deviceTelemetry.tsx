import * as actionTypes from '../actionTypes';
import axios from '../../../axios';

export const setDeviceTelemetry = (telemetryData) => {
  return {
    type: actionTypes.SET_ALERT_TELEMETRY,
    telemetryData: telemetryData
  }
}

export const initDeviceTelemetry = (deviceId) => {
  return dispatch => {
    axios.get("api/alerts/getTelemetry?deviceId=" + deviceId).then(response => {
      dispatch(setDeviceTelemetry(response.data))
    })
  }
}
