import { faCubes, faStopwatch, faCheckCircle, faExclamationCircle, faTimesCircle, faBell } from "@fortawesome/free-solid-svg-icons";

import * as actionTypes from '../../actions/actionTypes';
import { updateObject } from '../../../utilities/reduxStateUpdate';

const initialState = {
  kpiInfo: {
    totalAssets: {
      value: null,
      label: 'Total Assets',
      iconBgColor: '#08bda9',
      fontAwesomeName: faCubes
    },
    totalActive: {
      value: null,
      label: 'Total Active',
      iconBgColor: '#4b56efad',
      fontAwesomeName: faCheckCircle
    },
    totalTripped: {
      value: null,
      label: "Total Tripped",
      iconBgColor: "#f39c12",
      fontAwesomeName: faExclamationCircle
    },
    totalInactive: {
      value: null,
      label: "Total Inactive",
      iconBgColor: "#dd4b39",
      fontAwesomeName: faTimesCircle
    },
    totalCriticalAlerts: {
      value: null,
      label: "Critical Alerts",
      iconBgColor: "#f7e835",
      fontAwesomeName: faBell
    },
    fletUptime: {
      value: null,
      label: "Assets UpTime",
      iconBgColor: "#39ca2a",
      fontAwesomeName: faStopwatch
    }
  }
};

const setKpiTotalAssetValue = (state, action) => {
  const updateTotalAsset = { value:  action.kpiValue }
  const updatedTotalAssetKpi = updateObject(state.kpiInfo.totalAssets, updateTotalAsset);
  const updatedKpis = updateObject(state.kpiInfo, { totalAssets: updatedTotalAssetKpi });
  const updatedState = {
    kpiInfo: updatedKpis
  }
  return updateObject( state, updatedState );
}

const setKpiTotalActiveValue = (state, action) => {
  const updateTotalActive = { value:  action.kpiValue }
  const updatedTotalActiveKpi = updateObject(state.kpiInfo.totalActive, updateTotalActive);
  const updatedKpis = updateObject(state.kpiInfo, { totalActive: updatedTotalActiveKpi });
  const updatedState = {
    kpiInfo: updatedKpis
  }
  return updateObject( state, updatedState );
}

const setKpiTotalTrippedValue = (state, action) => {
  const updateTotalTripped = { value:  action.kpiValue}
  const updatedTotalTrippedKpi = updateObject(state.kpiInfo.totalTripped, updateTotalTripped);
  const updatedKpis = updateObject(state.kpiInfo, { totalTripped: updatedTotalTrippedKpi });
  const updatedState = {
    kpiInfo: updatedKpis
  }
  return updateObject( state, updatedState );
}

const setKpiTotalInactiveValue = (state, action) => {
  const updateTotalInactive = { value:  action.kpiValue}
  const updatedTotalInactiveKpi = updateObject(state.kpiInfo.totalInactive, updateTotalInactive);
  const updatedKpis = updateObject(state.kpiInfo, { totalInactive: updatedTotalInactiveKpi });
  const updatedState = {
    kpiInfo: updatedKpis
  }
  return updateObject( state, updatedState );
}

const setKpiTotalCriticalAlertsValue = (state, action) => {
  const updateTotalCriticalAlert = { value:  action.kpiValue}
  const updatedTotalCriticalAlertsKpi = updateObject(state.kpiInfo.totalCriticalAlerts, updateTotalCriticalAlert);
  const updatedKpis = updateObject(state.kpiInfo, { totalCriticalAlerts: updatedTotalCriticalAlertsKpi });
  const updatedState = {
    kpiInfo: updatedKpis
  }
  return updateObject( state, updatedState );
}

const setKpiTotalFletupTimeValue = (state, action) => {
  const updateTotalFletupTime = { value:  action.kpiValue}
  const updatedTotalFletupTimeKpi = updateObject(state.kpiInfo.fletUptime, updateTotalFletupTime);
  const updatedKpis = updateObject(state.kpiInfo, { fletUptime: updatedTotalFletupTimeKpi });
  const updatedState = {
    kpiInfo: updatedKpis
  }
  return updateObject( state, updatedState );
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_KPI_TOTAL_ASSET_VALUE: return setKpiTotalAssetValue(state, action);
    case actionTypes.SET_KPI_TOTAL_ACTIVE_VALUE: return setKpiTotalActiveValue(state, action);
    case actionTypes.SET_KPI_TOTAL_TRIPPED_VALUE: return setKpiTotalTrippedValue(state, action);
    case actionTypes.SET_KPI_TOTAL_INACTIVE_VALUE: return setKpiTotalInactiveValue(state, action);
    case actionTypes.SET_KPI_TOTAL_CRITICAL_ALERTS_VALUE: return setKpiTotalCriticalAlertsValue(state, action);
    case actionTypes.SET_KPI_TOTAL_FLETUP_TIME_VALUE: return setKpiTotalFletupTimeValue(state, action);
    default: return state;
  }
}

export default reducer;
