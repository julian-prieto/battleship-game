import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { getSavedGamesInLocalStorage } from 'lib/game';
import styles from './styles.module.scss';

export default function Score({ defaultGames }) {
  const [games, setGames] = useState([]);

  useEffect(() => {
    let savedGames;
    if (!defaultGames) savedGames = getSavedGamesInLocalStorage();
    else savedGames = defaultGames;
    setGames(savedGames);
  }, [defaultGames]);

  return (
    <main className={styles.main}>
      <span data-testid="game-history" className={styles.title}>
        Game History
      </span>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Result</th>
            <th>Difficulty</th>
            <th>Failed Shots</th>
            <th>Accuracy</th>
            <th>Start</th>
            <th>End</th>
          </tr>
        </thead>
        <tbody>
          {games
            .slice(0, 10) // Max 10 recent elements
            .map((game, index) => {
              const {
                difficulty,
                attempts,
                startedAt,
                finishedAt,
                win,
                tries,
              } = game;

              return (
                <tr
                  key={`${startedAt}-${finishedAt}`}
                  data-testid={`result-${index}`}
                >
                  <td>{win ? 'WIN' : 'LOSE'}</td>
                  <td>{difficulty.name}</td>
                  <td>{attempts}</td>
                  <td>
                    {(100 * (1 - attempts / tries)).toFixed()}
                    %
                  </td>
                  <td>{startedAt}</td>
                  <td>{finishedAt}</td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </main>
  );
}

Score.propTypes = {
  defaultGames: PropTypes.array,
};
