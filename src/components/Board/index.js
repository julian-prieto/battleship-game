import { useState } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import styles from './styles.module.scss';

const boardAxis = {
  columns: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'],
  rows: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'],
};

export default function Board({ board, userBoard, onSinkTry, onSaveGame: handleSaveGame }) {
  const size = board.length;
  const [showUserBoard, setShowUserBoard] = useState(true);

  return (
    <div className={styles.main}>
      <div data-testid="board" className={styles.board}>
        <div className={styles.head}>
          <div className={styles.axis} />
          {boardAxis.columns.map((value) => (
            <div key={value} className={styles.axis}>
              {value}
            </div>
          ))}
        </div>
        {Array.from({ length: size }).map((_, y) => (
          <div key={`row-user-${y}`} className={styles.row}>
            <div key={`col-rows-${y}`} className={styles.axis}>
              {boardAxis.rows[y]}
            </div>
            {showUserBoard
              && Array.from({ length: size }).map((_, x) => (
                <div
                  key={`col-user-${x}-${y}`}
                  data-testid={`col-user-${x}-${y}`}
                  className={classnames(styles.column, {
                    [styles.failed]: userBoard[y][x][0] === 'X',
                    [styles['sunk-1']]: userBoard[y][x] === 'O1',
                    [styles['sunk-2']]: userBoard[y][x] === 'O2',
                    [styles['sunk-3']]: userBoard[y][x] === 'O3',
                    [styles['sunk-4']]: userBoard[y][x] === 'O4',
                    [styles.partial]: Boolean(Number(userBoard[y][x][0])),
                  })}
                  onClick={() => onSinkTry(x, y)}
                />
              ))}
            {!showUserBoard
              && Array.from({ length: size }).map((_, x) => (
                <div
                  key={`col-${x}`}
                  className={classnames(styles.column, {
                    [styles['enemy-1']]: board[y][x][0] === '1',
                    [styles['enemy-2']]: board[y][x][0] === '2',
                    [styles['enemy-3']]: board[y][x][0] === '3',
                    [styles['enemy-4']]: board[y][x][0] === '4',
                  })}
                />
              ))}
          </div>
        ))}
      </div>
      <button
        data-testid="toggle-board"
        onClick={() => setShowUserBoard(!showUserBoard)}
        className={styles.button}
      >
        {showUserBoard ? 'SHOW ENEMY BOARD' : 'SHOW USER BOARD'}
      </button>
      <button
        data-testid="save-game"
        onClick={() => handleSaveGame()}
        className={styles.button}
      >
        SAVE GAME
      </button>
    </div>
  );
}

Board.propTypes = {
  board: PropTypes.array.isRequired,
  userBoard: PropTypes.array.isRequired,
  onSinkTry: PropTypes.func.isRequired,
  onSaveGame: PropTypes.func.isRequired,
};
