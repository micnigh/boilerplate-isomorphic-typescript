import * as React from "react";
import * as ReactDOM from "react-dom";

import { browserHistory } from "react-router";
import Root from "./container/root";
let { syncHistoryWithStore, routeReducer } = require("react-router-redux");
import store from "./store/";

let history = syncHistoryWithStore(browserHistory, store);

let renderComponent = ReactDOM.render((
  <Root store={store} history={history} />
), document.getElementById("content"));

export default renderComponent;
