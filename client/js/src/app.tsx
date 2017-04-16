import * as React from "react";
import {
  Route,
  match,
} from "react-router-dom";

import PageLayout from "./page/layout/";
import Home from "./page/home";
import About from "./page/about";

export class App extends React.Component<any, any> {
  render() {
    return (
      <PageLayout>
        <Route exact path="/" component={Home}/>
        <Route exact path="/about" component={About}/>
      </PageLayout>
    );
  }
}

export default App;
