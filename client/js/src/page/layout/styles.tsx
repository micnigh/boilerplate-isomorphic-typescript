import styled from "styled-components";
import * as Color from "color";

import { color, font } from "../../styles";

export let Container = styled.div`
  color: ${color.text};
  font-size: ${font.size}px;
  font-family: ${font.family};
  font-weight: 400;
  line-height: 24px;

  max-width: 800px;
  margin: 0 auto;
  padding: 0em 1em;
`;
