import React, { Component } from "react";
import { Provider } from "react-redux";
import { Router } from "react-router";

import routes from "../routes/";

class Root extends Component<{ store: Redux.Store, history: ReactRouter.History }, any> {
  render() {
    let { store, history } = this.props;
    return (
      <Provider store={store}>
        <Router history={history}>
        {(() => {
          // switch routes here based on role/events/state
          return routes;
        })()}
        </Router>
      </Provider>
    );
  }
}

export default Root;
