import React from "react";
import "./App.css";
import "normalize.css";
import { MainContainer, StyledLink } from "./components/styled";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";

function App() {
  return (
    <BrowserRouter>
      <MainContainer>
        <Header />
        <Switch>
          <Route
            exact
            path="/"
            render={() => {
              return (
                <div>
                  Home <StyledLink to="/detail">Go to Detail Page</StyledLink>
                </div>
              );
            }}
          />
          <Route
            path="/detail"
            render={() => {
              return <div>Home Page </div>;
            }}
          />
        </Switch>
      </MainContainer>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
