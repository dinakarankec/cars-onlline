import React from "react";
import { render } from "@testing-library/react";
import App from "./App";
import { BrowserRouter } from "react-router-dom";

test("Renders the App", () => {
  const { getByTestId } = render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
  const mainElement = getByTestId("app");
  expect(mainElement).toBeInTheDocument();
});
