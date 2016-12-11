let { routerReducer } = require("react-router-redux");
import { combineReducers } from "redux";

let routing = routerReducer;

import entities from "./entities/";

let App = combineReducers({
  entities,
  routing,
});

export default App;
