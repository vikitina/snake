import { CellTypes, FOOD_TYPES } from "../../constants";
import type { Cell } from "../cell/cell";
import type { Snake } from "../snake/snake";
import { Food } from "./food";

export class Diamond extends Food {
  constructor(snake: Snake, grid: Cell[][]) {
    super(FOOD_TYPES.DIAMOND, snake, grid);
  }


  setFoodOnGrid() {
    if (this.food) {
      const { x, y } = this.food;
      this.id = this.grid[y][x].id;
      console.log('this.id', this.id)
      this.grid[y][x].type = CellTypes.food[FOOD_TYPES.DIAMOND as keyof typeof CellTypes.food];
    }

  }
}