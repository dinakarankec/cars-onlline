import React from "react";
import styled, { createGlobalStyle } from "styled-components";
import { Link } from "react-router-dom";

export const colors = {
  white: "#FFFFFF",
  light: "#EDEDED",
  dark: "#4A4A4A",
  primary: "#EA7F28",
  accent: "#D37324",
};

export type Color = "light" | "dark" | "primary" | "accent" | "white";

export const Button = styled.button`
  border-radius: 3px;
  padding: 8px 0px;
  font-size: 14px;
  min-width: 128px;
  height: 32px;
  text-align: center;
  cursor: pointer;

  border: 1px solid ${colors.primary};
  background-color: ${colors.primary};
  color: ${colors.light};

  &:active {
    border: 1px solid ${colors.accent};
    background-color: ${colors.accent};
  }
`;

export const StyledLink = styled(Link)`
  color: ${colors.primary};
  text-decoration: none;

  &:active {
    color: ${colors.primary};
  }

  &:hover {
    text-decoration: underline;
  }
`;

export const GlobalCSS = createGlobalStyle`
  html {
    background-color: ${colors.white};
    height: 100%;

    body, body #root {
      height: 100%;
    }
  }
  .large {
    font-size: 32px;
    line-height: 48px;
    font-weight: bold;
  }

  .medium {
    font-size: 18px;
    line-height: 24px;

    &.bold {
      font-weight: bold;
    }
  }

  .small {
    font-size: 14px;
    line-height: 21px;
  }

  .x-small {
    font-size: 12px;
    line-height: 18px;
  }
`;

type AlignItems =
  | "baseline"
  | "center"
  | "end"
  | "flex-end"
  | "flex-start"
  | "inherit"
  | "initial"
  | "left"
  | "normal"
  | "right"
  | "safe"
  | "self-end"
  | "self-start"
  | "start"
  | "stretch";

type JustifyContent =
  | "baseline"
  | "center"
  | "end"
  | "flex-end"
  | "flex-start"
  | "inherit"
  | "initial"
  | "left"
  | "normal"
  | "right"
  | "safe"
  | "space-around"
  | "space-between"
  | "space-evenly"
  | "start"
  | "stretch";

interface GridProps extends React.HTMLAttributes<HTMLDivElement> {
  grow?: boolean;
  shrink?: boolean;
  flex?: number | string;
  wrap?: "wrap" | "nowrap";
  direction?: "row" | "column";
  justify?: JustifyContent;
  alignItems?: AlignItems;
  basis?: string;
}

const StyledGrid = styled.div<GridProps>`
  display: flex;
  ${({ wrap, direction, justify, alignItems }: GridProps) =>
    `
        flex-wrap: ${wrap};
        flex-direction: ${direction};
        justify-content: ${justify || "unset"};
        align-items: ${alignItems || "unset"};
    `}
  flex-grow: ${({ grow }: GridProps) => (grow ? 1 : "unset")};
  flex-shrink: ${({ shrink }: GridProps) => (shrink ? 1 : "unset")};
  flex-basis: ${({ basis }: GridProps) => basis};
  ${({ flex }: GridProps) =>
    flex &&
    `
        flex: ${flex};
    `}
`;

export const Grid: React.FC<GridProps> = ({
  children,
  className = "",
  direction = "row",
  wrap,
  basis,
  ...props
}) => {
  return (
    <StyledGrid
      className={className}
      direction={direction}
      basis={basis}
      wrap={wrap}
      {...props}
    >
      {children}
    </StyledGrid>
  );
};

export const MainContainer = styled.div`
  min-height: 100%;
  padding-bottom: -80px;
  margin-bottom: -80px;
`;
