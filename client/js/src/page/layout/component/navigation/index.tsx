import * as React from "react";

import { StyledLink } from "./styles";

export class Navigation extends React.Component<any, any> {
  render() {
    return (
      <div onClick={this.props.onNavigationClick}>
        <ul>
          <StyledLink to="/" exact={true}>Home</StyledLink>
          <StyledLink to="/about">About</StyledLink>
        </ul>
      </div>
    );
  }
}

export default Navigation;
