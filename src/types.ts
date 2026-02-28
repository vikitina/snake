import type { Directions, GameStates } from "./constants";

export type TGrid = {
    width: number;
    height: number;
};

export type TDirection = 'up' | 'down' | 'left' | 'right';

export type DirectionsValue = typeof Directions[keyof typeof Directions];
export type GameStateValue = typeof GameStates[keyof typeof GameStates];

export type RoadItem = {
  [K in DirectionsValue]?: number[];
};