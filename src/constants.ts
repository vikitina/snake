export const START_SNAKE_SIZE = 11;

export const GridSize = {
  width: 27,
  height: 27
};

export const CellTypes = {
  empty: 0,
  snake: 1,
  head: 2,
  food: 3
};
export const Directions = {
  UP: 'up',
  RIGHT: 'right',
  DOWN: 'down',
  LEFT: 'left'
}

export const DEFAULT_DIRECTION = Directions.RIGHT;

export const INTERVAL = 500;

export const Arrows = {
  ArrowRight: Directions.RIGHT,
  ArrowUp: Directions.UP,
  ArrowDown: Directions.DOWN,
  ArrowLeft: Directions.LEFT
};

export const DisallowedRotationSequences = [
  [Directions.DOWN, Directions.UP],
  [Directions.LEFT, Directions.RIGHT]
];

export const GameStates = {
  INIT: 'init',
  RUNNING: 'running',
  PAUSED: 'paused',
  UPDATE_SETTINGS: 'update-settings',
  OVER: 'over'
};

export const Settings = {
  enable_through_walls: true,
}