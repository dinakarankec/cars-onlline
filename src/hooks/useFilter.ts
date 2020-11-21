import { useContext } from "react";
import { FilterContext } from "./../contexts/FilterContext";

const useFilter = () => {
  const { filter, setFilter } = useContext(FilterContext);
  return {
    filter,
    setFilter,
  };
};

export default useFilter;
