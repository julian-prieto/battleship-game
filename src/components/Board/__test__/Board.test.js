import React from "react";
import ReactDOM from "react-dom";
import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import renderer from "react-test-renderer";
import { Board } from "components";
import { generateEmptyArray } from "lib/game";

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

const handleSinkTry = jest.fn();
const handleSaveGame = jest.fn();

it("Renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(
    <Board
      board={INITIAL_GAME_STATE.board}
      userBoard={INITIAL_GAME_STATE.userBoard}
      onSinkTry={handleSinkTry}
      onSaveGame={handleSaveGame}
    />,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});

it("Renders User Board Correctly", () => {
  const { getByTestId } = render(
    <Board
      board={INITIAL_GAME_STATE.board}
      userBoard={INITIAL_GAME_STATE.userBoard}
      onSinkTry={handleSinkTry}
      onSaveGame={handleSaveGame}
    />
  );
  expect(getByTestId("board").getAttribute("class")).toBe("board");
});

it("Renders Enemy Board Correctly", () => {
  const { getByTestId } = render(
    <Board
      board={INITIAL_GAME_STATE.board}
      userBoard={INITIAL_GAME_STATE.userBoard}
      onSinkTry={handleSinkTry}
      onSaveGame={handleSaveGame}
    />
  );
  fireEvent.click(getByTestId("toggle-board"));

  expect(getByTestId("board").getAttribute("class")).toBe("board");
});

it("SinkTry Runs Correctly", () => {
  const { getByTestId } = render(
    <Board
      board={INITIAL_GAME_STATE.board}
      userBoard={INITIAL_GAME_STATE.userBoard}
      onSinkTry={handleSinkTry}
      onSaveGame={handleSaveGame}
    />
  );
  fireEvent.click(getByTestId("col-user-0-0"));

  expect(handleSinkTry).toHaveBeenCalledTimes(1);
});

it("Saves Game Correctly", () => {
  const { getByTestId } = render(
    <Board
      board={INITIAL_GAME_STATE.board}
      userBoard={INITIAL_GAME_STATE.userBoard}
      onSinkTry={handleSinkTry}
      onSaveGame={handleSaveGame}
    />
  );
  fireEvent.click(getByTestId("save-game"));

  expect(handleSaveGame).toHaveBeenCalledTimes(1);
});

it("Matches Snapshot", () => {
  const tree = renderer
    .create(
      <Board
        board={INITIAL_GAME_STATE.board}
        userBoard={INITIAL_GAME_STATE.userBoard}
        onSinkTry={handleSinkTry}
        onSaveGame={handleSaveGame}
      />
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
