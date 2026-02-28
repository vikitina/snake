import { Model } from "../components/model/model";
import { Directions } from "../constants";
import type { Game } from "../game/game";
import type { DirectionsValue, RoadItem, TGrid } from "../types";


type Point = { x: number; y: number };

export class Snake {

  width: number;
  height: number;
  _snakeLength: number;
  head: Point;
  tail: Point[];
  game: Game;

  constructor(grid: TGrid, snakeLength: number, game: Game) {
    this.width = grid.width;
    this.height = grid.height;
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

  set position(road: RoadItem[]) {
    const lastAddedIndex = road.length - 1;
    const d = this.getDirection(road[lastAddedIndex]);
    if (this.isMoveEnable(d)) {
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
}