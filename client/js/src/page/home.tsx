import * as React from "react";
import styled from "styled-components";
import Grid from "grid-styled";

export class Home extends React.Component<any, any> {
  render() {
    let Container = styled.div`
      background-color: #ffaaaa;
    `;

    return (
      <Container>
        <Grid xs={1} sm={1 / 2} lg={1 / 3}>
          <span>Home Content 1</span>
        </Grid>
        <Grid xs={1} sm={1 / 2}  lg={1 / 3}>
          <span>Home Content 2</span>
        </Grid>
        <Grid xs={1} sm={1 / 2}  lg={1 / 3}>
          <span>Home Content 3</span>
        </Grid>
      </Container>
    );
  }
}

export default Home;
