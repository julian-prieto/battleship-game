import PropTypes from 'prop-types';

import win from 'assets/win.png';

import styles from './styles.module.scss';

export default function GameWin({ onGameReset: handleGameReset }) {
  return (
    <main className={styles.main}>
      <span className={styles.title}>YOU WON!</span>
      <img src={win} width={450} alt="You Won!" />
      <button
        data-testid="reset"
        className={styles.button}
        onClick={() => handleGameReset()}
      >
        Play Again
      </button>
    </main>
  );
}

GameWin.propTypes = {
  onGameReset: PropTypes.func.isRequired,
};
