import { useState, useEffect } from 'react';
import {
  LevelSelector,
  Board,
  GameStatistics,
  ShipStatistics,
  GameWin,
  GameOver,
} from 'components';
import { getFormattedDate } from 'lib/common';
import {
  generateEmptyArray,
  createRandomShip,
  saveGameInLocalStorage,
} from 'lib/game';

import { DEFAULT_SHIPS, BOARD_SIZE } from 'config';

import styles from './styles.module.scss';

const INITIAL_GAME_STATE = {
  difficulty: null,
  board: null,
  userBoard: null,
  attempts: 0,
  tries: 0,
  sunkShips: {},
  gameOver: false,
  win: false,
  startedAt: null,
  finishedAt: null,
};

export default function Game() {
  const [game, setGame] = useState(INITIAL_GAME_STATE);

  // Managing game state (On going / GameOver / Win)
  useEffect(() => {
    // Initialize game once difficulty was picked
    if (game.difficulty && !game.board) {
      populateBoardWithShips();
    }

    // Check for Game Over condition
    if (!game.gameOver && game.attempts === game?.difficulty?.maxAttempts) {
      const finishedAt = getFormattedDate(new Date());
      setGame((prevGame) => ({
        ...prevGame,
        gameOver: true,
        finishedAt,
      }));
      saveGameInLocalStorage({ ...game, gameOver: true, finishedAt });
    }

    // Check for WIN condition
    if (!game.win) {
      let isWon = true;
      DEFAULT_SHIPS.forEach((ship) => {
        if (game.sunkShips[ship.size] !== ship.amount) isWon = false;
      });
      if (isWon) {
        const finishedAt = getFormattedDate(new Date());
        setGame((prevGame) => ({
          ...prevGame,
          win: true,
          finishedAt,
        }));
        saveGameInLocalStorage({ ...game, win: true, finishedAt });
      }
    }
  }, [game]);

  const populateBoardWithShips = () => {
    // Create a SIZExSIZE array filled with 0's
    let nextBoard = generateEmptyArray(BOARD_SIZE);

    // Generate all random ships defined by config DEFAULT_SHIPS and assign an ID (name) to them
    DEFAULT_SHIPS.forEach((ship) => {
      Array.from({ length: ship.amount }).forEach((_, index) => {
        nextBoard = createRandomShip(
          ship.size,
          `${`${ship.size}${index}`}`,
          nextBoard,
        );
      });
    });

    setGame((prevGame) => ({
      ...prevGame,
      board: nextBoard,
      userBoard: generateEmptyArray(BOARD_SIZE),
      startedAt: getFormattedDate(new Date()),
    }));
  };

  const handleSelectDifficulty = (difficulty) => {
    populateBoardWithShips();
    setGame((prevGame) => ({
      ...prevGame,
      difficulty,
    }));
  };

  const handleGameReset = () => {
    setGame((prevGame) => ({
      ...prevGame,
      ...INITIAL_GAME_STATE,
    }));
  };

  const handleSinkTry = (x, y) => {
    const nextGame = { ...game };
    const shipName = game.board[y][x]; // First character is the Long/Type, Second character is the ID (0, 1, 2...)
    if (game.userBoard[y][x][0] === 'O') {
      // "O" references a fully sunk ship
      return;
    } if (shipName) {
      // User lands a shot
      nextGame.userBoard[y][x] = shipName;

      // Check if the ship is completely sunk
      let amountSunk = 0;
      const [shipType] = shipName;
      for (let i = 0; i < BOARD_SIZE; i++) {
        if (nextGame.userBoard[i][x] === shipName && i !== y) amountSunk++;
        if (nextGame.userBoard[y][i] === shipName && i !== x) amountSunk++;
      }
      if (amountSunk === Number(shipType) - 1) {
        // Increase count of sunk ships of type=shipType
        nextGame.sunkShips = {
          ...nextGame.sunkShips,
          [shipType]: (nextGame.sunkShips[shipType] || 0) + 1,
        };

        for (let i = 0; i < BOARD_SIZE; i++) {
          if (nextGame.userBoard[i][x] === shipName) { nextGame.userBoard[i][x] = `O${shipType}`; }
          if (nextGame.userBoard[y][i] === shipName) { nextGame.userBoard[y][i] = `O${shipType}`; }
        }
      }
      nextGame.tries += 1;
    } else {
      // User misses a shot
      if (game.userBoard[y][x] !== 'X') {
        // Cell was already failed before, not counting attempt
        nextGame.attempts = game.attempts + 1;
        nextGame.tries += 1;
      }
      nextGame.userBoard[y][x] = 'X';
    }

    setGame(nextGame);
  };

  return (
    <main className={styles.main}>
      {game.win && <GameWin onGameReset={handleGameReset} />}
      {game.gameOver && <GameOver onGameReset={handleGameReset} />}
      {!game.gameOver && !game.win && !game.difficulty && (
        <LevelSelector onSelectDifficulty={handleSelectDifficulty} />
      )}
      {!game.gameOver && !game.win && game.difficulty && (
        <>
          <div className={styles.statistics}>
            <GameStatistics onGameReset={handleGameReset} game={game} />
            <ShipStatistics sunkShips={game.sunkShips} />
          </div>
          <Board
            board={game.board}
            userBoard={game.userBoard}
            onSinkTry={handleSinkTry}
          />
        </>
      )}
    </main>
  );
}
