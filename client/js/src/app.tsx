import * as React from "react";
import {
  Route,
  match,
} from "react-router-dom";

import { ThemeProvider } from "styled-components";

import PageLayout from "./page/layout/";
import Home from "./page/home";
import About from "./page/about";

export class App extends React.Component<any, any> {
  render() {
    return (
      <ThemeProvider theme={{
        gutter: 0,
        breakpoints: {
          small: `32em`,
          medium: `48em`,
          large: `64em`,
        }
      }}>
        <PageLayout>
          <Route exact path="/" component={Home}/>
          <Route exact path="/about" component={About}/>
        </PageLayout>
      </ThemeProvider>
    );
  }
}

export default App;
