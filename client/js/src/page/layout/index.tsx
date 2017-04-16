import * as React from "react";

import Navigation from "./component/navigation/";
import { Container } from "./styles";

export class PageLayout extends React.Component<any, any> {
  render() {
    return (
      <Container>
        <Navigation/>
        <div className="content">
          { this.props.children }
        </div>
        <div className="footer"/>
      </Container>
    );
  }
}

export default PageLayout;
