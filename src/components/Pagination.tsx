import React from "react";
import styled from "styled-components";
import { LinkButton } from "./styled";

const ButtonWrapper = styled.div`
  margin: 0px 12px;
`;

const Pagination: React.FC<any> = () => {
  return (
    <>
      <ButtonWrapper>
        <LinkButton>First</LinkButton>
      </ButtonWrapper>
      <ButtonWrapper>
        <LinkButton>Previous</LinkButton>
      </ButtonWrapper>
      <ButtonWrapper>
        <div className="small">Page 2 of 10</div>
      </ButtonWrapper>
      <ButtonWrapper>
        <LinkButton>Next</LinkButton>
      </ButtonWrapper>
      <ButtonWrapper>
        <LinkButton>Last</LinkButton>
      </ButtonWrapper>
    </>
  );
};

export default Pagination;
