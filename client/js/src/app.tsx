import * as React from "react";
import * as ReactDOM from "react-dom";
import * as _ from "lodash";

import HelloWorld from "./component/HelloWorld";

console.log(React);

console.log(_.camelCase("react-dom"));

let renderComponent = ReactDOM.render((
  <div>
    <h1>{`Hello World - ${HelloWorld}`}</h1>
  </div>
), document.getElementById("content"));

console.log("helloworld");

export default renderComponent;
