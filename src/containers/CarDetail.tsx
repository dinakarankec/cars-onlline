import React, { useEffect, useState } from "react";
import { RouteComponentProps } from "react-router-dom";
import styled from "styled-components";
import { CarSpec } from "../components/Cars";
import { Button, colors, Grid } from "../components/styled";
import { API_HOST } from "../Contants";
import { Car } from "../modules/cars";
import Favourite from "./../components/Favourite";
import useFavourites from "./../hooks/useFavourites";

type ParamType = {
  stockNumber: string;
};

const CoverImage = styled(Grid)`
  height: 400px;
  background-color: ${colors.light};

  img {
    height: 400px;
  }
`;

const ContentWrapper = styled.div`
  max-width: 800px;
  margin: auto;
  padding: 24px;

  .car-info,
  .add-to-fav {
    width: 50%;
  }

  .fav-popup {
    padding: 24px;
    border: 1px solid ${colors.light};
    width: 300px;
    height: 145px;
  }

  .info {
    margin-bottom: 24px;
  }
`;

const CarDetail: React.FC<RouteComponentProps> = ({ match }) => {
  const { stockNumber } = match.params as ParamType;

  const [car, setCar] = useState<Car | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const { addToFavourites, isFavourite } = useFavourites();

  useEffect(() => {
    setLoading(true);
    fetch(`${API_HOST}/cars/${stockNumber}`)
      .then((resp: Response) => resp.json())
      .then((fetchedCar: { car: Car }) => {
        setLoading(false);
        setCar(fetchedCar.car);
      })
      .catch((err) => {
        setLoading(false);
        setError("Error in loading the car!!");
      });
  }, [stockNumber]);

  return (
    <>
      {loading && <CoverImage />}
      {!loading && car && (
        <CoverImage alignItems="center" justify="center">
          <img src={car.pictureUrl} alt="car" />
        </CoverImage>
      )}
      <ContentWrapper data-testid="car-detail">
        {!loading && car && (
          <Grid>
            <Grid className="car-info" direction="column">
              <div className="info large">
                {car.modelName} <Favourite stockNumber={stockNumber} />
              </div>
              <div className="info medium">
                <CarSpec car={car} />
              </div>
              <div className="small">
                The car is currently available and can be delivered as soon as
                tomorrow morning. Please be aware that the delivery times shown
                in this page are not definitive and may change due to bad
                weather conditions.
              </div>
            </Grid>

            <Grid className="add-to-fav" justify="center">
              {!isFavourite(stockNumber) && (
                <Grid className="fav-popup" direction="column">
                  <div className="small">
                    If you like this car, click the button and save it in your
                    collection of favourite items.
                  </div>
                  <Grid justify="flex-end" alignItems="flex-end">
                    <Button onClick={() => addToFavourites(stockNumber)}>
                      Save
                    </Button>
                  </Grid>
                </Grid>
              )}
            </Grid>
          </Grid>
        )}
        {!loading && !car && error && (
          <Grid justify="center" className="large">
            {error}
          </Grid>
        )}
      </ContentWrapper>
    </>
  );
};

export default CarDetail;
