import React from "react";
import { useRouteMatch } from "react-router-dom";
import styled from "styled-components";
import Filter from "./Filter";
import Pagination from "./Pagination";
import Skeleton from "./Skeleton";
import { colors, Grid, Main, StyledLink } from "./styled";

export const CarsWrapper = styled.div`
  width: 100%;
  .title {
    margin-bottom: 10px;
  }
  .results-count {
    margin-bottom: 24px;
  }
`;

export const Cars = styled.ul`
  margin-bottom: 12px;
`;

export const Item = styled.li`
  padding: 12px;
  width: 100%;
  border: 1px solid ${colors.light};
  margin-bottom: 12px;
  .car-image {
    width: 100px;
    height: 80px;
    background-color: ${colors.light};
  }
  .car-info {
    margin-left: 24px;

    .info {
      margin-bottom: 8px;
    }
  }
`;

const CarListItem: React.FC<any> = () => {
  const match = useRouteMatch();
  return (
    <Item>
      <Grid>
        <div className="car-image" />
        <div className="car-info">
          <div className="medium bold info">Chrysler Crossfire</div>
          <div className="small info">
            {`Stock # ${623434} - ${152.264}KM - ${"Petrol"} - ${"Yellow"}`}
          </div>
          <div>
            <StyledLink to={`${match.url}/details/24`}>View Details</StyledLink>
          </div>
        </div>
      </Grid>
    </Item>
  );
};

const CarList: React.FC<any> = () => {
  return (
    <Main>
      <Filter />
      <CarsWrapper>
        <div className="title medium bold">Available Cars</div>
        <div className="results-count medium">Showing 10 of 100 results</div>
        <Cars>
          <Skeleton />
          <CarListItem />
          <CarListItem />
          <CarListItem />
          <CarListItem />
          <CarListItem />
          <CarListItem />
        </Cars>
        <Grid justify="center">
          <Pagination />
        </Grid>
      </CarsWrapper>
    </Main>
  );
};

export default CarList;
