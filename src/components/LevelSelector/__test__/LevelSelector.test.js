import React from 'react';
import ReactDOM from 'react-dom';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import renderer from 'react-test-renderer';
import { LevelSelector } from 'components';

const handleSelectDifficulty = jest.fn();
const handleLoadGame = jest.fn();
const defaultGetGameInLocalStorage = () => mockSavedGame

it('Renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <LevelSelector
      onSelectDifficulty={handleSelectDifficulty}
      onLoadGame={handleLoadGame}
    />,
    div,
  );
  ReactDOM.unmountComponentAtNode(div);
});

it('Renders Select Level Button Correctly', () => {
  const { getByTestId } = render(
    <LevelSelector
      onSelectDifficulty={handleSelectDifficulty}
      onLoadGame={handleLoadGame}
    />,
  );
  expect(getByTestId('select-level-Medium')).toHaveTextContent('Medium');
});

it('Button onClick fires correctly', () => {
  const { getByTestId } = render(
    <LevelSelector
      onSelectDifficulty={handleSelectDifficulty}
      onLoadGame={handleLoadGame}
    />,
  );
  fireEvent.click(getByTestId('select-level-Medium'));
  expect(handleSelectDifficulty).toHaveBeenCalledTimes(1);
});


it('Load Game function is executed correctly', () => {
  const { getByTestId } = render(
    <LevelSelector
      onSelectDifficulty={handleSelectDifficulty}
      onLoadGame={handleLoadGame}
      defaultGetGameInLocalStorage={defaultGetGameInLocalStorage}
    />,
  );
  fireEvent.click(getByTestId('load-game'));
  expect(handleLoadGame).toHaveBeenCalledTimes(1);
});

it('Matches Snapshot', () => {
  const tree = renderer
    .create(<LevelSelector
        onSelectDifficulty={handleSelectDifficulty}
        onLoadGame={handleLoadGame}
      />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});

const mockSavedGame = {
  difficulty: { name: "Hard", maxAttempts: 50 },
  board: [
    [0, 0, 0, 0, 0, "30", "30", "30", 0, 0],
    [0, "10", 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, "31"],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, "31"],
    [0, 0, 0, "40", "40", "40", "40", 0, 0, "31"],
    [0, 0, 0, "20", 0, "12", 0, 0, 0, 0],
    [0, 0, 0, "20", 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, "21", 0, "22", "22", 0],
    [0, 0, 0, 0, 0, "21", 0, 0, "11", 0],
    [0, 0, 0, 0, 0, 0, 0, "13", 0, 0],
  ],
  userBoard: [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, "X", "O2", "O2", 0],
    [0, 0, 0, 0, 0, 0, 0, "X", "O1", "X"],
    [0, 0, 0, 0, 0, 0, 0, "O1", "X", "X"],
  ],
  attempts: 5,
  tries: 9,
  sunkShips: { 1: 2, 2: 1 },
  gameOver: false,
  win: false,
  startedAt: "04/14/2021 05:21 p. m.",
  finishedAt: null,
};