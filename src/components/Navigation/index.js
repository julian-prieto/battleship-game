import { Link } from 'react-router-dom';

import styles from './styles.module.scss';

export default function Navigation() {
  return (
    <nav>
      <ul data-testid="sections-list" className={styles.ul}>
        <li className={styles.li}>
          <Link to="/">Home</Link>
        </li>
        <li className={styles.li}>
          <Link to="/game">Play</Link>
        </li>
        <li className={styles.li}>
          <Link to="/scores">My Scores</Link>
        </li>
      </ul>
    </nav>
  );
}
