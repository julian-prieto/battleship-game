import PropTypes from "prop-types";
import classnames from "classnames";
import { DEFAULT_SHIPS } from "config";

import styles from "./styles.module.scss";

export default function ShipStatistics({ sunkShips }) {
  return (
    <div className={styles.main}>
      {DEFAULT_SHIPS.map((ship) => (
        <div
          data-testid={`ship-count-${ship.size}`}
          key={`ship-count-${ship.size}`}
          className={styles.item}
        >
          {Array.from({ length: ship.size }).map((_, index) => (
            <div
              key={`ship-draw-${ship.size}-${index}`}
              className={classnames(styles.ship, styles[`ship-${ship.size}`])}
            />
          ))}
          <span className={styles.value}>
            {sunkShips[ship.size] || 0}/{ship.amount}{" "}
          </span>
        </div>
      ))}
    </div>
  );
}

ShipStatistics.propTypes = {
  sunkShips: PropTypes.object.isRequired,
};
