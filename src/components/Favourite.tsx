import React from "react";
import styled from "styled-components";
import useFavourites from "../hooks/useFavourites";
import { colors, LinkButton } from "./styled";

const StyledButton = styled(LinkButton)`
  font-size: inherit;
  padding: 0px;
  margin-left: 8px;
  &:hover {
    text-decoration: unset;
    background-color: ${colors.light};
  }
`;

const Icon = styled.i`
  color: ${colors.primary};
`;

const Favourite: React.FC<{ stockNumber: string }> = ({ stockNumber }) => {
  const { isFavourite, removeFromFavourites } = useFavourites();
  if (isFavourite(stockNumber)) {
    return (
      <StyledButton onClick={() => removeFromFavourites(stockNumber)}>
        <Icon className="icon-star-full" />
      </StyledButton>
    );
  }
  return <></>;
};

export default Favourite;
