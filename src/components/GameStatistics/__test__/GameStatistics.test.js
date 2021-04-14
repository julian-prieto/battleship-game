import React from "react";
import ReactDOM from "react-dom";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import renderer from "react-test-renderer";
import { generateEmptyArray } from "lib/game";
import { GameStatistics } from "components";

const INITIAL_GAME_STATE = {
  difficulty: {
    name: "Medium",
    maxAttempts: 10,
  },
  board: generateEmptyArray(),
  userBoard: generateEmptyArray(),
  attempts: 5,
  sunkShips: {},
  gameOver: false,
  win: false,
  startedAt: null,
  finishedAt: null,
};

const handleGameReset = jest.fn();

it("Renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(
    <GameStatistics game={INITIAL_GAME_STATE} onGameReset={handleGameReset} />,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});

it("Renders Level Correctly", () => {
  const { getByTestId } = render(
    <GameStatistics game={INITIAL_GAME_STATE} onGameReset={handleGameReset} />
  );
  expect(getByTestId("level")).toHaveTextContent("Level: medium");
});

it("Renders Attempts Correctly", () => {
  const { getByTestId } = render(
    <GameStatistics game={INITIAL_GAME_STATE} onGameReset={handleGameReset} />
  );
  expect(getByTestId("attempts")).toHaveTextContent("Attempts: 5/10");
});

it("Renders Attempts Correctly on Easy", () => {
  const { getByTestId } = render(
    <GameStatistics
      game={{
        ...INITIAL_GAME_STATE,
        difficulty: {
          name: "Easy",
          maxAttempts: null,
        },
      }}
      onGameReset={handleGameReset}
    />
  );
  expect(getByTestId("attempts")).toHaveTextContent("Attempts: 5/∞");
});

it("Matches Snapshot", () => {
  const tree = renderer
    .create(
      <GameStatistics game={INITIAL_GAME_STATE} onGameReset={handleGameReset} />
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
