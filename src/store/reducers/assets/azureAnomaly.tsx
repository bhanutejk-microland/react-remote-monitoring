import * as actionTypes from '../../actions/actionTypes';
import { updateObject } from '../../../utilities/reduxStateUpdate';

const initialState = {
  anomalies: {}
}

const setAssetAzureAnomalies = (state, action) => {
  const updatedAnomalies = { anomalies: action.anomalies };
  return updateObject(state, updatedAnomalies);
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_ASSET_AZURE_ANOMALY: return setAssetAzureAnomalies(state, action);
    default: return state;
  }
}

export default reducer;
