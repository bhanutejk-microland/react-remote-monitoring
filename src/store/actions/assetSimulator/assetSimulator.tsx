import * as actionTypes from '../actionTypes';
import axios from '../../../axios';

export const setActualFaultValue = (data) => {
  return {
    type : actionTypes.SET_ACTUAL_FAULT_VALUE,
    data : data
  }
}


export const getActualFaultValue = (faultSelectedValue) => {
  return dispatch => {
    axios.post("api/getPumpSimulatorData/getFaultValue",faultSelectedValue).then(response => {
      dispatch(setActualFaultValue(response.data))
    })
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

// export const postAssetFaultValue = (faultBody) => {
//   let axiosConfig = {
//     headers: {
//         Authorization : "SharedAccessSignature sr=device-stream.azure-devices.net%2Fdevices%2FML-Pump002&sig=gdJlxrWqIhqDIpZWUyAJg%2BWFK3%2Bs3lkkrTIx6kjRu94%3D&se=1594245566",
//         "Content-Type": "application/json",
//         "Access-Control-Allow-Origin": "*"
//     }
//   };
//   return dispatch => {
//     axios.post("https://device-stream.azure-devices.net/devices/ML-Pump002/messages/events?api-version=2020-03-13",faultBody,axiosConfig).then(response => {
//       response.data;
//     });
//   }
// }

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
