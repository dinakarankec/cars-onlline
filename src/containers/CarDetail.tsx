import React from "react";
import { RouteComponentProps } from "react-router-dom";
import styled from "styled-components";
import { Button, colors, Grid, Main } from "../components/styled";

type ParamType = {
  stockNumber: string;
};

const CoverImage = styled.div`
  height: 400px;
  background-color: ${colors.light};
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
  return (
    <>
      <CoverImage />
      <ContentWrapper>
        <Grid>
          <Grid className="car-info" direction="column">
            <div className="info large">Chrysler Crossfire</div>
            <div className="info medium">{`Stock # ${23234} - ${345.453} - ${"Petrol"} - ${"Yellow"}`}</div>
            <div className="small">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book. It has
              survived not only five centuries
            </div>
          </Grid>
          <Grid className="add-to-fav" justify="center">
            <Grid className="fav-popup" direction="column">
              <div className="small">
                If you like this car, click the button and save it in your
                collection of favourite items
              </div>
              <Grid justify="flex-end" alignItems="flex-end">
                <Button>Save</Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </ContentWrapper>
    </>
  );
};

export default CarDetail;
