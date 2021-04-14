import React from "react";
import ReactDOM from "react-dom";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import renderer from "react-test-renderer";
import { ShipStatistics } from "components";

const sunkShips = {
  1: 4,
};

it("Renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<ShipStatistics sunkShips={sunkShips} />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it("Renders 1 Sized Ship Count Correctly", () => {
  const { getByTestId } = render(<ShipStatistics sunkShips={sunkShips} />);
  expect(getByTestId("ship-count-1")).toHaveTextContent("4/4");
});

it("Matches Snapshot", () => {
  const tree = renderer
    .create(<ShipStatistics sunkShips={sunkShips} />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
