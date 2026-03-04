import { FOOD_TYPES, type Directions, type GameStates } from "./constants";

export type TGrid = {
    width: number;
    height: number;
};

export type TDirection = 'up' | 'down' | 'left' | 'right';

export type DirectionsValue = typeof Directions[keyof typeof Directions];
export type GameStateValue = typeof GameStates[keyof typeof GameStates];
export type FoodTypesValue = typeof FOOD_TYPES[keyof typeof FOOD_TYPES];

export type RoadItem = {
  [K in DirectionsValue]?: number[];
};

export type Point = { x: number; y: number };
