import * as actionTypes from '../actionTypes';
import axios from '../../../axios';

export const setAssetsInfo = (assets) => {
  return {
    type: actionTypes.SET_ASSETS,
    assets: assets
  }
}

export const initAssets = () => {
  return dispatch => {
    axios.get("api/devices/listDevices?configType=devices").then(response => {
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
