import React from "react";
import { render, fireEvent, findByText } from "@testing-library/react";
import Filter from "./../components/Filter";
import { FilterContext } from "../contexts/FilterContext";

test("Renders the Filter", () => {
  const { getByText } = render(<Filter />);

  expect(getByText("Filter")).toBeInTheDocument();
});

test("Validates the Filter Action", async () => {
  const filter = {
    sort: "asc",
    manufacturer: "Fiat",
    color: "red",
  };

  const mockFunction = jest.fn();
  const { getByText, container } = render(
    <FilterContext.Provider
      value={{
        setFilter: mockFunction as any,
        filter,
      }}
    >
      <Filter />
    </FilterContext.Provider>
  );
  await findByText(container, /^Mileage - Ascending/);

  fireEvent(
    getByText("Filter"),
    new MouseEvent("click", {
      bubbles: true,
      cancelable: true,
    })
  );

  expect(mockFunction.mock.calls.length).toBe(1);
  expect(mockFunction.mock.calls[0][0].sort).toBe(filter.sort);
  expect(mockFunction.mock.calls[0][0].color).toBe(filter.color);
  expect(mockFunction.mock.calls[0][0].manufacturer).toBe(filter.manufacturer);
});
