import * as React from "react";
import styled from "styled-components";
import Grid from "grid-styled";

import { Container, RowElement } from "./styles";

export class Home extends React.Component<any, any> {
  render() {
    return (
      <Container>
        <Grid xs={1} sm={1 / 2} lg={1 / 3}>
          <RowElement>
            <span>Home Content 1</span>
          </RowElement>
        </Grid>
        <Grid xs={1} sm={1 / 2}  lg={1 / 3}>
          <RowElement>
            <span>Home Content 2</span>
          </RowElement>
        </Grid>
        <Grid xs={1} sm={1 / 2}  lg={1 / 3}>
          <RowElement>
            <span>Home Content 3</span>
          </RowElement>
        </Grid>
      </Container>
    );
  }
}

export default Home;
