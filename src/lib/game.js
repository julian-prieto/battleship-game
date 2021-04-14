export const generateEmptyArray = (size) => new Array(size).fill(0).map(() => new Array(size).fill(0));

export const createRandomShip = (length, id, board) => {
  let canPlaceRandomShip = false;
  const direction = Math.round(Math.random()) ? 'V' : 'H';

  while (!canPlaceRandomShip) {
    // Generate random coordinates
    const randomPositionStart = [
      Math.floor(Math.random() * board.length),
      Math.floor(Math.random() * board.length),
    ];
    const [x, y] = randomPositionStart;

    // Check if coordinates are OK to place a ship of specific length and direction
    if (canPlaceShipAtPosition(x, y, length, direction, board)) {
      canPlaceRandomShip = true;
    }

    // Place Randomly generated ship in the correct direction (Vertical/Horizontal)
    if (canPlaceRandomShip) {
      const nextBoard = [...board];
      for (let l = 0; l < length; l++) {
        if (direction === 'V') {
          nextBoard[y + l][x] = id;
        } else if (direction === 'H') {
          nextBoard[y][x + l] = id;
        }
      }
      return nextBoard;
    }
  }
};

export const canPlaceShipAtPosition = (x, y, length, direction, board) => {
  let hasShipSomewhere = false;

  // Check for board overflow
  if (direction === 'V' && y + length + 1 > board.length) return false;
  if (direction === 'H' && x + length + 1 > board.length) return false;

  // Check for already existing ships that can overlap
  for (let l = 0; l < length; l++) {
    if (direction === 'H' && board[y][x + l]) hasShipSomewhere = true;
    if (direction === 'V' && board[y + l][x]) hasShipSomewhere = true;
  }

  return !hasShipSomewhere;
};

export const getGameResultsInLocalStorage = () => {
  const games = localStorage.getItem('results') || '[]';

  return JSON.parse(games);
};

export const saveGameResultInLocalStorage = (game) => {
  const { board, userBoard, ...gameData } = game;
  const games = localStorage.getItem('results') || '[]';
  const jsonGames = JSON.parse(games);

  jsonGames.unshift(gameData);

  localStorage.setItem('results', JSON.stringify(jsonGames));

  return jsonGames;
};

export const getGameInLocalStorage = () => {
  const savedGame = localStorage.getItem('game');
  
  if(savedGame) return JSON.parse(savedGame);

  return null
};

export const saveGameInLocalStorage = (game) => {
  localStorage.setItem('game', JSON.stringify(game));

  return;
};
