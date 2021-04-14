import '@testing-library/jest-dom/extend-expect';
import { getFormattedDate } from 'lib/common';
import {
  createRandomShip,
  generateEmptyArray,
  getSavedGamesInLocalStorage,
  saveGameInLocalStorage,
} from 'lib/game';

const BOARD_SIZE = 10;
const DUMMY_GAME_LOST = {
  difficulty: {
    name: 'medium',
    maxAttempts: 50,
  },
  attempts: 101,
  sunkShips: {},
  gameOver: true,
  win: false,
  startedAt: '04/13/2021 09:29 p. m.',
  finishedAt: '04/13/2021 09:32 p. m.',
};

it('Formats date correctly', () => {
  const date = new Date(0);
  expect(getFormattedDate(date)).toContain('12/31/1969 09:00');
});

it('Creates Random 1 Sized Ship Correctly', () => {
  let board;
  const emptyArray = generateEmptyArray(BOARD_SIZE);
  board = createRandomShip(1, '1A', emptyArray);
  expect(board.flat().filter((item) => item === '1A').length).toBe(1);
});

it('Creates Random 2 Sized Ship Correctly', () => {
  let board;
  const emptyArray = generateEmptyArray(BOARD_SIZE);
  board = createRandomShip(2, '2A', emptyArray);
  expect(board.flat().filter((item) => item === '2A').length).toBe(2);
});

it('Creates Random 3 Sized Ship Correctly', () => {
  let board;
  const emptyArray = generateEmptyArray(BOARD_SIZE);
  board = createRandomShip(3, '3A', emptyArray);
  expect(board.flat().filter((item) => item === '3A').length).toBe(3);
});

it('Creates Random 4 Sized Ship Correctly', () => {
  let board;
  const emptyArray = generateEmptyArray(BOARD_SIZE);
  board = createRandomShip(4, '4A', emptyArray);
  expect(board.flat().filter((item) => item === '4A').length).toBe(4);
});

it('Reads Saved Games correctly', () => {
  const savedGames = getSavedGamesInLocalStorage();
  expect(savedGames.length).toBe(0);
});

it('Save New Game correctly', () => {
  const savedGames = saveGameInLocalStorage(DUMMY_GAME_LOST);
  expect(savedGames.length).toBe(1);
});
