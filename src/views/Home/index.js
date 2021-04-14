import splash from "assets/splash.png";

import styles from "./styles.module.scss";

export default function Home() {
  return (
    <main className={styles.main}>
      <span data-testid="welcome" className={styles.title}>
        Welcome to Battleship Game
      </span>
      <img src={splash} width={450} alt="Splash" />
    </main>
  );
}
