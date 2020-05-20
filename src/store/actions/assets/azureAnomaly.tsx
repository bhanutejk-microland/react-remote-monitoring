import * as actionTypes from '../actionTypes';
import axios from '../../../axios';

export const setAssetAzureAnomalies = (anomalies) => {
  return {
    type: actionTypes.SET_ASSET_AZURE_ANOMALY,
    anomalies: anomalies
  }
}

export const initAssetAzureAnomalies = (assetId) => {
  return dispatch => {
    axios.get("api/getAzureAnomaly?deviceId=" + assetId).then(response => {
      dispatch(setAssetAzureAnomalies(response.data));
    });
  }
}
