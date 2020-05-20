import * as actionTypes from '../../actions/actionTypes';

const initialState = {
  anomalies: {}
}

const setAssetAnomalies = (state, action) => {
  return { anomalies: { ...action.anomalies } };
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_ASSET_ANOMALIES: return setAssetAnomalies(state, action);
    default: return state;
  }
}

export default reducer;
