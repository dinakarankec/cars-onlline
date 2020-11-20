import React from "react";
import styled from "styled-components";
import { colors, Grid } from "./styled";
import logo from "./../assets/logo.png";
import { Link } from "react-router-dom";

const HeaderUI = styled.header`
  height: 80px;
  padding: 24px;
  border-bottom: 1px solid ${colors.light};
  .logo {
    height: 32px;
  }
  .nav-link {
    margin: 0px 12px;
  }
`;

const Header: React.FC<{}> = () => {
  return (
    <HeaderUI>
      <Grid justify="space-between">
        <Link to="/">
          <img className="logo" src={logo} alt="Auto1" />
        </Link>
        <Grid alignItems="center">
          <div className="nav-link medium">Purchase</div>
          <div className="nav-link medium">My Orders</div>
          <div className="nav-link medium">Sell</div>
        </Grid>
      </Grid>
    </HeaderUI>
  );
};

export default Header;
