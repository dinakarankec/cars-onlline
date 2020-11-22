import { useContext } from "react";
import { FavouritesContext } from "./../contexts/FavouritesContext";

const useFavourites = () => {
  const {
    isFavourite,
    addToFavourites,
    removeFromFavourites,
    favourites,
  } = useContext(FavouritesContext);
  return {
    favourites,
    isFavourite,
    addToFavourites,
    removeFromFavourites,
  };
};

export default useFavourites;
