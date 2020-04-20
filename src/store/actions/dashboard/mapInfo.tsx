import * as actionTypes from '../actionTypes';
import axios from '../../../axios';

export const setDashboardMapInfo = (mapInfo) => {
  return {
    type: actionTypes.SET_DASHBOARD_MAP_INFO,
    mapInfo: mapInfo
  }
}

export const initDashboardMapInfo = () => {
  return dispatch => {
    axios.get("api/devices/listDevices?configType=devices").then(response => {
      dispatch(setDashboardMapInfo(response.data));
    });
  }
}
