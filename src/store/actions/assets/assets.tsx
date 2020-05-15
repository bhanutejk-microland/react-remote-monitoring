import * as actionTypes from '../actionTypes';
import axios from '../../../axios';

export const setAssetsInfo = (assets) => {
  return {
    type: actionTypes.SET_ASSETS,
    assets: assets
  }
}

export const initAssets = (appFilterInfo) => {
  return dispatch => {
    axios.post("api/devices/listDevices", appFilterInfo).then(response => {
      dispatch(setAssetsInfo(response.data));
    });
  }
}

export const setAssetToList = (asset) => {
  return {
    type: actionTypes.ADD_ASSETS,
    asset: asset
  }
}

export const addAssetToList = (asset) => {
  return dispatch => {
    dispatch(setAssetToList(asset));
  }
}
