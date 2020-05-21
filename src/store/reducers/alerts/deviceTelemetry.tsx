import * as actionTypes from '../../actions/actionTypes';
import { unixTimestampToOnlyDateTimeconverter } from '../../../utilities/timeStampConverter';

const initialState = {
  deviceTelemetry: []
}

const setDeviceTelemetry = (state, action) => {
  const telemetryData = new Array();
  if (action.telemetryProperty.telemetryData.length > 0) {
    action.telemetryProperty.telemetryData.map( teleData => {
      telemetryData.push({
        date: unixTimestampToOnlyDateTimeconverter(teleData.timestamp),
        value: teleData[action.telemetryProperty.telemetryfield]
      })
    } )
  }
  return { deviceTelemetry: [ ...telemetryData ] };
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_ALERT_TELEMETRY: return setDeviceTelemetry(state, action);
    default: return state;
  }
}

export default reducer;
