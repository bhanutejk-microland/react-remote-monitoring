import * as actionTypes from '../actionTypes';
import axios from '../../../axios';

export const setAssetIndividualTeleDetails = (assetTeleValues) => {
  return {
    type: actionTypes.SET_INDIVIDUAL_ASSET_TELE_DETAILS,
    assetTeleValues: assetTeleValues
  }
}

export const initAssetIndividualTeleDetails = (assetTrendDetails) => {
  return async dispatch => {
    await axios.post("api/getIndividualDeviceTeleProps/details", assetTrendDetails).then(response => {
      dispatch(setAssetIndividualTeleDetails(response.data));
    });
  }
}
