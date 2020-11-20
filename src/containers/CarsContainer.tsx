import React from "react";
import CarList from "../components/Cars";
import { Redirect, Route, RouteComponentProps, Switch } from "react-router-dom";
import CarDetail from "./CarDetail";

const CarsContainer: React.FC<RouteComponentProps> = ({ match, location }) => {
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
