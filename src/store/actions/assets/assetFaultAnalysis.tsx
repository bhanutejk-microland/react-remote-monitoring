import * as actionTypes from '../actionTypes';
import axios from '../../../axios';

export const setAssetFaultAnalysis = (faultAnalysis) => {
  return {
    type: actionTypes.SET_ASSET_FAULT_ANALYSIS,
    faultAnalysis: faultAnalysis
  }
}

export const initAssetFaultAnalysis = (assetId) => {
  return dispatch => {
    // axios.get("api/anomaly?deviceId=" + assetId).then(response => {
      dispatch(setAssetFaultAnalysis(assetId));
    // });
  }
}