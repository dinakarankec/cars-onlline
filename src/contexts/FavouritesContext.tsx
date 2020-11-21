import React, { createContext, useCallback, useState } from "react";

type Context = {
  favourites: string[];
  addToFavourites(stockNumber: string): void;
  removeFromFavourites(stockNumber: string): void;
  isFavourite(stockNumber: string): boolean;
};

export const FavouritesContext = createContext<Context>({
  favourites: [],
  addToFavourites: (stockNumber: string) => {},
  removeFromFavourites: (stockNumber: string) => {},
  isFavourite: (stockNumber: string) => true,
});

const getFavouritesFromStorage = (): string[] => {
  const favoritesStr: string = localStorage.getItem("favourites") || "[]";
  const favourites = JSON.parse(favoritesStr) as string[];
  return favourites;
};

const FavouritesProvider: React.FC<{}> = ({ children }) => {
  const [favourites, setFavourites] = useState<string[]>(() =>
    getFavouritesFromStorage()
  );

  const isFavourite = useCallback(
    (stockNumber: string) => {
      return favourites.includes(stockNumber);
    },
    [favourites]
  );

  const addToFavourites = useCallback(
    (stockNumber: string) => {
      const newFavourites = [...favourites, stockNumber];
      setFavourites(newFavourites);
      localStorage.setItem("favourites", JSON.stringify(newFavourites));
    },
    [favourites]
  );

  const removeFromFavourites = useCallback(
    (stockNumber: string) => {
      const newFavourites = favourites.filter(
        (favourite: string) => favourite !== stockNumber
      );
      setFavourites(newFavourites);
      localStorage.setItem("favourites", JSON.stringify(newFavourites));
    },
    [favourites]
  );

  return (
    <FavouritesContext.Provider
      value={{
        favourites,
        isFavourite,
        addToFavourites,
        removeFromFavourites,
      }}
    >
      {children}
    </FavouritesContext.Provider>
  );
};

export default FavouritesProvider;
