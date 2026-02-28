import { Arrows, CellTypes, DEFAULT_DIRECTION, Directions, DisallowedRotationSequences, INTERVAL, START_SNAKE_SIZE } from "../../constants";
import { Game } from "../../game/game";
import { Snake } from "../../snake/snake";
import type { DirectionsValue, TGrid } from "../../types";
import { Cell } from "../cell/cell";
import { Road } from "../road/road";


export class Model {
  static activeInstance: Model | null = null;
  gridSize: TGrid;
  snake: Snake;
  grid: Cell[][];
  container: HTMLDivElement;
  direction: typeof Directions[keyof typeof Directions];
  road: Road;
  game: Game;

  constructor({ width, height }: TGrid, field: HTMLDivElement) {
    this.gridSize = { width, height };
    this.container = field;
    this.direction = DEFAULT_DIRECTION;
    this.game = new Game();
    this.snake = new Snake(this.gridSize, START_SNAKE_SIZE, this.game);
    this.road = new Road(this.snake);
    this.road.init(this.direction);
    this.grid = this.createGrid();
    Model.activeInstance = this;
  }

  private intervalId?: number;

  init() {
    this.setSnakeOnGrid();
    // this.consoleGrid();
    this.render();
    this.startMoving();

    document.addEventListener('keydown', ({ key }) => {
      console.log(key)
      const arrows = Object.keys(Arrows);
      if (arrows.includes(key)) {
        if (this.isAllowRotate(this.direction, Arrows[key])) {
          this.direction = Arrows[key];
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

  isAllowRotate = (direction1: DirectionsValue, direction2: DirectionsValue) => DisallowedRotationSequences
    .every((turns) => !(turns.includes(direction1) && turns.includes(direction2)));

  changeDirection() {
    this.road.changeDirection(this.direction);
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

  setSnakeOnGrid() {
    const { head, tail } = this.snake.position;
    this.grid[head.y][head.x].type = CellTypes.head;
    tail.forEach(({ x, y }) => {
      this.grid[y][x].type = CellTypes.snake;
    });
  }

  consoleGrid() {
    console.clear();
    this.grid.forEach(row => {
      console.log(row.map(cell => cell.type));
    });
  }

  move = () => {
    this.snake.position = this.road.road;

    this.reset();
    this.setSnakeOnGrid();
    this.render();
    this.road.tick();
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