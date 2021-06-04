import * as actionTypes from '../actionTypes'
import axios from '../../../axios';
  
export const setIdentificationGaugeValue = (value) => {
  return {
    type: actionTypes.SET_IDENTIFICATION_GAUGE_VALUE,
    value: value
  };
};

export const getIdentificationGaugeValue = (configType,deviceId) => {
  return dispatch => {
    axios.get("/api/faultIdentification/getFault?configType="+configType+"&deviceId="+deviceId).then(response => {
      dispatch(setIdentificationGaugeValue(response.data));
    });
  }
}

export const setIdentificationLastTenPredictionValue = (value) => {
  return {
    type: actionTypes.SET_IDENTIFICATION_LAST_TEN_PREDICTION,
    value: value
  };
};

export const getIdentificationLastTenPredictionValue = (configType,deviceId) => {
  return dispatch => {
    axios.get("api/faultIdentification/getLastTenPrediction?configType="+configType+"&deviceId="+deviceId).then(response => {
      dispatch(setIdentificationLastTenPredictionValue(response.data));
    });
  }
}

  export const setIdentificationProbabilityStatusValue = (value) => {
    return {
      type: actionTypes.SET_IDENTIFICATION_PROBABILITY_STATUS,
      value: value
    };
  };
  
  export const getIdentificationProbabilityStatusValue = (configType,deviceId,fromTimeStamp,toTimeStamp) => {
    return dispatch => {
      axios.get("api/faultIdentification/getProbabilityStatus?configType="+configType+"&deviceId="+deviceId+"&fromTimeStamp="+fromTimeStamp+"&toTimeStamp="+toTimeStamp).then(response => {
        dispatch(setIdentificationProbabilityStatusValue(response.data));
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
      axios.get("api/faultIdentification/getCountStatus?configType="+configType+"&deviceId="+deviceId+"&fromTimeStamp="+fromTimeStamp+"&toTimeStamp="+toTimeStamp).then(response => {
        dispatch(setIdentificationCountStatusValue(response.data));
      });
    }
  }

  export const setIdentificationFaultPredictionValue = (value) => {
    return {
      type: actionTypes.SET_CLASSIFICATION_FAULT_PREDICTION,
      value: value
    };
  };
  
  export const getIdentificationFaultPredictionValue = (configType,deviceId,fromTimeStamp,toTimeStamp) => {
    return dispatch => {
      axios.get("api/faultIdentification/getFaultPrediction?configType="+configType+"&deviceId="+deviceId+"&fromTimeStamp="+fromTimeStamp+"&toTimeStamp="+toTimeStamp).then(response => {
        dispatch(setIdentificationFaultPredictionValue(response.data));
      });
    }
  }
  