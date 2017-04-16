import * as React from "react";
import styled from "styled-components";

export class About extends React.Component<any, any> {
  render() {
    let Container = styled.div`
      background-color: #aaffaa;
    `;

    return (
      <Container>
        <span>About Content</span>
      </Container>
    );
  }
}

export default About;
