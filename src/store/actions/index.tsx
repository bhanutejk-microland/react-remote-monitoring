export { initDashboardAlerts } from './dashboard/alerts';
export { initDashboardMapInfo } from './dashboard/mapInfo';
export { initAssetDetails } from './assets/assetDetails';
export { initAssetProperties } from './assets/assetProperties';
export { initAssetAnomalies } from './assets/assetAnomalies';
export { initDeviceTelemetry } from './alerts/deviceTelemetry';
export { initAlerts } from './alerts/alerts';
export { initTrends } from './trends/trends';
export {
  initKpiTotalAssetsInfo,
  initKpiTotalActiveInfo,
  initKpiTotalTrippedInfo,
  initKpiTotalInactiveInfo,
  initKpiTotalCriticalAlertsInfo,
  initKpiTotalFletupTimeInfo
} from './dashboard/dashboard';

export {
  initAssets,
  addAssetToList
} from './assets/assets';

export {
  initRules,
  addToRulesList
} from './rules/rules';

export {
  initDeviceGroupList,
  initAllDeviceGroupDetails
} from './assets/assetDevices';

export {
  addDeviceFormData
} from './assets/assetAddDeviceForm';

export {
  addDeviceGroupFormData
} from './assets/assetAddDeviceGroupForm';
