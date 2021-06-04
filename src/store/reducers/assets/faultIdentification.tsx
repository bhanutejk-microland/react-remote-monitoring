import * as actionTypes from '../../actions/actionTypes';
import { updateObject, updateArrayObject } from '../../../utilities/reduxStateUpdate';

const initialState = {
  gaugeInfo: [{
    name : 'head',
    property : {
      minimum : 0,
      economy : 50,
      buzzer : 70,
      maximum : 100,
      value : "50",
      unit : "mbar"
    }
  },{
    name : 'flow',
    property : {
      minimum : 0,
      economy : 50,
      buzzer : 70,
      maximum : 100,
      value : "50",
      unit : "m3/hr"
    }
  },{
    name : 'speed',
    property : {
      minimum : 0,
      economy : 2500,
      buzzer : 3500,
      maximum : 5000,
      value : "3000",
      unit : "rpm"
    }
  },{
    name : 'torque',
    property : {
      minimum : 0,
      economy : 50,
      buzzer : 70,
      maximum : 100,
      value : "50",
      unit : "nm"
    }
  },{
    name : 'status',
    property : {
      value : 'Healthy'
    }
  }],
  predictionList: [],
  analyticalProbabilityInfo: {
    categoryAxes : "Probability of Assets Status",
    valueAxes : "Probability",
    probabilityList : []
  },
  analyticalCountInfo: {
    categoryAxes : "Count Occurence",
    valueAxes : "Count",
    countList : []
  },
  analyticalFaultPredictionInfo: {
    categoryAxes : "Fault Prediction",
    valueAxes : "Fault %",
    predictionList : []
  }
};

const setIdentificationGaugeValue = (state, action) => {
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

const setIdentificationLastTenPrediction = (state, action) => {
  const updatedLastTenPrediction = updateArrayObject([],  action.value);
  const updatedState = {
    predictionList: updatedLastTenPrediction
  }
  return updateObject( state, updatedState );
}


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

const setClassificationFaultprediction = (state,action) => {
  
  const updatedPredictionList = updateArrayObject([], action.value);
  const updatedAnalyticalFaultPredictionInfo = updateObject(state.analyticalFaultPredictionInfo, {predictionList : updatedPredictionList});
  const updatedState = {
    analyticalFaultPredictionInfo : updatedAnalyticalFaultPredictionInfo
  }
  return updateObject(state,updatedState);
}


const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_IDENTIFICATION_GAUGE_VALUE: return setIdentificationGaugeValue(state, action);
    case actionTypes.SET_IDENTIFICATION_LAST_TEN_PREDICTION: return setIdentificationLastTenPrediction(state, action);
    case actionTypes.SET_IDENTIFICATION_PROBABILITY_STATUS: return setIdentificationProbabilityStatus(state,action);
    case actionTypes.SET_IDENTIFICATION_COUNT_STATUS: return setIdentificationCountStatus(state,action);    
    case actionTypes.SET_CLASSIFICATION_FAULT_PREDICTION: return setClassificationFaultprediction(state,action);
    default: return state;
  }
}

export default reducer;
