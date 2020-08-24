import * as actionTypes from '../actionTypes'
import axios from '../../../axios';

  export const setGaugeValue = (value) => {
    return {
      type: actionTypes.SET_GAUGE_VALUE,
      value: value
    };
  };
  
  export const getGaugeValue = (configType,deviceId) => {
    return dispatch => {
      axios.get("/api/faultClassification/getFault?configType="+configType+"&deviceId="+deviceId).then(response => {
        dispatch(setGaugeValue(response.data))
      });
    }
  }

  export const setLastTenPredictionValue = (value) => {
    return {
      type: actionTypes.SET_LAST_TEN_PREDICTION,
      value: value
    };
  };
  
  export const getLastTenPredictionValue = (configType,deviceId) => {
    return dispatch => {
      axios.get("api/faultClassification/getLastTenPrediction?configType="+configType+"&deviceId="+deviceId).then(response => {
        dispatch(setLastTenPredictionValue(response.data))
      });
    }
  }

  
  export const setProbabilityStatusValue = (value) => {
    return {
      type: actionTypes.SET_PROBABILITY_STATUS,
      value: value
    };
  };
  
  export const getProbabilityStatusValue = (configType,deviceId,fromTimeStamp,toTimeStamp) => {
    return dispatch => {
      axios.get("api/faultClassification/getProbabilityStatus?configType="+configType+"&deviceId="+deviceId+"&fromTimeStamp="+fromTimeStamp+"&toTimeStamp="+toTimeStamp).then(response => {
        dispatch(setProbabilityStatusValue(response.data))
      });
    }
  }

  export const setCountStatusValue = (value) => {
    return {
      type: actionTypes.SET_COUNT_STATUS,
      value: value
    };
  };
  
  export const getCountStatusValue = (configType,deviceId,fromTimeStamp,toTimeStamp) => {
    return dispatch => {
      axios.get("api/faultClassification/getCountStatus?configType="+configType+"&deviceId="+deviceId+"&fromTimeStamp="+fromTimeStamp+"&toTimeStamp="+toTimeStamp).then(response => {
        dispatch(setCountStatusValue(response.data))
      });
    }
  }

  export const setFaultPredictionValue = (value) => {
    return {
      type: actionTypes.SET_CLASSIFICATION_FAULT_PREDICTION,
      value: value
    };
  };
  
  export const getFaultPredictionValue = (configType,deviceId,fromTimeStamp,toTimeStamp) => {
    return dispatch => {
      axios.get("api/faultClassification/getFaultPrediction?configType="+configType+"&deviceId="+deviceId+"&fromTimeStamp="+fromTimeStamp+"&toTimeStamp="+toTimeStamp).then(response => {
        dispatch(setFaultPredictionValue(response.data))
      });
    }
  }
  
  