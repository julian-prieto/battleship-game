import React from "react";
import ReactDOM from "react-dom";
import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import renderer from "react-test-renderer";
import { GameOver } from "components";

const handleGameReset = jest.fn();

it("Renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<GameOver onGameReset={handleGameReset} />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it("Renders Reset Button Correctly", () => {
  const { getByTestId } = render(<GameOver onGameReset={handleGameReset} />);
  expect(getByTestId("reset")).toHaveTextContent("Play Again");
});

it("Button onClick fires correctly", () => {
  const { getByTestId } = render(<GameOver onGameReset={handleGameReset} />);
  fireEvent.click(getByTestId("reset"));
  expect(handleGameReset).toHaveBeenCalledTimes(1);
});

it("Matches Snapshot", () => {
  const tree = renderer
    .create(<GameOver onGameReset={handleGameReset} />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
