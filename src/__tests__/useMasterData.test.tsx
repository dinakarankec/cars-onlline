import { renderHook } from "@testing-library/react-hooks";
import useMasterData from "../hooks/useMasterData";
import fetchMock from "jest-fetch-mock";

fetchMock.enableMocks();

beforeEach(() => {
  (fetch as any).resetMocks();
});

test("Renders the hook and get colors", async () => {
  (fetch as any).mockResponseOnce(
    JSON.stringify({
      colors: ["red", "blue", "green", "black", "yellow", "white", "silver"],
    })
  );

  const { result, waitForNextUpdate } = renderHook(() =>
    useMasterData("colors")
  );
  expect(result.current.options.length).toBe(0);
  await waitForNextUpdate();
  expect(result.current.options.length).toBe(7);
});
