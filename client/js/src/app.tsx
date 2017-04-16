import * as React from "react";
import {
  Route,
  match,
} from "react-router-dom";

import Base from "./page/base/";
import Home from "./page/home";
import About from "./page/about";

export class App extends React.Component<any, any> {
  render() {
    return (
      <Base>
        <Route exact path="/" component={Home}/>
        <Route exact path="/about" component={About}/>
      </Base>
    );
  }
}

export default App;
