import * as actionTypes from '../actionTypes';
import axios from '../../../axios';

export const setDevicesWithTelePropsInfo = (teleProps) => {
  return {
    type: actionTypes.SET_DEVICE_WITH_TELE_PROPS,
    devicesTeleProps: teleProps
  }
}

export const initDevicesWithTeleProps = () => {
  return dispatch => {
    axios.get("api/getDevicesWithTeleProps").then(response => {
      dispatch(setDevicesWithTelePropsInfo(response.data));
    });
  }
}