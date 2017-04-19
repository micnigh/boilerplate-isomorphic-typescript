import styled, { injectGlobal } from "styled-components";
import * as Color from "color";
import * as reset from "css-wipe/js";

export let font = {
  size: 16,
  family: `Roboto, Helvetica, Arial, sans-serif`,
  color: `#000`,
};

export let fixedFont = {
  family: "monospace",
  size: 14,
  lineHeight: 24,
};

export let heading = {
  family: font.family,
  weight: 900,
};

let color = {
  primary: `#224488`,
  secondary: `#228844`,
  text: `#000`,
  quiet: `#333`,
  loud: `#000`,
  link: `#2240c2`,
};
let generatedColor = {...color, ...{
  linkHover: Color(color.link).lighten(0.15).toString(),
}};
export { generatedColor as color };

injectGlobal`
  ${reset}
`;
