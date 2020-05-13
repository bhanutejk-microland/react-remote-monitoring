import * as actionTypes from '../../actions/actionTypes';

const initialState = {
  deviceGroupFormData: []
}

const addDeviceGroupFormData = (state, action) => {
  const updatedDeviceGroupFormData = [...state.deviceGroupFormData, action.formData];
  return { deviceGroupFormData: [ ...updatedDeviceGroupFormData ] };
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_DEVICE_GROUP_FORM_DATA: return addDeviceGroupFormData(state, action);
    default: return state;
  }
}

export default reducer;
