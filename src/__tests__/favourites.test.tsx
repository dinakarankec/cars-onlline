import React from "react";
import { fireEvent, render } from "@testing-library/react";
import Favourite from "./../components/Favourite";
import { FavouritesContext } from "./../contexts/FavouritesContext";
import { SaveFavourite } from "./../containers/CarDetail";

test("Validates the Favourite Component", async () => {
  const { container } = render(<Favourite stockNumber="23564" />);

  container.querySelector(".icon-star-full");

  expect(container.querySelector(".icon-star-full")).toBeInTheDocument();
});

test("Validates Car is in Favourites", async () => {
  const favourites = ["23564"];
  const { container } = render(
    <FavouritesContext.Provider
      value={{
        favourites,
        isFavourite: (stockNumber: string) => favourites.includes(stockNumber),
        addToFavourites: () => {},
        removeFromFavourites: () => {},
      }}
    >
      <Favourite stockNumber="23564" />
    </FavouritesContext.Provider>
  );

  expect(container.querySelector(".icon-star-full")).toBeInTheDocument();
});

test("Validates Car is not in favourites", async () => {
  const favourites = [];
  const { container } = render(
    <FavouritesContext.Provider
      value={{
        favourites,
        isFavourite: (stockNumber: string) => favourites.includes(stockNumber),
        addToFavourites: () => {},
        removeFromFavourites: () => {},
      }}
    >
      <Favourite stockNumber="23564" />
    </FavouritesContext.Provider>
  );

  expect(container.querySelector(".icon-star-full")).not.toBeInTheDocument();
});

test("Validates remove from favourites", async () => {
  const mockFunction = jest.fn();
  const { container } = render(
    <FavouritesContext.Provider
      value={{
        favourites: ["23567"],
        isFavourite: (stockNumber: string) => ["23567"].includes(stockNumber),
        addToFavourites: () => {},
        removeFromFavourites: mockFunction,
      }}
    >
      <Favourite stockNumber="23567" />
    </FavouritesContext.Provider>
  );

  fireEvent(
    container.querySelector(".icon-star-full"),
    new MouseEvent("click", {
      bubbles: true,
      cancelable: true,
    })
  );

  expect(mockFunction.mock.calls.length).toBe(1);
  expect(mockFunction.mock.calls[0][0]).toBe("23567");
});

test("Validates add to favourites", async () => {
  const mockFunction = jest.fn();
  const { getByTestId } = render(
    <SaveFavourite stockNumber="12345" addToFavourites={mockFunction} />
  );

  const buttton = getByTestId("save-favourite");

  fireEvent(
    buttton,
    new MouseEvent("click", {
      bubbles: true,
      cancelable: true,
    })
  );

  expect(mockFunction.mock.calls.length).toBe(1);
  expect(mockFunction.mock.calls[0][0]).toBe("12345");
});
