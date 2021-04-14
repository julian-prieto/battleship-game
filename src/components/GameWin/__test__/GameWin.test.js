import React from "react";
import ReactDOM from "react-dom";
import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import renderer from "react-test-renderer";
import { GameWin } from "components";

const handleGameReset = jest.fn();

it("Renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<GameWin onGameReset={handleGameReset} />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it("Renders Reset Button Correctly", () => {
  const { getByTestId } = render(<GameWin onGameReset={handleGameReset} />);
  expect(getByTestId("reset")).toHaveTextContent("Play Again");
});

it("Button onClick fires correctly", () => {
  const { getByTestId } = render(<GameWin onGameReset={handleGameReset} />);
  fireEvent.click(getByTestId("reset"));
  expect(handleGameReset).toHaveBeenCalledTimes(1);
});

it("Matches Snapshot", () => {
  const tree = renderer
    .create(<GameWin onGameReset={handleGameReset} />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
