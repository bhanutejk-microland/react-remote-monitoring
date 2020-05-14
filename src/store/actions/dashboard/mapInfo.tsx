import * as actionTypes from '../actionTypes';
import axios from '../../../axios';

export const setDashboardMapInfo = (mapInfo) => {
  return {
    type: actionTypes.SET_DASHBOARD_MAP_INFO,
    mapInfo: mapInfo
  }
}

export const initDashboardMapInfo = (appFilters) => {
  return dispatch => {
    axios.post("api/map/location", appFilters).then(response => {
      dispatch(setDashboardMapInfo(response.data));
    });
  }
}
