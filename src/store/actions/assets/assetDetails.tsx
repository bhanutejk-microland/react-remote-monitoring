import * as actionTypes from '../actionTypes';
import axios from '../../../axios';

export const setAssetDetails = (asset) => {
  return {
    type: actionTypes.SET_ASSET_DETAILS,
    asset: asset
  }
}

export const initAssetDetails = (assetId) => {
  return dispatch => {
    axios.get("api/devices?configType=devices&deviceId=" + assetId).then(response => {
      dispatch(setAssetDetails(response.data[0]));
    });
  }
}
