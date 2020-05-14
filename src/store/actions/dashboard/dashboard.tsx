import * as actionTypes from '../actionTypes'
import axios from '../../../axios';

export const setKpiTotalAssetValue = (kpiValue) => {
  return {
    type: actionTypes.SET_KPI_TOTAL_ASSET_VALUE,
    kpiValue: kpiValue
  };
};

export const initKpiTotalAssetsInfo = (appFilters) => {
  return dispatch => {
    axios.post("api/kpi/totalDevices", appFilters).then(response => {
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

export const initKpiTotalActiveInfo = (appFilters) => {
  return dispatch => {
    axios.post("api/kpi/totalActive", appFilters).then(response => {
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

export const initKpiTotalTrippedInfo = (appFilters) => {
  return dispatch => {
    axios.post("api/kpi/totalTripped", appFilters).then(response => {
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

export const initKpiTotalInactiveInfo = (appFilters) => {
  return dispatch => {
    axios.post("api/kpi/totalInactive", appFilters).then(response => {
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

export const initKpiTotalCriticalAlertsInfo = (appFilters) => {
  return dispatch => {
    axios.post("api/kpi/criticalAlerts", appFilters).then(response => {
      dispatch(setKpiTotalCriticalAlertsInfo(response.data[0]))
    });
  }
}

export const setKpiTotalFletupTimeInfo = (kpiValue) => {
  return {
    type: actionTypes.SET_KPI_TOTAL_FLETUP_TIME_VALUE,
    kpiValue: kpiValue
  };
};

export const initKpiTotalFletupTimeInfo = (appFilters) => {
  return dispatch => {
    axios.post("api/kpi/uptime", appFilters).then(response => {
      dispatch(setKpiTotalFletupTimeInfo(response.data.results[0]))
    });
  }
}
