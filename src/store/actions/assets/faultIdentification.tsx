import * as actionTypes from '../actionTypes'
import axios from '../../../axios';
  
  export const setIdentificationProbabilityStatusValue = (value) => {
    return {
      type: actionTypes.SET_IDENTIFICATION_PROBABILITY_STATUS,
      value: value
    };
  };
  
  export const getIdentificationProbabilityStatusValue = (configType,deviceId,fromTimeStamp,toTimeStamp) => {
    return dispatch => {
      axios.get("api/faultClassification/getProbabilityStatus?configType="+configType+"&deviceId="+deviceId+"&fromTimeStamp="+fromTimeStamp+"&toTimeStamp="+toTimeStamp).then(response => {
        dispatch(setIdentificationProbabilityStatusValue(response.data))
      });
    }
  }

  export const setIdentificationCountStatusValue = (value) => {
    return {
      type: actionTypes.SET_IDENTIFICATION_COUNT_STATUS,
      value: value
    };
  };
  
  export const getIdentificationCountStatusValue = (configType,deviceId,fromTimeStamp,toTimeStamp) => {
    return dispatch => {
      axios.get("api/faultClassification/getCountStatus?configType="+configType+"&deviceId="+deviceId+"&fromTimeStamp="+fromTimeStamp+"&toTimeStamp="+toTimeStamp).then(response => {
        dispatch(setIdentificationCountStatusValue(response.data))
      });
    }
  }
  