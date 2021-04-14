# Battleship Game

[![Netlify Status](https://api.netlify.com/api/v1/badges/9b1fced3-db3c-4884-a62b-28284934b1f6/deploy-status)](https://app.netlify.com/sites/sleepy-mahavira-eeac18/deploys)

[![homepage](https://sleepy-mahavira-eeac18.netlify.app/static/media/splash.7d89fe9c.png)](https://sleepy-mahavira-eeac18.netlify.app "Go to Battleship Game")

## Overview

Battleship Game is a web browser based game to help people have a fun time at any moment of the day :)
Game can be accessed at [sleepy-mahavira-eeac18.netlify.app](https://sleepy-mahavira-eeac18.netlify.app/ "Battleship Game")
This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app) for sake of simplicity. In can be easily ported to other framework as NextJS.

- Application is built using `React` and Tested with `Jest` and `react-testing-library`
- For routing `react-router-dom` is used
- Styling is done using SASS modules
- Prop validations are done with `prop-types`

## Installation

- Clone repository `git clone https://github.com/julianprieto-dev/battleship-game.git`
- Access repository directory `cd battleship-game`
- Install NPM packages `npm install`

## Test

- Run jest `npm test`
- Access coverage report at `battleship-game/coverage/lcov-report/index.html`

## Run locally

- Run jest `npm start`
- Access application by accessing to URL `http://localhost:3000`

## Game configuration

Board size, difficulty level and amount/size of ships can be configured in file `battleship-game/src/config/index.js`

```js
export const DIFFICULTY_LEVELS = [
  {
    name: "Easy",
    maxAttempts: null,
  },
  {
    name: "Medium",
    maxAttempts: 100,
  },
  {
    name: "Hard",
    maxAttempts: 50,
  },
];

export const DEFAULT_SHIPS = [
  { size: 1, amount: 4 },
  { size: 2, amount: 3 },
  { size: 3, amount: 2 },
  { size: 4, amount: 1 },
];

export const BOARD_SIZE = 10;
```

## Game Tutorial

To start a Game you have to browse to `PLAY` section and select a difficulty level from the previously mentioned list (Easy, Medium, Hard).

To win the game you must land shots to all the ships without surpassing the maximum number of attempts defined by the difficulty level.

- Partially harmed ships are represented in yellow shades.
- Sunk ships are represented in red shades.
- Missed shots are represented in blue (as the ocean :))

You can be a little cheater and check the enemy board with the button beneath the board.

You lose if you surpass the max number attempts (for example, `50` failed attempts in `HARD mode`).
