import React from "react";
import { render } from "@testing-library/react";
import { CarListItem, CarSpec } from "./../components/Cars";
import { Car } from "../modules/cars";
import { BrowserRouter } from "react-router-dom";

const car: Car = {
  stockNumber: 87879,
  manufacturerName: "BMW",
  modelName: "Z1",
  color: "blue",
  mileage: {
    number: 100140,
    unit: "km",
  },
  fuelType: "Petrol",
  pictureUrl: "https://auto1-js-task-api--mufasa71.repl.co/images/car.svg",
};

test("Renders the Car List Item", async () => {
  const { getByTestId, getByText, getByAltText } = render(
    <BrowserRouter>
      <CarListItem car={car} />
    </BrowserRouter>
  );

  /**
   * Validating the Car List Item
   */
  const carListItem = getByTestId("car-list-item");
  const modelName = getByText(car.modelName);
  const image = getByAltText("Car");

  expect(carListItem).toBeInTheDocument();
  expect(modelName).toBeInTheDocument();
  expect(image.getAttribute("src")).toBe(car.pictureUrl);
});

test("Renders the Car's Specifications", async () => {
  const { getByTestId, getByText } = render(<CarSpec car={car} />);

  /**
   * Validating the Car List Item
   */
  const carSpec = getByTestId("car-spec");
  const color = getByText(car.color);
  const unit = getByText(car.mileage.unit);

  expect(carSpec).toBeInTheDocument();
  expect(color).toBeInTheDocument();
  expect(unit).toBeInTheDocument();
});
