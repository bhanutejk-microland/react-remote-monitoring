import * as actionTypes from '../../actions/actionTypes';
import { unixTimestampToDateTimeconverter } from '../../../utilities/timeStampConverter';

const initialState = {
  alerts: []
}

const setAlerts = (state, action) => {
  const newAlerts = new Array();
  if (action.alerts.length > 0) {
    action.alerts.map(alert => {
      newAlerts.push({
        assetId: alert.deviceId,
        dateTime: unixTimestampToDateTimeconverter(alert.modified),
        status: alert.severity,
        summary: alert.description
      });
    });
  }
  return { alerts: [ ...newAlerts ] };
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_ALERTS: return setAlerts(state, action);
    default: return state;
  }
}

export default reducer;
