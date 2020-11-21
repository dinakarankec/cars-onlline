import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";

test("Renders the App", () => {
  render(<App />);
  const mainElement = screen.getByTestId("app");
  expect(mainElement).toBeInTheDocument();
});
