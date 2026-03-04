import { Model } from "../model/model";
import { CellTypes, Directions, Foods } from "../../constants";
import type { Game } from "../game/game";
import type { DirectionsValue, Point, RoadItem, TGrid } from "../../types";
import type { Cell } from "../cell/cell";
import { Score } from "../score/score";

export class Snake {

  width: number;
  height: number;
  _snakeLength: number;
  head: Point;
  tail: Point[];
  game: Game;
  grid: Cell[][];
  commitFoodConsumption: (foodType: string, id: number) => void

  constructor(gridSize: TGrid, snakeLength: number, game: Game, grid: Cell[][], commitFoodConsumption: (foodType: string, id: number) => void) {
    this.width = gridSize.width;
    this.height = gridSize.height;
    this._snakeLength = snakeLength;
    this.head = {
      x: Math.floor(this.width / 2),
      y: Math.floor(this.height / 2)
    };
    this.tail = Array.from({ length: this._snakeLength - 1 }, (_, i) => ({
      x: this.head.x - i - 1,
      y: this.head.y
    }));
    this.game = game;
    this.grid = grid;
    this.commitFoodConsumption = commitFoodConsumption;
  }

  checker = {
    [Directions.UP]: (c: Point) => c.y > 0,
    [Directions.DOWN]: (c: Point) => c.y < this.height - 1,
    [Directions.RIGHT]: (c: Point) => c.x < this.width - 1,
    [Directions.LEFT]: (c: Point) => c.x > 0

  }

  get position() {
    return { head: this.head, tail: this.tail };
  }

  move(segment: Point, direction: DirectionsValue) {
    switch (direction) {
      case Directions.UP:
        segment.y = segment.y - 1 < 0 ? this.height - 1 : segment.y - 1;
        break;
      case Directions.DOWN:
        segment.y = segment.y + 1 > this.height - 1 ? 0 : segment.y + 1;
        break;
      case Directions.RIGHT:
        segment.x = segment.x + 1 > this.width - 1 ? 0 : segment.x + 1;
        break;
      case Directions.LEFT:
        segment.x = segment.x - 1 < 0 ? this.width - 1 : segment.x - 1;
        break;
    }
    return segment;
  }

  getDirection(way: RoadItem) {
    return Object.keys(way)[0]
  }

  isMoveEnable(d: DirectionsValue) {
    const fantom = this.move({ ...this.head }, d);

    if (this.tail.some((item) => item.x === fantom.x && item.y === fantom.y)) {
      return false;
    }

    if (!this.game.settings.enable_through_walls) {
      return this.checker[d](this.head)
    }

    return true;
  }

  increaseLength() {
    console.log('tail before', this.tail)
    this._snakeLength++;
    const tail = [...this.tail]
    const lastSegment = tail[tail.length - 1];
    const prevLastSegment = tail[tail.length - 2];
    const totalVector = {
      x: lastSegment.x - prevLastSegment.x,
      y: lastSegment.y - prevLastSegment.y 
    }
    tail.push({
      x: lastSegment.x + totalVector.x,
      y: lastSegment.y +  totalVector.y
    })
    this.tail = [...tail];
       console.log('tail after ', this.tail)
  }

  isFood(d: DirectionsValue) {
    const fantom: { x: number; y: number } = this.move({ ...this.head }, d);
    const row = this.grid[fantom.y];
    const cell = row?.[fantom.x];
    if (!cell) return;

    
    if (Object.values(CellTypes.food).includes(cell.type)) {
      console.log('cell.type ', cell.type)
      // this.increaseLength();
      this.commitFoodConsumption(Foods[String(cell.type)], cell.id);
      
    }
  }

  set position(road: RoadItem[]) {
    const lastAddedIndex = road.length - 1;
    const d = this.getDirection(road[lastAddedIndex]);
    if (this.isMoveEnable(d)) {
      this.isFood(d);
      this.move(this.head, d);

      if (road.length === 1 && !road[0][d]!.length) {

        this.tail.forEach((item) => {
          this.move(item, d)
        })
      } else {
        const lastIndex = road.length - 1;
        this.tail.forEach((c, i) => {

          let k = 0;
          let flag = true;
          while (k < lastIndex && flag) {
            const d = this.getDirection(road[k]);
            const way: number = road[k][d][i];
            if (way > 0) {
              if (way === 1) {
                const d = this.getDirection(road[k + 1]);
                this.move(c, d);
              } else {
                const d = this.getDirection(road[k]);
                this.move(c, d);
              }
              flag = false;
            }
            if (flag && k === lastIndex - 1) {
              const d1 = this.getDirection(road[lastIndex]);
              this.move(c, d1);
            }
            k++;
          }
        })
      }
    } else {
      Model.stopMoving();
    }
  }

  get snakeLength() {
    return this._snakeLength;
  }

  setSnakeOnGrid() {
    const { head, tail } = this.position;
    this.grid[head.y][head.x].type = CellTypes.head;
    tail.forEach(({ x, y }) => {
      this.grid[y][x].type = CellTypes.snake;
    });
  }
}