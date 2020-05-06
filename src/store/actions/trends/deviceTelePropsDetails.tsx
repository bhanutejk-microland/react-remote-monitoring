import * as actionTypes from '../actionTypes';
import axios from '../../../axios';

export const setDevicesWithTelePropsDetailsInfo = (teleDetails) => {
  return {
    type: actionTypes.SET_DEVICE_WITH_TELE_PROPS_DETAILS,
    devicesTeleDetails: teleDetails
  }
}

export const initDevicesWithTelePropsDetails = (payload) => {
  return dispatch => {
    axios.post("api/getDeviceTeleProps/details", payload).then(response => {
      dispatch(setDevicesWithTelePropsDetailsInfo(response.data));
    });
  }
}