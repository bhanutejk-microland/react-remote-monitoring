import * as actionTypes from '../../actions/actionTypes';
import { updateObject } from '../../../utilities/reduxStateUpdate';

const initialState = {
  assetSimulatorList: {},
  assetSimulatorValue : {
    current: 80,
    dischargePressure: 32,
    flow: 9.8531,
    head: 39.499,
    power: 200,
    speed: 2833.6,
    suctionPressure: 28,
    temperature: 37,
    torque: 12.118,
    vibration: 10,
    voltage: 220,
  },
  assetSimulatorFaultValue : {},
}

const setAssetSimulator = (state, action) => {
  let newAssetSimulatorList = new Array();  
  newAssetSimulatorList = action.simulatorData.data;
  let updatedAssetSimulatorList = newAssetSimulatorList[action.simulatorData.faultValue];
  return { assetSimulatorList: updatedAssetSimulatorList };  
}

const setSimulatorFaultValue = (state, action) => {
  let newSimulatorFaultValue = action.data;
  let updatedSimulatorFaultValue = updateObject({},newSimulatorFaultValue);
  let updatedState = {
    assetSimulatorFaultValue : updatedSimulatorFaultValue
  }
  return updateObject(state, updatedState);
}

const setSimulatorHealthyValue = (state,action) => {
  let newSimulatorHealtyValue = action.data;
  let updatedSimulatorHealthyValue = updateObject({},newSimulatorHealtyValue);
  let updatedState = {
    assetSimulatorValue : updatedSimulatorHealthyValue
  }
  return updateObject(state,updatedState);
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_ASSET_SIMULATOR: return setAssetSimulator(state, action);
    case actionTypes.SET_SIMULATOR_FAULT_VALUE : return setSimulatorFaultValue(state,action);
    case actionTypes.SET_SIMULATOR_HEALTHY_VALUE : return setSimulatorHealthyValue(state,action);
    default: return state;
  }
}

export default reducer;
