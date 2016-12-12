import "es5-shim";
import "es5-shim/es5-sham";
import "es6-shim";
import "es6-shim/es6-sham";
import "regenerator-runtime/runtime";

import * as React from "react";
import * as ReactDOM from "react-dom";

import { AppContainer } from "react-hot-loader";

import { browserHistory } from "react-router";
import Root from "./container/root";
let { syncHistoryWithStore, routeReducer } = require("react-router-redux");
import { initStore } from "./store/";

require("../../css/src/app.scss");

declare let window: any;
declare let module: any;

let { initialState } = window as any;
let store = initStore(initialState);

let history = syncHistoryWithStore(browserHistory, store);

ReactDOM.render((
  <AppContainer>
    <Root store={store} history={history} />
  </AppContainer>
), document.getElementById("content"));

if (module.hot) {
  module.hot.accept("./container/root", () => {
    let NextRoot = require("./container/root").default;
    ReactDOM.render((
      <AppContainer key={Math.random()}>
        <NextRoot store={store} history={history} />
      </AppContainer>
    ), document.getElementById("content"));
  });
}
