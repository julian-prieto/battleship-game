import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Navigation } from "components";
import { Home, Game, Score } from "views";

import styles from "./styles.module.scss";

export default function App() {
  return (
    <Router>
      <div className={styles.main}>
        <div className={styles.container}>
          <Navigation />
          <Switch>
            <Route path="/game">
              <Game />
            </Route>
            <Route path="/scores">
              <Score />
            </Route>
            <Route path="/">
              <Home />
            </Route>
          </Switch>
        </div>
      </div>
    </Router>
  );
}
