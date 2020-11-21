import React, { useEffect } from "react";
import CarList from "../components/Cars";
import { Redirect, Route, RouteComponentProps, Switch } from "react-router-dom";
import CarDetail from "./CarDetail";
import useCars from "./../hooks/useCars";
import { fetchCars } from "../modules/cars";
import useFilter from "./../hooks/useFilter";

const CarsContainer: React.FC<RouteComponentProps> = ({ match, location }) => {
  const { dispatch } = useCars();
  const { filter } = useFilter();

  useEffect(() => {
    fetchCars({ ...filter, page: 1 })(dispatch);
  }, [dispatch, filter]);

  return (
    <Switch location={location}>
      <Route
        exact
        path={match.url}
        render={(routeProps: RouteComponentProps) => (
          <CarList {...routeProps} />
        )}
      />
      <Route
        path={`${match.url}/details/:stockNumber`}
        render={(routeProps: RouteComponentProps) => (
          <CarDetail {...routeProps} />
        )}
      />
      <Route render={() => <Redirect to="/404" />} />
    </Switch>
  );
};

export default CarsContainer;
