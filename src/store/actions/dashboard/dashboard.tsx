import * as actionTypes from '../actionTypes'
import axios from '../../../axios';

export const setKpiTotalAssetValue = (kpiValue) => {
  return {
    type: actionTypes.SET_KPI_TOTAL_ASSET_VALUE,
    kpiValue: kpiValue
  };
};

export const initKpiTotalAssetsInfo = () => {
  return dispatch => {
    axios.get("api/kpi/totalDevices?configType=devices").then(response => {
      dispatch(setKpiTotalAssetValue(response.data[0]))
    });
  }
}

export const setKpiTotalActiveInfo = (kpiValue) => {
  return {
    type: actionTypes.SET_KPI_TOTAL_ACTIVE_VALUE,
    kpiValue: kpiValue
  };
};

export const initKpiTotalActiveInfo = () => {
  return dispatch => {
    axios.get("api/kpi/totalActive?configType=devices").then(response => {
      dispatch(setKpiTotalActiveInfo(response.data[0]))
    });
  }
}

export const setKpiTotalTrippedInfo = (kpiValue) => {
  return {
    type: actionTypes.SET_KPI_TOTAL_TRIPPED_VALUE,
    kpiValue: kpiValue
  };
};

export const initKpiTotalTrippedInfo = () => {
  return dispatch => {
    axios.get("api/kpi/totalTripped?configType=devices").then(response => {
      dispatch(setKpiTotalTrippedInfo(response.data[0]))
    });
  }
}

export const setKpiTotalInactiveInfo = (kpiValue) => {
  return {
    type: actionTypes.SET_KPI_TOTAL_INACTIVE_VALUE,
    kpiValue: kpiValue
  };
};

export const initKpiTotalInactiveInfo = () => {
  return dispatch => {
    axios.get("api/kpi/totalInactive?configType=devices").then(response => {
      dispatch(setKpiTotalInactiveInfo(response.data[0]))
    });
  }
}

export const setKpiTotalCriticalAlertsInfo = (kpiValue) => {
  return {
    type: actionTypes.SET_KPI_TOTAL_CRITICAL_ALERTS_VALUE,
    kpiValue: kpiValue
  };
};

export const initKpiTotalCriticalAlertsInfo = () => {
  return dispatch => {
    axios.get("api/kpi/criticalAlerts?severity=Critical").then(response => {
      dispatch(setKpiTotalCriticalAlertsInfo(response.data.results[0]))
    });
  }
}

export const setKpiTotalFletupTimeInfo = (kpiValue) => {
  return {
    type: actionTypes.SET_KPI_TOTAL_FLETUP_TIME_VALUE,
    kpiValue: kpiValue
  };
};

export const initKpiTotalFletupTimeInfo = () => {
  return dispatch => {
    axios.get("api/kpi/uptime?configType=Devices").then(response => {
      dispatch(setKpiTotalFletupTimeInfo(response.data.results[0]))
    });
  }
}
