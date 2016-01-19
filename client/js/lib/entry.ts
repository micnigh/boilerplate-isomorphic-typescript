import * as React from "react";
import * as ReactDOM from "react-dom";
import * as _ from "lodash";

window[`${_.camelCase("react")}`] = React;
window[`${_.camelCase("react-dom")}`] = ReactDOM;
window[`${_.camelCase("lodash")}`] = _;
