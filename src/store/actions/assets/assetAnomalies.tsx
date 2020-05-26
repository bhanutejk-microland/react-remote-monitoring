import * as actionTypes from '../actionTypes';
import axios from '../../../axios';

export const setAssetAnamolies = (anomalies) => {
  return {
    type: actionTypes.SET_ASSET_ANOMALIES,
    anomalies: anomalies
  }
}

export const initAssetAnomalies = (payload) => {
  return dispatch => {
    axios.post("api/anomaly", payload).then(response => {
      dispatch(setAssetAnamolies(response.data));
    });
  }
}
