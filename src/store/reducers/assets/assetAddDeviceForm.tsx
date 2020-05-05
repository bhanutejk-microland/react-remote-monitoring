import * as actionTypes from '../../actions/actionTypes';

const initialState = {
    deviceFormData: []
}

const addDeviceFormData = (state, action) => {
  const updatedDeviceFormData = [...state.deviceFormData, action.formData];
  return { deviceFormData: [ ...updatedDeviceFormData ] };
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_DEVICE_FORM_DATA: return addDeviceFormData(state, action);
    default: return state;
  }
}

export default reducer;
