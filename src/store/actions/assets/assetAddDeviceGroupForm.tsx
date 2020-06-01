import * as actionTypes from '../actionTypes';
import axios from '../../../axios';

export const setDeviceGroupFormData = (formData) => {
  return {
    type: actionTypes.ADD_DEVICE_GROUP_FORM_DATA,
    formData: formData
  }
}

export const addDeviceGroupFormData = (formData) => {
  let newFormData = {...formData[0]}
  console.log(newFormData);
  return dispatch => {
    axios.post("api/devices/addDeviceGroup", newFormData).then(response => {
        dispatch(setDeviceGroupFormData(response.data));
    });
  }
}
