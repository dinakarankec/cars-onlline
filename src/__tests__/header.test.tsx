import React from "react";
import { render } from "@testing-library/react";
import Header from "./../components/Header";
import { BrowserRouter } from "react-router-dom";

test("Renders the Header", async () => {
  const { getByTestId } = render(
    <BrowserRouter>
      <Header />
    </BrowserRouter>
  );

  /**
   * Validating the header Component
   */
  const header = getByTestId("header");
  const link = getByTestId("home-link");

  expect(header).toBeInTheDocument();
  expect(link).toBeInTheDocument();
});
