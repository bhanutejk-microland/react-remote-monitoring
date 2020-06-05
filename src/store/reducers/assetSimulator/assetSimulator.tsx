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
  assetSimulatorFaultValue : {
    current: 0,
    dischargePressure: 0,
    flow: 0,
    head: 0,
    power: 0,
    speed: 0,
    suctionPressure: 0,
    temperature: 0,
    torque: 0,
    vibration: 0,
    voltage: 0,
  },
  actualFaultValue : {}
}

const setActualFaultValue = (state, action) => {
  let newActualFaultValue = action.data;
  let updatedActualFaultValue = updateObject({},newActualFaultValue);
  let updatedState = {
    actualFaultValue : updatedActualFaultValue
  }
  return updateObject(state, updatedState);
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
  let updatedSimulatorHealthyValue = updateObject(state.assetSimulatorValue,newSimulatorHealtyValue);
  let updatedState = {
    assetSimulatorValue : updatedSimulatorHealthyValue
  }
  return updateObject(state,updatedState);
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_SIMULATOR_FAULT_VALUE : return setSimulatorFaultValue(state,action);
    case actionTypes.SET_SIMULATOR_HEALTHY_VALUE : return setSimulatorHealthyValue(state,action);
    case actionTypes.SET_ACTUAL_FAULT_VALUE : return setActualFaultValue(state,action);
    default: return state;
  }
}

export default reducer;
