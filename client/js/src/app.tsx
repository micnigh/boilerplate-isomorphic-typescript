import "es5-shim";
import "es5-shim/es5-sham";
import "es6-shim";
import "es6-shim/es6-sham";
import "regenerator-runtime/runtime";

import * as React from "react";
import * as ReactDOM from "react-dom";

import { browserHistory } from "react-router";
import Root from "./container/root";
let { syncHistoryWithStore, routeReducer } = require("react-router-redux");
import { initStore } from "./store/";

declare let window: any;
declare let module: any;

if (process.env.NODE_ENV === "development" && module.hot) {
  require("./store/sample/"); // Enable Webpack hot module replacement for sample data
}

let { initialState } = window as any;
let store = initStore(initialState);

let history = syncHistoryWithStore(browserHistory, store);

let renderComponent = ReactDOM.render((
  <Root store={store} history={history} />
), document.getElementById("content"));

if (module.hot) {
  module.hot.accept("./store/sample/", () => {
    console.log("reload page when sample data changes");
    window.location.reload();
  });
}

export default renderComponent;
