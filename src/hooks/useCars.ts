import { useContext } from "react";
import { CarsContext } from "./../contexts/CarsContext";

const useFilter = () => {
  const { state, dispatch } = useContext(CarsContext);
  return {
    state,
    dispatch,
  };
};

export default useFilter;
