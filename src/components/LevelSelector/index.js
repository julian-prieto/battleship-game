import PropTypes from 'prop-types';
import { DIFFICULTY_LEVELS } from 'config';
import { getGameInLocalStorage } from 'lib/game';

import styles from './styles.module.scss';

export default function LevelSelector({ onSelectDifficulty, onLoadGame: handleLoadGame, defaultGetGameInLocalStorage }) {
  const handleSelectDifficulty = (level) => onSelectDifficulty(level);
  const getGameFromLocalStorage = defaultGetGameInLocalStorage || getGameInLocalStorage;

  return (
    <main className={styles.component}>
      <span className={styles.title}>Please select difficulty</span>
      <div className={styles.buttons}>
        {DIFFICULTY_LEVELS.map((level) => (
          <button
            key={level.name}
            data-testid={`select-level-${level.name}`}
            className={styles.button}
            onClick={() => handleSelectDifficulty(level)}
          >
            {level.name}
          </button>
        ))}
        {getGameFromLocalStorage() && <button
          data-testid="load-game"
          onClick={() => handleLoadGame()}
          className={styles.button}
        >
          LOAD GAME
        </button>}
      </div>
    </main>
  );
}

LevelSelector.propTypes = {
  onSelectDifficulty: PropTypes.func.isRequired,
  onLoadGame: PropTypes.func.isRequired,
  defaultGetGameInLocalStorage: PropTypes.func,
};
