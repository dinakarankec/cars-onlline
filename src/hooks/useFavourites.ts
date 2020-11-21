import { useContext } from "react";
import { FavouritesContext } from "./../contexts/FavouritesContext";

const useFavourites = () => {
  const { isFavourite, addToFavourites, removeFromFavourites } = useContext(
    FavouritesContext
  );
  return {
    isFavourite,
    addToFavourites,
    removeFromFavourites,
  };
};

export default useFavourites;
