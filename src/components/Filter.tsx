import React from "react";
import styled from "styled-components";
import Dropdown from "./Dropdown";
import { Button, colors, Grid } from "./styled";

const FilterWrapper = styled(Grid)`
  border: 1px solid ${colors.light};
  padding: 24px;
  margin-right: 24px;
  height: 224px;
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

const Actions = styled(Grid)`
  margin-top: 24px;
`;

const Filter: React.FC<any> = () => {
  return (
    <FilterWrapper direction="column">
      <FieldGroup>
        <label className="small">Color</label>
        <Dropdown
          value="white"
          options={[
            {
              value: "white",
              label: "White",
            },
            {
              value: "green",
              label: "Green",
            },
            {
              value: "red",
              label: "Red",
            },
            {
              value: "black",
              label: "Black",
            },
          ]}
          onChange={() => console.log("Hello world")}
        />
      </FieldGroup>
      <FieldGroup>
        <label className="small">Manufacturer</label>
        <Dropdown
          value="Volkswagen"
          options={[
            {
              value: "Volkswagen",
              label: "Volkswagen",
            },
            {
              value: "Audi",
              label: "Audi",
            },
            {
              value: "BMW",
              label: "BMW",
            },
            {
              value: "Mercedez Benz",
              label: "Mercedez Benz",
            },
          ]}
          onChange={() => console.log("Hello world")}
        />
      </FieldGroup>
      <Actions justify="flex-end">
        <Button>Filter</Button>
      </Actions>
    </FilterWrapper>
  );
};

export default Filter;
