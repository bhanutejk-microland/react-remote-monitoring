import * as actionTypes from '../actionTypes';
import axios from '../../../axios';

export const setAssetIndividualTeleProps = (assetTeleProps) => {
  return {
    type: actionTypes.SET_INDIVIDUAL_ASSET_TELE_PROPS,
    assetTeleProps: assetTeleProps
  }
}

export const initAssetIndividualTeleProps = (assetId) => {
  return async dispatch => {
    await axios.get("api/getDeviceTelemetries?deviceId=" + assetId).then(response => {
      dispatch(setAssetIndividualTeleProps(response.data));
    });
  }
}
