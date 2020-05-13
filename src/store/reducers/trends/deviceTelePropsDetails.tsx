import * as actionTypes from '../../actions/actionTypes';

const initialState = {
  devicesTeleDetails: []
}

const setDevicesWithTelePropsDetailsInfo = (state, action) => {
  console.log(">>>>>>>>>>>.", action);
  return { devicesTeleDetails: [...action.devicesTeleDetails] };
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_DEVICE_WITH_TELE_PROPS_DETAILS: return setDevicesWithTelePropsDetailsInfo(state, action);
    default: return state;
  }
}

export default reducer;
