import React, { useState } from "react";
import styled from "styled-components";
import Dropdown from "./Dropdown";
import { Button, colors, Grid } from "./styled";
import useMasterData from "./../hooks/useMasterData";
import useFilter from "../hooks/useFilter";
import useCars from "../hooks/useCars";
import { Option } from "../typings";

const FilterWrapper = styled(Grid)`
  border: 1px solid ${colors.light};
  padding: 24px;
  margin-right: 24px;
  height: 289px;
`;

const FieldGroup = styled.div`
  margin-top: 12px;

  &:first-child {
    margin-top: 0px;
  }

  label {
    display: block;
    color: ${colors.dark};
  }
`;

const none = {
  value: "",
  label: "None",
};

const SortOption: Option[] = [
  {
    value: "asc",
    label: "Mileage - Ascending",
  },
  {
    value: "des",
    label: "Mileage - Descending",
  },
];

const Actions = styled(Grid)`
  margin-top: 24px;
`;

const Filter: React.FC<{}> = () => {
  const { options: colors } = useMasterData("colors");
  const { options: manufacturers } = useMasterData("manufacturers");

  const { filter, setFilter } = useFilter();
  const {
    state: { isFetching },
  } = useCars();
  const [localFilter, setLocalFilter] = useState({
    ...filter,
  });
  return (
    <FilterWrapper direction="column">
      <FieldGroup>
        <label className="small">Color</label>
        <Dropdown
          value={localFilter.color}
          options={[none, ...colors]}
          onChange={(color: Option) =>
            setLocalFilter({ ...localFilter, color: color.value })
          }
        />
      </FieldGroup>
      <FieldGroup>
        <label className="small">Manufacturer</label>
        <Dropdown
          value={localFilter.manufacturer}
          options={[none, ...manufacturers]}
          onChange={(manufacturer: Option) =>
            setLocalFilter({ ...localFilter, manufacturer: manufacturer.value })
          }
        />
      </FieldGroup>
      <FieldGroup>
        <label className="small">Sort By</label>
        <Dropdown
          value={localFilter.sort}
          options={[none, ...SortOption]}
          onChange={(sort: Option) =>
            setLocalFilter({ ...localFilter, sort: sort.value })
          }
        />
      </FieldGroup>
      <Actions justify="flex-end">
        <Button disabled={isFetching} onClick={() => setFilter(localFilter)}>
          {isFetching ? "Filtering..." : "Filter"}
        </Button>
      </Actions>
    </FilterWrapper>
  );
};

export default Filter;
