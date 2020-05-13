import * as actionTypes from '../../actions/actionTypes';

const initialState = {
  devicesWithTeleProps: []
}

const setDevicesWithTelePropsInfo = (state, action) => {
  console.log("MMMMMMMMM>>>>>>>>>>>.", action);
  return { devicesWithTeleProps: [...action.devicesTeleProps] };
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_DEVICE_WITH_TELE_PROPS: return setDevicesWithTelePropsInfo(state, action);
    default: return state;
  }
}

export default reducer;
