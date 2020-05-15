import * as actionTypes from '../../actions/actionTypes';
import { unixTimestampToDateTimeconverter } from '../../../utilities/timeStampConverter';

const initialState = {
  alertsInfo: []
}

const setDashboardAlerts = (state, action) => {
  const newAlerts = new Array();
  if (action.alerts.length > 0) {
    action.alerts.map(alert => {
      newAlerts.push({
        assetId: alert.deviceId,
        dateTime: unixTimestampToDateTimeconverter(alert.modified),
        status: alert.status,
        severity: alert.severity,
        ruleId: alert.ruleId,
        summary: alert.description
      });
    });
  }
  return { alertsInfo: [...newAlerts] };
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_DASHBOARD_ALERTS: return setDashboardAlerts(state, action);
    default: return state;
  }
}

export default reducer;
