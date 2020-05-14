import * as actionTypes from '../../actions/actionTypes';
import { updateObject, updateArrayObject } from '../../../utilities/reduxStateUpdate';

const initialState = {
  gaugeInfo: [{
    name : 'head',
    property : {
      maximum : 0,
      minimum : 100,
      value : "50",
      unit : "%"
    }
  },{
    name : 'flow',
    property : {
      maximum : 0,
      minimum : 100,
      value : "50",
      unit : "%"
    }
  },{
    name : 'speed',
    property : {
      maximum : 0,
      minimum : 5000,
      value : "3000",
      unit : "%"
    }
  },{
    name : 'torque',
    property : {
      maximum : 0,
      minimum : 100,
      value : "50",
      unit : "%"
    }
  },{
    name : 'status',
    property : {
      value : 'Healthy'
    }
  }],
  predictionList: [],
  analyticalProbabilityInfo: {
    categoryAxes : "Probability of assets status",
    valueAxes : "Probability",
    probabilityList : []
  },
  analyticalCountInfo: {
    categoryAxes : "Count Occurence",
    valueAxes : "Count",
    countList : []
  }
};

const setGaugeValue = (state, action) => {
  let updatedGaugeInfoKey = Object.keys(action.value);
  let updatedGaugeInfoValue = Object.values(action.value);
  let updatedGaugeInfo:any[] = [];
  updatedGaugeInfoKey.map( (item, index) => {
    let obj = {
      name : updatedGaugeInfoKey[index],
      property : updatedGaugeInfoValue[index]
    }
    updatedGaugeInfo.push(obj);
  });
  const updatedGaugeValue = updateArrayObject([], updatedGaugeInfo);
  const updatedState = {
    gaugeInfo: updatedGaugeValue
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

const setCountStatus = (state,action) => {
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
    case actionTypes.SET_GAUGE_VALUE: return setGaugeValue(state, action);
    case actionTypes.SET_LAST_TEN_PREDICTION: return setLastTenPrediction(state, action);
    case actionTypes.SET_PROBABILITY_STATUS: return setProbabilityStatus(state,action);
    case actionTypes.SET_COUNT_STATUS: return setCountStatus(state,action);
    default: return state;
  }
}

export default reducer;
