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

export const initAssetProperties = (assetId,fromTimeStamp,toTimeStamp) => {
  return dispatch => {
    dispatch(emptyAssetProperties());
    axios.get("api/telemetry/properties?deviceId=" + assetId +"&fromTimeStamp="+fromTimeStamp+"&toTimeStamp="+toTimeStamp).
    then(response => {
      dispatch(setAssetProperties(response.data));
    });
  }
}
