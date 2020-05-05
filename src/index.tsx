import * as React from "react";
import * as ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import thunk from 'redux-thunk';


import App from "./components/App";
import "./index.css";
import dashboardReducer from './store/reducers/dashboard/dashboard';
import dashboardAlertsReducer from './store/reducers/dashboard/alerts';
import dashboardMapInfoReducer from './store/reducers/dashboard/mapInfo';
import assetsReducer from './store/reducers/assets/assets';
import assetDetailReducer from './store/reducers/assets/assetDetails';
import assetPropertiesReducer from './store/reducers/assets/assetProperties';
import assetAnomaliesReducer from './store/reducers/assets/assetAnomalies';
import assetDevicesGroupReducer from './store/reducers/assets/assetDevices';
import rulesReducer from './store/reducers/rules/rules';
import alertsReducer from './store/reducers/alerts/alerts';
import deviceTelemetryReducer from './store/reducers/alerts/deviceTelemetry';
import trendsReducer from './store/reducers/trends/trends';

const composeEnhancers = window['__REDUX_DEVTOOLS_EXTENSION_COMPOSE__'] as typeof compose || compose;

const rootReducer = combineReducers({
  dashboard: dashboardReducer,
  dashboardAlerts: dashboardAlertsReducer,
  dashboardMapInfo: dashboardMapInfoReducer,
  assetsInfo: assetsReducer,
  assetDetail: assetDetailReducer,
  assetProperties: assetPropertiesReducer,
  assetAnomalies: assetAnomaliesReducer,
  assetDevicesGroup: assetDevicesGroupReducer,
  rulesInfo: rulesReducer,
  alertsInfo: alertsReducer,
  deviceTelemetryInfo: deviceTelemetryReducer,
  trendsInfo: trendsReducer
});

const store = createStore(rootReducer, composeEnhancers(
  applyMiddleware(thunk)
));

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById("app")
);
