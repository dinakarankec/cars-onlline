import React from "react";
import { render } from "@testing-library/react";
import Skeleton from "./../components/Skeleton";

test("Validates the Skeleton", async () => {
  const { getByTestId } = render(<Skeleton />);

  const skeleton = getByTestId("skeleton");

  expect(skeleton).toBeInTheDocument();
  expect(skeleton.childNodes.length).toBe(10);
});

test("Validates the Skeleton Props", async () => {
  const { getByTestId } = render(<Skeleton noOfSkeletons={5} />);

  const skeleton = getByTestId("skeleton");

  expect(skeleton).toBeInTheDocument();
  expect(skeleton.childNodes.length).toBe(5);
});
