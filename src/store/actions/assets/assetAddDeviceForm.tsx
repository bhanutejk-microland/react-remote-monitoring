import * as actionTypes from '../actionTypes';
import axios from '../../../axios';

export const setDeviceFormData = (formData) => {
  return {
    type: actionTypes.ADD_DEVICE_FORM_DATA,
    formData: formData
  }
}

export const addDeviceFormData = (formData) => {
  let newFormData = {...formData[0]}
  return dispatch => {
    axios.post("http://localhost:3000/api/devices/add", newFormData).then(response => {
        dispatch(setDeviceFormData(response.data));
    });
  }
}
