import * as actionTypes from '../../actions/actionTypes';
import { unixTimestampToDateTimeconverter } from '../../../utilities/timeStampConverter';
import { updateObject } from '../../../utilities/reduxStateUpdate';

const initialState = {
  alerts: []
}

const setAlerts = (state, action) => {
  const newAlerts = new Array();
  if (action.alerts.length > 0) {
    action.alerts.map(alert => {
      newAlerts.push({
        assetId: alert.deviceId,
        alertDate: unixTimestampToDateTimeconverter(alert.created),
        alertSeveriy: alert.severity,
        alertStatus: alert.status,
        alertId: alert.id,
        alertDescription: alert.description,
        partitionId: alert.PartitionId
      });
    });
  }
  return { alerts: [ ...newAlerts ] };
}

const updateAlertListInfo = (state,action) => {
  let newAlertListInfo = new Array();
  newAlertListInfo = [...state.alerts];    
  let objIndex = newAlertListInfo.findIndex( alert => alert.alertId === action.alertData["id"]);
  console.log(objIndex);
  let newObj = {
    alertStatus: action.alertData["status"],
    //alertDate : unixTimestampToDateTimeconverter(action.alertData["modified"])
  }
  let alert = updateObject(newAlertListInfo[objIndex], newObj);
  newAlertListInfo[objIndex] = alert;
  return { alerts : [...newAlertListInfo]};
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_ALERTS: return setAlerts(state, action);
    case actionTypes.UPDATE_ALERT_INFO_LIST: return updateAlertListInfo(state, action);
    default: return state;
  }
}

export default reducer;
