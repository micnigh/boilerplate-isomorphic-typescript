import "es5-shim";
import "es5-shim/es5-sham";
import "es6-shim";
import "es6-shim/es6-sham";
import "es7-shim";
import "regenerator-runtime/runtime";

import * as WebFont from "webfontloader";
import * as React from "react";
import * as ReactDOM from "react-dom";
import { Provider } from "react-redux";
import * as Redux from "react-redux";
import { AppContainer } from "react-hot-loader";
import { BrowserRouter as Router } from "react-router-dom";

import { initStore } from "./store/";

import App from "./app";

declare let window: any;
declare let module: any;

let store = undefined;

let render = (App) => {
  let app =
    <Provider store={store}>
      <Router>
        <App/>
      </Router>
    </Provider>;

  if (process.env === "development") {
    app =
      <AppContainer key={Math.random()}>
        {app}
      </AppContainer>;
  }

  ReactDOM.render(app, document.getElementById("content"));
};

window.addEventListener("load", () => {
  store = initStore(window.initialState);
  render(App);
});

if (process.env.JS_ENV === "browser") {
  WebFont.load({
    google: {
      families: ["Roboto"],
    },
  });
}

if (module.hot) {
  module.hot.accept("./app", () => {
    let App = require("./app").default;
    render(App);
  });
}

declare let __webpack_public_path__: any;
if (process.env.NODE_ENV === "development") {
  // dynamically set webpacks public path, so hmr can update correctly
  // see - https://github.com/webpack/webpack/issues/443#issuecomment-59843035
  __webpack_public_path__ = window.location.protocol + "//" + window.location.host + "/";
}
