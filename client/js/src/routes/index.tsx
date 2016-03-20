import React from "react";
import { Route, IndexRoute } from "react-router";

import Base from "../page/base";
import Home from "../page/home/"

export let routes = (
  <Route path="/" component={Base}>
    <IndexRoute component={Home}/>
  </Route>
);

export default routes;
