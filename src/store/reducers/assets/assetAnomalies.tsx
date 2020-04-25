import * as actionTypes from '../../actions/actionTypes';
import { unixTimestampToDateTimeconverter } from '../../../utilities/timeStampConverter';

const initialState = {
  anomalies: {}
}

const setAssetAnomalies = (state, action) => {
  // const newAnamolies = new Array();
  // if (Object.keys(action.anomalies).length !== 0) {
  //   Object.keys(action.anomalies).map(anamolyKey => {
  //     if (Object.keys(action.anomalies[anamolyKey].telemetry[0]).includes('expValue')) {
  //       const telemetryData = new Array();
  //       action.anomalies[anamolyKey].telemetry.map(teleData => {
  //         const newTeleData = {
  //           date: unixTimestampToDateTimeconverter(teleData.timestamp),
  //           value1: teleData.tempValue,
  //           value2: teleData.expValue,
  //           previousDate: unixTimestampToDateTimeconverter(teleData.timestamp)
  //         }
  //         telemetryData.push(newTeleData)
  //       })
  //       newAnamolies.push([anamolyKey, telemetryData])
  //     }
  //   });
  // }

  return { anomalies: { ...action.anomalies } };
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_ASSET_ANOMALIES: return setAssetAnomalies(state, action);
    default: return state;
  }
}

export default reducer;
