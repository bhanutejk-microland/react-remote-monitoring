import * as actionTypes from '../actionTypes';
import axios from '../../../axios';

export const setAssetSimulator = (simulatorData) => {
  return {
    type: actionTypes.SET_ASSET_SIMULATOR,
    simulatorData: simulatorData
  }
}

export const initAssetSimulator = (faultSelectedValue,row) => {
  return dispatch => {
    axios.get("api/getPumpSimulatorData").then(response => {
      dispatch(setAssetSimulator({
          data : response.data[row],
          faultValue : faultSelectedValue
        }));
    });
  }
}

export const setSimulatorFaultValue = (data) => {
  return {
    type : actionTypes.SET_SIMULATOR_FAULT_VALUE,
    data : data
  }
}

export const getSimulatorFaultValue = (faultSelectedValue) => {
  return dispatch => {
    axios.post("api/getPumpSimulatorData/getFaultValue",faultSelectedValue).then(response => {
      dispatch(setSimulatorFaultValue(response.data));
    })
  }
} 

export const postAssetFaultValue = (faultBody) => {
  let axiosConfig = {
    headers: {
        'Content-Type': 'application/json'
    }
  };
  return dispatch => {
    axios.post("api/simulator",faultBody,axiosConfig).then(response => {
      response.data;
    });
  }
}

export const setAssetHealthyValue = (data) => {
  return {
    type : actionTypes.SET_SIMULATOR_HEALTHY_VALUE,
    data : data
  }
}

export const getAssetHealthyValue = () => {
  return dispatch => {
    axios.get("api/getPumpSimulatorData/getHealtyValue").then(response => {
      dispatch(setAssetHealthyValue(response.data));
    })
  }
}
