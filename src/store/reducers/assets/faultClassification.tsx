import * as actionTypes from '../../actions/actionTypes';
import { updateObject, updateArrayObject } from '../../../utilities/reduxStateUpdate';

const initialState = {
  gaugeInfo: [],
  faultStatus: '',
  predictionList: [],
  analyticalProbabilityInfo: {},
  analyticalCountInfo: {}
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

const setProbabilityStatus = (state,action) => {
  const updatedAnalyticalProbabilityInfo = updateObject(state.analyticalProbabilityInfo, action.value);
  const updatedState = {
    analyticalProbabilityInfo : updatedAnalyticalProbabilityInfo
  }
  return updateObject(state,updatedState);
}

const setCountStatus = (state,action) => {
  const updatedAnalyticalCountInfo = updateObject(state.analyticalCountInfo, action.value);
  const updatedState = {
    analyticalCountInfo : updatedAnalyticalCountInfo
  }
  return updateObject(state,updatedState);
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_GAUGE_VALUE: return setGaugeValue(state, action);
    case actionTypes.SET_FAULT_STATUS: return setFaultStatus(state, action);
    case actionTypes.SET_LAST_TEN_PREDICTION: return setLastTenPrediction(state, action);
    case actionTypes.SET_PROBABILITY_STATUS: return setProbabilityStatus(state,action);
    case actionTypes.SET_COUNT_STATUS: return setCountStatus(state,action);
    default: return state;
  }
}

export default reducer;
