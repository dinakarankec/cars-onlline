import React from "react";
import styled from "styled-components";
import { colors, Grid } from "./styled";

const FooterUI = styled.footer`
  border-top: 1px solid ${colors.light};
  height: 80px;
  .footer-wrapper {
    height: 100%;
  }
`;

const Footer: React.FC<{}> = () => {
  return (
    <FooterUI>
      <Grid className="footer-wrapper" justify="center" alignItems="center">
        &#169; AUTO1 Group {new Date().getFullYear()}
      </Grid>
    </FooterUI>
  );
};

export default Footer;
