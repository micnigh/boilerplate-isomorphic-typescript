import * as React from "react";
import * as ReactDOM from "react-dom";
import * as _ from "lodash";

window["React"] = React;
console.log(_.camelCase("react-dom"));

ReactDOM.render((
  <div>
    <h1>Hello World</h1>
  </div>
), document.getElementById("content"));

console.log("helloworld");
