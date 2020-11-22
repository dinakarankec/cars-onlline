import React from "react";
import { fireEvent, render } from "@testing-library/react";
import Pagination from "../components/Pagination";

test("Renders the Pagination", async () => {
  const { getByTestId, getByText } = render(
    <Pagination page={1} totalPages={10} onPageChange={() => {}} />
  );

  /**
   * Validating the Pagination component
   */
  const pagination = getByTestId("pagination");
  const pageInfo = getByText(`Page 1 of 10`);

  expect(pagination).toBeInTheDocument();
  expect(pageInfo).toBeInTheDocument();
});

test("Verifies the Buttons disabled", async () => {
  const { getByText } = render(
    <Pagination page={1} totalPages={1} onPageChange={() => {}} />
  );

  const first = getByText(`First`);
  const previous = getByText(`Previous`);
  const last = getByText(`Last`);
  const next = getByText(`Next`);

  expect(first).toHaveAttribute("disabled");
  expect(previous).toHaveAttribute("disabled");
  expect(last).toHaveAttribute("disabled");
  expect(next).toHaveAttribute("disabled");
});

test("Verifies the previous Buttons disabled", async () => {
  const { getByText } = render(
    <Pagination page={1} totalPages={10} onPageChange={() => {}} />
  );

  const first = getByText(`First`);
  const previous = getByText(`Previous`);

  expect(first).toHaveAttribute("disabled");
  expect(previous).toHaveAttribute("disabled");
});

test("Verifies the next Buttons disabled", async () => {
  const { getByText } = render(
    <Pagination page={10} totalPages={10} onPageChange={() => {}} />
  );

  const last = getByText(`Last`);
  const next = getByText(`Next`);

  expect(last).toHaveAttribute("disabled");
  expect(next).toHaveAttribute("disabled");
});

test("Verifies the on Page change - last", async () => {
  const mockFunction = jest.fn();
  const { getByText } = render(
    <Pagination
      page={1}
      totalPages={10}
      onPageChange={(page: number) => mockFunction(page)}
    />
  );

  fireEvent(
    getByText("Last"),
    new MouseEvent("click", {
      bubbles: true,
      cancelable: true,
    })
  );

  expect(mockFunction.mock.calls.length).toBe(1);
  expect(mockFunction.mock.calls[0][0]).toBe(10);
});

test("Verifies the on Page change - First", async () => {
  const mockFunction = jest.fn();
  const { getByText } = render(
    <Pagination
      page={10}
      totalPages={10}
      onPageChange={(page: number) => mockFunction(page)}
    />
  );

  fireEvent(
    getByText("First"),
    new MouseEvent("click", {
      bubbles: true,
      cancelable: true,
    })
  );

  expect(mockFunction.mock.calls.length).toBe(1);
  expect(mockFunction.mock.calls[0][0]).toBe(1);
});

test("Verifies the on Page change - Next", async () => {
  const mockFunction = jest.fn();
  const { getByText } = render(
    <Pagination
      page={5}
      totalPages={10}
      onPageChange={(page: number) => mockFunction(page)}
    />
  );

  fireEvent(
    getByText("Next"),
    new MouseEvent("click", {
      bubbles: true,
      cancelable: true,
    })
  );

  expect(mockFunction.mock.calls.length).toBe(1);
  expect(mockFunction.mock.calls[0][0]).toBe(6);
});

test("Verifies the on Page change - Previous", async () => {
  const mockFunction = jest.fn();
  const { getByText } = render(
    <Pagination
      page={5}
      totalPages={10}
      onPageChange={(page: number) => mockFunction(page)}
    />
  );

  fireEvent(
    getByText("Previous"),
    new MouseEvent("click", {
      bubbles: true,
      cancelable: true,
    })
  );

  expect(mockFunction.mock.calls.length).toBe(1);
  expect(mockFunction.mock.calls[0][0]).toBe(4);
});
