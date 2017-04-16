import styled from "styled-components";
import * as Color from "color";
import { NavLink } from "react-router-dom";
import {
  font,
  color,
} from "../../../../styles";

const activeClassName = "active";

export let StyledLink = styled(NavLink)`
  color: ${color.link};
  text-decoration: none;

  &:first-child { margin-left: 0px }
  margin-left: ${font.size / 2}px;
  padding: ${font.size / 2}px 0px;

  display: inline-block;

  &:hover {
    color: ${color.linkHover};
    text-decoration: none;
  }
  &:visited {
    color: ${color.link};
  }
  &.${props => props.activeClassName} {
    font-weight: bold;
  }
`;

StyledLink.defaultProps = {
  activeClassName,
};
