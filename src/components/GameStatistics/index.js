import PropTypes from 'prop-types';

import styles from './styles.module.scss';

export default function GameStatistics({ game, onGameReset: handleGameReset }) {
  return (
    <div className={styles.main}>
      <span data-testid="level" className={styles.item}>
        Level:
        {' '}
        {game.difficulty.name}
      </span>
      <span data-testid="attempts" className={styles.item}>
        Attempts:
        {' '}
        {game.attempts}
        /
        {game.difficulty.maxAttempts || '∞'}
      </span>
      <button
        data-testid="end-game"
        onClick={handleGameReset}
        className={styles.button}
      >
        End Game
      </button>
    </div>
  );
}

GameStatistics.propTypes = {
  game: PropTypes.object.isRequired,
  onGameReset: PropTypes.func.isRequired,
};
