import { Arrows, CellTypes, DEFAULT_DIRECTION, Directions, DisallowedRotationSequences, INTERVAL, START_SNAKE_SIZE } from "../../constants";
import { Game } from "../game/game";
import { Snake } from "../snake/snake";
import type { DirectionsValue, TGrid } from "../../types";
import { Cell } from "../cell/cell";
// import { Road } from "../road/road";
import { Diamond } from "../food/diamond";
import type { Food } from "../food/food";
import { Score } from "../score/score";
import { Apple } from "../food/apple";

export class Model {
  static activeInstance: Model | null = null;
  gridSize: TGrid;
  snake: Snake;
  grid: Cell[][];
  container: HTMLDivElement;
  direction: typeof Directions[keyof typeof Directions];
  // road: Road;
  game: Game;
  foods: Food[];
  score: Score;

  constructor({ width, height }: TGrid, field: HTMLDivElement) {
    this.gridSize = { width, height };
    this.container = field;
    this.direction = DEFAULT_DIRECTION;
    this.game = new Game();
    this.grid = this.createGrid();
    this.score = new Score();
    this.snake = new Snake(this.gridSize, START_SNAKE_SIZE, this.game, this.grid, this.commitFoodConsumption);
    // this.road = new Road(this.snake);
    // this.road.init(this.direction);

    this.foods = [new Diamond(this.snake, this.grid), new Apple(this.snake, this.grid)];
    Model.activeInstance = this;
  }

  private intervalId?: number;

  init() {
    this.snake.setSnakeOnGrid();
    this.setFoodOnGrid();
    this.render();
    this.startMoving();
    this.score.init(this.container);
    this.foods.forEach((food) => food.init());

    document.addEventListener('keydown', ({ key }) => {
      const keys = Object.keys(Arrows) as Array<keyof typeof Arrows>;
      if (keys.includes(key as keyof typeof Arrows)) {
        const dir = Arrows[key as keyof typeof Arrows];
        if (this.isAllowRotate(this.direction, dir)) {
          this.direction = dir;
          this.changeDirection();

          //показать ошибку/
        }
      }
      if (key === ' ') {
        // Model.stopMoving();
        this.move();
      }
    })
  }

  removeFood(id: number) {
    this.foods.find((food) => food.id === id)?.removeFood();
  }

  commitFoodConsumption = (foodType: string, id: number) => {
    this.removeFood(id);
    this.score.increaseScore(foodType);
    // this.road.updateRoadAfterEating();
  }

  isAllowRotate = (direction1: DirectionsValue, direction2: DirectionsValue) => DisallowedRotationSequences
    .every((turns) => !(turns.includes(direction1) && turns.includes(direction2)));

  changeDirection() {
    // this.road.changeDirection(this.direction);
  }

  createGrid() {
    return Array.from({ length: this.gridSize.height }, (_, y) =>
      Array.from({ length: this.gridSize.width }, (_, x) => new Cell(x, y))
    );
  };

  reset() {
    this.grid.forEach((row) => {
      row.forEach((item) => {
        item.type = CellTypes.empty
      })
    })
  }

  render() {
    this.container.innerHTML = '';
    this.container.append(Cell.render(this.grid))
  }

  setFoodOnGrid() {
    this.foods = this.foods.map((food) => {
      food.setFoodOnGrid();
      return food;
    })
  }

  consoleGrid() {
    console.clear();
    this.grid.forEach(row => {
      console.log(row.map(cell => cell.type));
    });
  }

  move = () => {
    this.snake.setPosition(this.direction);

    this.reset();
    this.snake.setSnakeOnGrid();
    this.setFoodOnGrid();
    this.render();
    // this.road.tick();
  };

  startMoving() {
    this.intervalId = window.setInterval(this.move, INTERVAL);
  }

  static stopMoving(): void {
    const inst = Model.activeInstance;
    if (inst && inst.intervalId != null) {
      window.clearInterval(inst.intervalId);
      inst.intervalId = undefined;
    }
  }


}