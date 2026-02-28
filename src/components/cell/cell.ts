import { CellTypes } from "../../constants";
import type { TGrid } from "../../types";

const cellClasses = Object.keys(CellTypes)

export class Cell {
  x: number;
  y: number;
  private _type: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
    this._type = CellTypes.empty;
  }

  get type(): number {
    return this._type;
  }

  set type(type: number) {
    this._type = type;
  }

  static render(grid: Cell[][]) {
    const wrapNode = document.createElement('div');
    wrapNode!.classList.add('grid')
    grid.forEach((row) => {
      const rowNode = document.createElement('div')
      rowNode.classList.add('row')
      row.forEach((cell) => { 
        const newCell = document.createElement('div');
        newCell.classList.add('cell')
        newCell.classList.add(cellClasses[cell.type]);
        rowNode.append(newCell)
      });
      wrapNode!.append(rowNode)
    });
    return wrapNode;
  }
}