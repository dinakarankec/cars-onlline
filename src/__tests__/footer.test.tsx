import React from "react";
import { render } from "@testing-library/react";
import Footer from "./../components/Footer";

test("Renders the Footer", async () => {
  const { getByTestId, getByText } = render(<Footer />);

  /**
   * Validating the Footer component
   */
  const footer = getByTestId("footer");
  const dateElem = getByText(`AUTO1 Group ${new Date().getFullYear()}`);

  expect(footer).toBeInTheDocument();
  expect(dateElem).toBeInTheDocument();
});
