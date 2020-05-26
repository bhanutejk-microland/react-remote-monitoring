import * as actionTypes from '../actionTypes';
import axios from '../../../axios';

export const setAssetAzureAnomalies = (anomalies) => {
  return {
    type: actionTypes.SET_ASSET_AZURE_ANOMALY,
    anomalies: anomalies
  }
}

export const initAssetAzureAnomalies = (payload) => {
  return dispatch => {
    axios.post("api/getAzureAnomaly", payload).then(response => {
      dispatch(setAssetAzureAnomalies(response.data));
    });
  }
}
