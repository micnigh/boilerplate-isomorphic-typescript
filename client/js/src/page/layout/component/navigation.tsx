import * as React from "react";
import { Link } from "react-router-dom";

let activeClassName = "current active";

export class Navigation extends React.Component<any, any> {
  render() {
    return (
      <div className="navigation" onClick={this.props.onNavigationClick}>
        <ul className="menu">
          <Link to="/" className="menuItem">Home</Link>
          <Link to="/about" className="menuItem">About</Link>
        </ul>
      </div>
    );
  }
}

export default Navigation;
