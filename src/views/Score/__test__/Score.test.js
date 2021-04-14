import React from "react";
import ReactDOM from "react-dom";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import renderer from "react-test-renderer";
import { Score } from "views";
import game from "lib/game";

const mockGames = [
  {
    difficulty: { name: "Easy", maxAttempts: null },
    attempts: 60,
    tries: 81,
    sunkShips: { 1: 4, 2: 3, 3: 2, 4: 1 },
    gameOver: false,
    win: true,
    startedAt: "04/14/2021 02:19 p. m.",
    finishedAt: "04/14/2021 02:34 p. m.",
  },
  {
    difficulty: { name: "Hard", maxAttempts: 50 },
    attempts: 50,
    tries: 50,
    sunkShips: {},
    gameOver: true,
    win: false,
    startedAt: "04/14/2021 02:16 p. m.",
    finishedAt: "04/14/2021 02:16 p. m.",
  },
];

it("Renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<Score />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it("Renders Welcome Message Correctly", () => {
  const { getByTestId } = render(<Score />);
  expect(getByTestId("game-history")).toHaveTextContent("Game History");
});

it("Renders History Games Correctly", () => {
  const { getByTestId } = render(<Score defaultGames={mockGames} />);
  expect(getByTestId("result-0")).toHaveTextContent("WIN");
});

it("Matches Snapshot", () => {
  const tree = renderer.create(<Score />).toJSON();
  expect(tree).toMatchSnapshot();
});
