import * as React from "react";

import { baseUrl } from "../../../../app";

import { StyledLink } from "./styles";

export class Navigation extends React.Component<any, any> {
  render() {
    return (
      <div onClick={this.props.onNavigationClick}>
        <ul>
          <StyledLink to={`${baseUrl}`} exact={true}>Home</StyledLink>
          <StyledLink to={`${baseUrl}about/`}>About</StyledLink>
        </ul>
      </div>
    );
  }
}

export default Navigation;
