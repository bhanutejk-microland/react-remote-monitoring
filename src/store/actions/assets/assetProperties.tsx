import * as actionTypes from '../../actions/actionTypes';
import axios from '../../../axios';

export const setAssetProperties = (telemetryProps) => {
  return {
    type: actionTypes.SET_ASSET_PROPERTIES,
    properties: telemetryProps
  }
}

export const emptyAssetProperties = () => {
  return {
    type: actionTypes.EMPTY_ASSET_PROPERTIES
  }
}

export const initAssetProperties = (assetId) => {
  return dispatch => {
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    let fromTimeStamp = Date.parse(yesterday.toString());
    let toTimeStamp = Date.parse(today.toString());
    dispatch(emptyAssetProperties());
    axios.get("api/telemetry/properties?deviceId=" + assetId +"&fromTimeStamp="+fromTimeStamp+"&toTimeStamp="+toTimeStamp).
    then(response => {
      dispatch(setAssetProperties(response.data));
    });
  }
}
