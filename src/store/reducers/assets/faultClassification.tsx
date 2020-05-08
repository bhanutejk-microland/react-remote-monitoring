import * as actionTypes from '../../actions/actionTypes';
import { updateObject, updateArrayObject } from '../../../utilities/reduxStateUpdate';

const initialState = {
  gaugeInfo: [],
  faultStatus: '',
  predictionList: []
};

const setGaugeValue = (state, action) => {
  const updatedGaugeValue = updateArrayObject([],  action.value);
  const updatedState = {
    gaugeInfo: updatedGaugeValue
  }
  return updateObject( state, updatedState );
}

const setFaultStatus = (state, action) => {
  const updatedFaultStatus = updateObject('',  action.value);
  const updatedState = {
    faultStatus: updatedFaultStatus
  }
  return updateObject( state, updatedState );
}

const setLastTenPrediction = (state, action) => {
  const updatedLastTenPrediction = updateArrayObject([],  action.value);
  const updatedState = {
    predictionList: updatedLastTenPrediction
  }
  return updateObject( state, updatedState );
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_GAUGE_VALUE: return setGaugeValue(state, action);
    case actionTypes.SET_FAULT_STATUS: return setFaultStatus(state, action);
    case actionTypes.SET_LAST_TEN_PREDICTION: return setLastTenPrediction(state, action)
    default: return state;
  }
}

export default reducer;
