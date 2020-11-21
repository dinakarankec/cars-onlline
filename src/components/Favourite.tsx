import React from "react";
import styled from "styled-components";
import useFavourites from "../hooks/useFavourites";
import { colors, LinkButton } from "./styled";

const StyledButton = styled(LinkButton)`
  font-size: inherit;
  &:hover {
    text-decoration: unset;
  }
`;

const Icon = styled.i`
  margin-left: 10px;
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
