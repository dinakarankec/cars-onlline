import React, { createContext, useState } from "react";

type Filter = {
  manufacturer: string;
  color: string;
  sort: string;
};

type Context = {
  filter: Filter;
  setFilter(filter: Filter): void;
};

export const FilterContext = createContext<Context>({
  filter: {
    manufacturer: "",
    color: "",
    sort: "",
  },
  setFilter: (filter: Filter) => {},
});

const FilterProvider: React.FC<{}> = ({ children }) => {
  const [filter, setFilter] = useState<Filter>({
    manufacturer: "",
    color: "",
    sort: "",
  });

  return (
    <FilterContext.Provider
      value={{
        filter,
        setFilter,
      }}
    >
      {children}
    </FilterContext.Provider>
  );
};

export default FilterProvider;
