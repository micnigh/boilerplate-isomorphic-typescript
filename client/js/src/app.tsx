import * as React from "react";
import {
  Route,
  match,
} from "react-router-dom";

import { ThemeProvider } from "styled-components";

import PageLayout from "./page/layout/";
import Home from "./page/home";
import About from "./page/about";

export let baseUrl = process.env.BASE_URL ? process.env.BASE_URL : "/";

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
          <Route exact path={`${baseUrl}`} component={Home}/>
          <Route exact path={`${baseUrl}about`} component={About}/>
        </PageLayout>
      </ThemeProvider>
    );
  }
}

export default App;
