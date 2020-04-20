import * as actionTypes from '../actionTypes';
import axios from '../../../axios';

export const setAssetAnamolies = (anomalies) => {
  return {
    type: actionTypes.SET_ASSET_ANOMALIES,
    anomalies: anomalies
  }
}

export const initAssetAnomalies = (assetId) => {
  return dispatch => {
    axios.get("api/anomaly?deviceId=" + assetId).then(response => {
      dispatch(setAssetAnamolies(response.data));
    });
  }
}
