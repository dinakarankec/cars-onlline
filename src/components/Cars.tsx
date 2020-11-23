import React, { useCallback } from "react";
import { RouteComponentProps, useRouteMatch } from "react-router-dom";
import styled from "styled-components";
import Filter from "./Filter";
import Pagination from "./Pagination";
import Skeleton from "./Skeleton";
import { colors, Grid, Main, StyledLink } from "./styled";
import useFilter from "./../hooks/useFilter";
import useCars from "./../hooks/useCars";
import { fetchCars, Car } from "../modules/cars";
import Favourite from "./Favourite";

export const CarsWrapper = styled.div`
  width: 100%;
  .title {
    margin-bottom: 12px;
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
    border: 1px solid ${colors.dark};
    img {
      width: 100px;
      height: 80px;
    }
    /* background-color: ${colors.light}; */
  }
  .car-info {
    margin-left: 24px;
    .info {
      margin-bottom: 8px;
    }
  }
`;

const CarSpecWrapper = styled(Grid)`
  .seperator {
    margin-left: 8px;
    margin-right: 8px;
  }
  .mileage-unit {
    text-transform: uppercase;
    margin-left: 8px;
  }
  .color {
    text-transform: capitalize;
  }
`;

export const CarSpec: React.FC<{ car: Car }> = ({ car }) => {
  return (
    <CarSpecWrapper data-testid="car-spec">
      <>{`Stock # ${car.stockNumber}`}</>
      <span className="seperator">-</span>
      <>{`${car.mileage.number}`}</>
      <span className="mileage-unit">{`${car.mileage.unit}`}</span>
      <span className="seperator">-</span>
      <>{`${car.fuelType}`}</>
      <span className="seperator">-</span>
      <span className="color">{`${car.color}`}</span>
    </CarSpecWrapper>
  );
};

type CarListItemProps = {
  car: Car;
};

export const CarListItem: React.FC<CarListItemProps> = ({ car }) => {
  const match = useRouteMatch();
  return (
    <Item data-testid="car-list-item">
      <Grid>
        <div className="car-image">
          <img src={car.pictureUrl} alt="Car" />
        </div>
        <div className="car-info">
          <div className="medium bold info">
            {car.modelName}
            <Favourite stockNumber={car.stockNumber.toString()} />
          </div>
          <Grid className="small info">
            <CarSpec car={car} />
          </Grid>
          <div>
            <StyledLink to={`${match.url}/details/${car.stockNumber}`}>
              View Details
            </StyledLink>
          </div>
        </div>
      </Grid>
    </Item>
  );
};

const CarList: React.FC<RouteComponentProps> = () => {
  const { filter } = useFilter();
  const {
    state: { isFetching, totalCarsCount, page, list, totalPageCount },
    dispatch,
  } = useCars();

  const getCars = useCallback(
    (page: number) => {
      fetchCars({
        ...filter,
        page,
      })(dispatch);
    },
    [filter, dispatch]
  );

  return (
    <Main data-testid="cars">
      <Filter />
      <CarsWrapper>
        {isFetching ? (
          <Skeleton />
        ) : (
          <>
            {totalCarsCount === 0 && (
              <div className="title medium bold">No Cars Available</div>
            )}

            {totalCarsCount > 0 && (
              <>
                <div className="title medium bold">Available Cars</div>
                <div className="results-count medium">
                  Showing {list.length} of {totalCarsCount} results
                </div>
                <Cars>
                  {list.map((car: Car) => (
                    <CarListItem key={car.stockNumber} car={car} />
                  ))}
                </Cars>
                <Grid justify="center">
                  <Pagination
                    page={page}
                    totalPages={totalPageCount}
                    onPageChange={getCars}
                  />
                </Grid>
              </>
            )}
          </>
        )}
      </CarsWrapper>
    </Main>
  );
};

export default CarList;
