import React, { createContext, Dispatch, useReducer } from "react";
import reducer, {
  CarsAction,
  CarsState,
  initialState,
} from "./../modules/cars";

type Context = {
  dispatch: Dispatch<CarsAction>;
  state: CarsState;
};

export const CarsContext = createContext<Context>({
  dispatch: () => {},
  state: initialState,
});

const CarsProvider: React.FC<{}> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <CarsContext.Provider
      value={{
        state,
        dispatch,
      }}
    >
      {children}
    </CarsContext.Provider>
  );
};

export default CarsProvider;
