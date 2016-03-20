import React, { Component } from "react";
import { Link, IndexLink } from "react-router";

let activeClassName = "current active";

export class Navigation extends Component<any, any> {
  render() {
    return (
      <div className="navigation" onClick={this.props.onNavigationClick}>
        <ul className="menu">
          <IndexLink to="/" className="menuItem" activeClassName={activeClassName}>
            Home
          </IndexLink>
        </ul>
      </div>
    );
  }
};

export default Navigation;
