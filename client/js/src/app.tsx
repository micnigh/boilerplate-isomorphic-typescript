import "es5-shim";
import "es5-shim/es5-sham";
import "es6-shim";
import "es6-shim/es6-sham";
import "es7-shim";
import "regenerator-runtime/runtime";

import * as WebFont from "webfontloader";

if (process.env.JS_ENV === "browser") {
  WebFont.load({
    google: {
      families: ["Roboto"],
    },
  });
}

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

let render = () => {
  ReactDOM.render((
    <AppContainer key={Math.random()}>
      <Root store={store} history={history} />
    </AppContainer>
  ), document.getElementById("content"));
};

require("../../css/src/app.scss");
if (process.env.NODE_ENV === "development") {
  // give stylesheet time to apply to document
  setTimeout(() => render(), 0);
} else {
  render();
}

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
