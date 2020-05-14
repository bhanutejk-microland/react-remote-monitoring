import * as actionTypes from '../../actions/actionTypes';
import { updateObject, updateArrayObject } from '../../../utilities/reduxStateUpdate';

const initialState = {
  gaugeInfo: [{
    name : 'head',
    property : {
      maximum : 0,
      minimum : 100,
      value : "50"
    }
  },{
    name : 'flow',
    property : {
      maximum : 0,
      minimum : 100,
      value : "50"
    }
  },{
    name : 'speed',
    property : {
      maximum : 0,
      minimum : 5000,
      value : "3000"
    }
  },{
    name : 'torque',
    property : {
      maximum : 0,
      minimum : 100,
      value : "50"
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

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_IDENTIFICATION_GAUGE_VALUE: return setIdentificationGaugeValue(state, action);
    case actionTypes.SET_IDENTIFICATION_LAST_TEN_PREDICTION: return setIdentificationLastTenPrediction(state, action);
    case actionTypes.SET_IDENTIFICATION_PROBABILITY_STATUS: return setIdentificationProbabilityStatus(state,action);
    case actionTypes.SET_IDENTIFICATION_COUNT_STATUS: return setIdentificationCountStatus(state,action);
    default: return state;
  }
}

export default reducer;
