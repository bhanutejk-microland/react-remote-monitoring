import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";

import classes from "./App.css";
import Layout from "../components/Layout/Layout";
import Dashboard from "../containers/Dashboard/Dashboard";
import Assets from "../containers/Assets/Assets";
import Analytics from "../containers/Analytics/Analytics";
import AssetDetails from "../containers/Assets/AssetDetails/AssetDetails";
// import Devices from '../containers/Devices/Devices';
import Rules from '../containers/Rules/Rules';
import Alerts from '../containers/Alerts/Alerts';
import Trends from '../containers/Trends/Trends';
import Configuration from '../containers/Configuration/Configuration';
import AssetSimulator from '../containers/AssetSimulator/AssetSimulator';

class App extends Component {
  render() {
    return (
      <div className={classes.Wrapper}>
        <Layout>
          <Switch>
            <Route path="/" exact component={Dashboard} />
            <Route path="/assets" component={Assets} />
            <Route path="/analytics" component={Analytics} />
            <Route path="/alerts/:assetId?" exact component={Alerts} />
            <Route path="/rules" component={Rules} />
            <Route path="/trends" component={Trends} />
            <Route path="/configuration" component={Configuration} />
            <Route path="/assetDetails/:assetId" exact component={AssetDetails} />
            <Route path="/assetSimulator" component={AssetSimulator} />
          </Switch>
        </Layout>
      </div>
    );
  }
}

export default App;
