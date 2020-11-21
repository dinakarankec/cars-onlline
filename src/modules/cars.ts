import { Dispatch, Reducer } from "react";
import { API_HOST } from "../Contants";
import qs from "qs";

const IS_FETCHING = "app/modules/cars/IS_FETCHING";
const RECEIVE_CARS = "app/modules/cars/RECEIVE_CARS";

export type Car = {
  stockNumber: number;
  manufacturerName: string;
  modelName: string;
  color: string;
  mileage: {
    number: number;
    unit: string;
  };
  fuelType: string;
  pictureUrl: string;
};

type QueryParams = {
  page: number;
  manufacturer: string;
  color: string;
  sort: string;
};

type QueryParamProp = keyof QueryParams;

type Params = {
  page: number;
  manufacturer?: string;
  color?: string;
  sort?: string;
};

type CarsResponse = {
  cars: Car[];
  totalPageCount: number;
  totalCarsCount: number;
};

type FetchCarsAction = {
  type: typeof IS_FETCHING;
};

type ReceiveCarsAction = {
  type: typeof RECEIVE_CARS;
  payload: CarsResponse;
  page: number;
};

export type CarsAction = FetchCarsAction | ReceiveCarsAction;

export type CarsState = {
  isFetching: boolean;
  list: Car[];
  page: number;
  totalPageCount: number;
  totalCarsCount: number;
};

export const initialState: CarsState = {
  isFetching: false,
  list: [],
  page: 1,
  totalCarsCount: 0,
  totalPageCount: 0,
};

const reducer: Reducer<CarsState, CarsAction> = (state, action) => {
  switch (action.type) {
    case IS_FETCHING:
      return {
        ...state,
        isFetching: true,
      };
    case RECEIVE_CARS: {
      const { cars, totalPageCount, totalCarsCount } = action.payload;
      return {
        ...state,
        isFetching: false,
        list: cars,
        totalPageCount,
        totalCarsCount,
        page: action.page,
      };
    }
    default:
      return state;
  }
};

export default reducer;

const isFetching = (): FetchCarsAction => ({
  type: IS_FETCHING,
});

const receiveCars = (
  page: number,
  payload: CarsResponse
): ReceiveCarsAction => ({
  type: RECEIVE_CARS,
  payload,
  page,
});

const removeEmptyParams = (params: QueryParams): Params => {
  const paramKeys = Object.keys(params) as QueryParamProp[];

  const filteredParams = paramKeys.reduce(
    (newParams: Params, key: keyof QueryParams) => {
      if (params[key] !== "") {
        return {
          ...newParams,
          [key]: params[key],
        };
      }
      return newParams;
    },
    { page: params.page }
  );

  return filteredParams;
};

export const fetchCars = (params: QueryParams) => (
  dispatch: Dispatch<CarsAction>
) => {
  dispatch(isFetching());
  const filteredParams = removeEmptyParams(params);

  fetch(`${API_HOST}/cars?${qs.stringify(filteredParams)}`)
    .then((resp: Response) => resp.json())
    .then((resp: CarsResponse) => {
      dispatch(receiveCars(params.page, resp));
    })
    .catch((err) => {
      console.log(err);
      dispatch(
        receiveCars(params.page, {
          cars: [],
          totalCarsCount: 0,
          totalPageCount: 0,
        })
      );
    });
};
