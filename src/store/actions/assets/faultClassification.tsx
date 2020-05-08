import * as actionTypes from '../actionTypes'
import axios from '../../../axios';

  export const setGaugeValue = (value) => {
    return {
      type: actionTypes.SET_GAUGE_VALUE,
      value: value
    };
  };
  
  export const getGaugeValue = () => {
    return dispatch => {
      axios.get("api/faultClassification/gaugeValue").then(response => {
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
  
  export const getLastTenPredictionValue = () => {
    return dispatch => {
      axios.get("api/faultClassification/getLastTenPrediction").then(response => {
        dispatch(setLastTenPredictionValue(response.data))
      });
    }
  }

  export const setFaultStatusValue = (value) => {
    return {
      type: actionTypes.SET_FAULT_STATUS,
      value: value
    };
  };
  
  export const getFaultStatusValue = () => {
    return dispatch => {
      axios.get("api/faultClassification/getFault").then(response => {
        dispatch(setFaultStatusValue(response.data))
      });
    }
  }
  