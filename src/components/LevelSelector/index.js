import PropTypes from 'prop-types';
import { DIFFICULTY_LEVELS } from 'config';

import styles from './styles.module.scss';

export default function LevelSelector({ onSelectDifficulty }) {
  const handleSelectDifficulty = (level) => onSelectDifficulty(level);

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
      </div>
    </main>
  );
}

LevelSelector.propTypes = {
  onSelectDifficulty: PropTypes.func.isRequired,
};
