import * as actionTypes from '../actionTypes';
import axios from '../../../axios';

export const setBasicAssetIndividualTeleProps = () => {
  return {
    type: actionTypes.SET_BASEIC_ASSET_INDIVIDUAL_TELE_PROPS
  }
}

export const setAssetIndividualTeleProps = (assetTeleProps) => {
  return {
    type: actionTypes.SET_INDIVIDUAL_ASSET_TELE_PROPS,
    assetTeleProps: assetTeleProps
  }
}

export const initAssetIndividualTeleProps = (assetId) => {
  return async dispatch => {
    dispatch(setBasicAssetIndividualTeleProps());
    await axios.get("api/getDeviceTelemetries?deviceId=" + assetId).then(response => {
      dispatch(setAssetIndividualTeleProps(response.data));
    });
  }
}
