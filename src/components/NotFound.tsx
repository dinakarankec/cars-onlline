import React from "react";
import { RouteComponentProps } from "react-router-dom";
import styled from "styled-components";
import { Grid, StyledLink } from "./styled";
import Logo from "../assets/logo.png";

const NotFoundWrapper = styled.main`
  height: calc(100vh - 160px);
  .not-found-info {
    height: 100%;
    img {
      height: 32px;
    }
    div {
      margin-bottom: 24px;
    }
  }
`;

const NotFound: React.FC<RouteComponentProps> = () => {
  return (
    <NotFoundWrapper data-testid="404-not-found">
      <Grid
        className="not-found-info"
        justify="center"
        alignItems="center"
        direction="column"
      >
        <div>
          <img src={Logo} alt="Auto1" />
        </div>
        <div className="large">404 - Not Found</div>
        <div className="medium">
          Sorry, the page you looking for does not exist.{" "}
        </div>
        <div className="medium">
          You can always go back to the home{" "}
          <StyledLink to="/">homepage</StyledLink>
        </div>
      </Grid>
    </NotFoundWrapper>
  );
};

export default NotFound;
