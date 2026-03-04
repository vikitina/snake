import { buildReverseLookup } from "./utils";

export const START_SNAKE_SIZE = 4;

export const GridSize = {
  width: 17,
  height: 17
};

export const FOOD_TYPES = {
  DIAMOND: 'diamond',
  SAPFIRE: 'sapfire',
  CRISTAL: 'cristal',
  APPLE: 'apple'
}

export const FoodPrices = {
  [FOOD_TYPES.DIAMOND]: 300,
  [FOOD_TYPES.SAPFIRE]: 200,
  [FOOD_TYPES.CRISTAL]: 150,
  [FOOD_TYPES.APPLE]: 50
}

export const FOOD_LITERAL = 3;

export const CellTypes = {
  empty: 0,
  snake: 1,
  head: 2,
  food: {
    [FOOD_TYPES.DIAMOND]: parseInt(`${FOOD_LITERAL}1`, 10),
    [FOOD_TYPES.APPLE]: parseInt(`${FOOD_LITERAL}2`, 10),
  }
};

export const Foods = buildReverseLookup(CellTypes.food);
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

export const MIN_DELAY_FOOD = 0;
export const MAX_DELAY_FOOD = 5000;

