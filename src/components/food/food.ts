import { CellTypes, INTERVAL, MAX_DELAY_FOOD, MIN_DELAY_FOOD } from "../../constants"
import type { FoodTypesValue, Point } from "../../types";
import {  getRandomInteger, getRange } from "../../utils"
import type { Cell } from "../cell/cell";
import type { Snake } from "../snake/snake";

export abstract class Food {
  type: FoodTypesValue;
  snake: Snake;
  grid: Cell[][];
  id: number;

  constructor(type: FoodTypesValue, snake: Snake, grid: Cell[][]) {
    this.type = type;
    this.snake = snake;
    this.grid = grid;
    this.id = -10;
  }

  maxDelayFood = MAX_DELAY_FOOD;
  minDelayFood = MIN_DELAY_FOOD;
  food: Point | null = null;

  init() {
    this.relax()
  }

  relax() {
    this.removeFood()
    setTimeout(() => {
      this.job()
    }, getRandomInteger(this.minDelayFood, this.maxDelayFood))
  }

  getJobDelay({ x, y }: Point) {
    return getRandomInteger((x + y + 3) * INTERVAL, (x + y + 3) * INTERVAL + this.maxDelayFood);
  }

  job() {
    this.food = this.createFood();
    setTimeout(() => {
      this.relax();
    }, this.getJobDelay(this.food))
  }

  createFood() {
    const { x, y } = this.snake.head;
    const [xMin, xMax] = getRange(x, this.grid[0].length - 1);
    const [yMin, yMax] = getRange(y, this.grid.length - 1);
    let xCoord: number, yCoord: number;
    do {
      xCoord = getRandomInteger(xMin, xMax);
      yCoord = getRandomInteger(yMin, yMax);
    } while (this.grid[yCoord][xCoord].type !== CellTypes.empty)
    return { x: xCoord, y: yCoord }
  }

  removeFood() {
    this.food = null;
  }

  abstract setFoodOnGrid(): void;
}