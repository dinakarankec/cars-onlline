import React from "react";
import "./App.css";
import "normalize.css";
import "./assets/style.css";
import { MainContainer } from "./components/styled";
import {
  BrowserRouter,
  Redirect,
  Route,
  RouteComponentProps,
  Switch,
} from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import CarsContainer from "./containers/CarsContainer";
import NotFound from "./components/NotFound";
import CarsProvider from "./contexts/CarsContext";
import FilterProvider from "./contexts/FilterContext";
import FavouritesProvider from "./contexts/FavouritesContext";

function App() {
  return (
    <BrowserRouter>
      <MainContainer data-testid="app">
        <Header />
        <Switch>
          <Route
            exact
            path="/"
            render={() => {
              return <Redirect to="/cars" />;
            }}
          />
          <Route
            path="/cars"
            render={(routeProps: RouteComponentProps) => {
              return (
                <CarsProvider>
                  <FilterProvider>
                    <FavouritesProvider>
                      <CarsContainer {...routeProps} />;
                    </FavouritesProvider>
                  </FilterProvider>
                </CarsProvider>
              );
            }}
          />
          <Route
            exact
            path="/404"
            render={(routeProps: RouteComponentProps) => (
              <NotFound {...routeProps} />
            )}
          />
          <Route render={() => <Redirect to="/404" />} />
        </Switch>
      </MainContainer>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
