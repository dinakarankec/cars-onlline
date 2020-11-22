import React from "react";
import styled from "styled-components";
import { Grid, LinkButton } from "./styled";

const ButtonWrapper = styled.div`
  margin: 0px 12px;
`;

type PaginationProps = {
  page: number;
  totalPages: number;
  onPageChange(page: number): void;
};

const Pagination: React.FC<PaginationProps> = ({
  page,
  totalPages,
  onPageChange,
}) => {
  return (
    <Grid data-testid="pagination">
      <ButtonWrapper>
        <LinkButton onClick={() => onPageChange(1)} disabled={page === 1}>
          First
        </LinkButton>
      </ButtonWrapper>
      <ButtonWrapper>
        <LinkButton
          onClick={() => onPageChange(page - 1)}
          disabled={page === 1}
        >
          Previous
        </LinkButton>
      </ButtonWrapper>
      <ButtonWrapper>
        <div className="small">
          Page {page} of {totalPages}
        </div>
      </ButtonWrapper>
      <ButtonWrapper>
        <LinkButton
          onClick={() => onPageChange(page + 1)}
          disabled={page === totalPages}
        >
          Next
        </LinkButton>
      </ButtonWrapper>
      <ButtonWrapper>
        <LinkButton
          onClick={() => onPageChange(totalPages)}
          disabled={page === totalPages}
        >
          Last
        </LinkButton>
      </ButtonWrapper>
    </Grid>
  );
};

export default Pagination;
