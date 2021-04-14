import PropTypes from "prop-types";

import gameover from "assets/gameover.png";

import styles from "./styles.module.scss";

export default function GameOver({ onGameReset: handleGameReset }) {
  return (
    <main className={styles.main}>
      <img src={gameover} width={450} alt="GameOver" />
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

GameOver.propTypes = {
  onGameReset: PropTypes.func.isRequired,
};
