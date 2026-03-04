import type { Snake } from "../../snake/snake";
import type { DirectionsValue, RoadItem } from "../../types";

export class Road {
  _road: RoadItem[] = [];
  snake: Snake;

  constructor(snake: Snake) {
    this.snake = snake;
  }

  justTurned = false;

  init(startDirection: DirectionsValue) {
    this._road = [
      {
        [startDirection]: []
      }
    ];
  }

  changeDirection(direction: DirectionsValue) {
console.log('!!!!!!!! ', this.snake.snakeLength)
    const lastIndex = this._road.length - 1;
    const prevDirection = this.getDirection(this._road[lastIndex]);

    if (prevDirection !== direction) {
      this.justTurned = true;

      const newRoad: RoadItem[] = this._road.map((item, idx) => {
        if (idx === lastIndex) {
          return {
            [prevDirection]: Array.from({ length: this.snake.snakeLength - 1 }, (_, i) => i + 2)
          };
        }
        return item;
      });
      newRoad.push({ [direction]: [] });
      this._road = newRoad;
    }
  }

  updateRoadAfterEating() {
    console.log('road before ', this._road)

    const newRoad: RoadItem[] = this._road.map((item) => {
      const direction = this.getDirection(item);
      if (item[direction]?.length) {
        item[direction]?.push(item[direction][item[direction].length - 1] + 1);
      }
      return item;
    })
    this._road = newRoad;
    console.log('road after ', this._road)
  }

  get road() {
    return [...this._road];
  }

  getDirection(way: RoadItem) {
    return Object.keys(way)[0];
  }

  tick() {
    this.justTurned = false;

    const newRoad: RoadItem[] = [];

    for (let i = 0; i < this._road.length; i++) {
      const item = this._road[i];
      const d = this.getDirection(item);
      const arr = this._road[i][d] ?? [];
      const nextArr = arr.length ? arr.map((value) => (value > 0 ? value - 1 : 0)) : [];
      if (nextArr.length && nextArr.every((v) => v === 0)) {
      } else {
        newRoad.push({ [d]: nextArr });
      }
    }

    this._road = newRoad;
  }
}