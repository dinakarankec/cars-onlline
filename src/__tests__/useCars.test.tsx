import { renderHook, act } from "@testing-library/react-hooks";
import useCars from "../hooks/useCars";
import CarsProvider from "../contexts/CarsContext";

const carsResponse = {
  cars: [
    {
      stockNumber: 10099,
      manufacturerName: "Dodge",
      modelName: "Caliber",
      color: "green",
      mileage: {
        number: 128799,
        unit: "km",
      },
      fuelType: "Diesel",
      pictureUrl: "https://auto1-js-task-api--mufasa71.repl.co/images/car.svg",
    },
    {
      stockNumber: 10463,
      manufacturerName: "Porsche",
      modelName: "918 Spyder",
      color: "blue",
      mileage: {
        number: 178184,
        unit: "km",
      },
      fuelType: "Petrol",
      pictureUrl: "https://auto1-js-task-api--mufasa71.repl.co/images/car.svg",
    },
  ],
  totalPageCount: 100,
  totalCarsCount: 1000,
};

test("Renders the useCars hook", () => {
  const initialState = {
    isFetching: false,
    list: [],
    page: 1,
    totalCarsCount: 0,
    totalPageCount: 0,
  };

  const { result } = renderHook(() => useCars(), {
    wrapper: ({ children }) => <CarsProvider>{children}</CarsProvider>,
  });

  expect(result.current.state).toStrictEqual(initialState);

  act(() => {
    result.current.dispatch({
      type: "app/modules/cars/IS_FETCHING",
    });
  });

  expect(result.current.state.isFetching).toBe(true);

  act(() => {
    result.current.dispatch({
      type: "app/modules/cars/RECEIVE_CARS",
      page: 10,
      payload: carsResponse,
    });
  });

  expect(result.current.state.isFetching).toBe(false);
  expect(result.current.state.list.length).toBe(carsResponse.cars.length);
  expect(result.current.state.totalCarsCount).toBe(carsResponse.totalCarsCount);
  expect(result.current.state.totalPageCount).toBe(carsResponse.totalPageCount);
  expect(result.current.state.page).toBe(10);
});
