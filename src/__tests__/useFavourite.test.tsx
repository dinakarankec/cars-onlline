import { renderHook, act } from "@testing-library/react-hooks";
import useFavourites from "../hooks/useFavourites";
import FavouritesProvider from "../contexts/FavouritesContext";

test("Renders the useFavourite hook", () => {
  const stockNumber = "12345";
  const { result } = renderHook(() => useFavourites(), {
    wrapper: ({ children }) => (
      <FavouritesProvider>{children}</FavouritesProvider>
    ),
  });

  expect(result.current.favourites.length).toBe(0);

  act(() => {
    result.current.addToFavourites(stockNumber);
  });

  expect(result.current.favourites.length).toBe(1);
  expect(result.current.favourites[0]).toBe(stockNumber);
  expect(result.current.isFavourite(stockNumber)).toBeTruthy();
  expect(result.current.isFavourite("23456")).toBeFalsy();

  act(() => {
    result.current.removeFromFavourites(stockNumber);
  });

  expect(result.current.favourites.length).toBe(0);
  expect(result.current.isFavourite(stockNumber)).toBeFalsy();
});
