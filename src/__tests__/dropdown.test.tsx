import React from "react";
import { findByText, fireEvent, render } from "@testing-library/react";
import Dropdown from "./../components/Dropdown";
import { Option } from "../typings";

test("Verifies the dropdown component", async () => {
  const mockFunction = jest.fn();
  const { getByTestId } = render(
    <Dropdown
      options={[
        { value: "sample", label: "Sample" },
        { value: "sample1", label: "Sample1" },
      ]}
      value="sample"
      onChange={(value: Option) => mockFunction()}
    />
  );

  /**
   * Validating the selected label
   */
  const mainElement = getByTestId("dropdown-control");
  expect(await findByText(mainElement, /^Sample/)).toBeVisible();

  /**
   * Validating the Dropdown open
   */
  fireEvent(
    getByTestId("dropdown"),
    new MouseEvent("click", {
      bubbles: true,
      cancelable: true,
    })
  );
  const options = getByTestId("dropdown-options");
  expect(options).toBeInTheDocument();

  /**
   * Validating the onChange event and Dropdown hide
   */
  fireEvent(
    options.childNodes[1],
    new MouseEvent("click", {
      bubbles: true,
      cancelable: true,
    })
  );

  expect(mockFunction.mock.calls.length).toBe(1);
  expect(options).not.toBeInTheDocument();
});
