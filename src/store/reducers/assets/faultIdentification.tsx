import * as actionTypes from '../../actions/actionTypes';
import { updateObject, updateArrayObject } from '../../../utilities/reduxStateUpdate';

const initialState = {
  analyticalProbabilityInfo: {
    categoryAxes : "Probability of Assets Status",
    valueAxes : "Probability",
    probabilityList : []
  },
  analyticalCountInfo: {
    categoryAxes : "Count Occurence",
    valueAxes : "Count",
    countList : []
  }
};

const setIdentificationProbabilityStatus = (state,action) => {
  let updatedProbabilityStatusKey = Object.keys(action.value);
  let updatedProbabilityStatusValue:any = Object.values(action.value);
  let newProbabilityList:any[] = [];
  updatedProbabilityStatusKey.map( (item,index) => {
    let obj = {
      name : updatedProbabilityStatusKey[index],
      value : updatedProbabilityStatusValue[index].value
    }
    newProbabilityList.push(obj);
  });
  const updatedProbabilityList = updateArrayObject([], newProbabilityList);
  const updatedAnalyticalProbabilityInfo = updateObject(state.analyticalProbabilityInfo, {probabilityList : updatedProbabilityList});
  const updatedState = {
    analyticalProbabilityInfo : updatedAnalyticalProbabilityInfo
  }
  
  return updateObject(state,updatedState);
}

const setIdentificationCountStatus = (state,action) => {
  let updatedCountStatusKey = Object.keys(action.value);
  let updatedCountStatusValue:any = Object.values(action.value);
  let newCountList:any[] = [];
  updatedCountStatusKey.map( (item,index) => {
    let obj = {
      name : updatedCountStatusKey[index],
      value : updatedCountStatusValue[index].value
    }
    newCountList.push(obj);
  });
  const updatedCountList = updateArrayObject([], newCountList);
  const updatedAnalyticalCountInfo = updateObject(state.analyticalCountInfo, {countList : updatedCountList});
  const updatedState = {
    analyticalCountInfo : updatedAnalyticalCountInfo
  }
  return updateObject(state,updatedState);
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_IDENTIFICATION_PROBABILITY_STATUS: return setIdentificationProbabilityStatus(state,action);
    case actionTypes.SET_IDENTIFICATION_COUNT_STATUS: return setIdentificationCountStatus(state,action);
    default: return state;
  }
}

export default reducer;
