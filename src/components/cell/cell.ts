import { CellTypes, FOOD_LITERAL } from "../../constants";

const cellClasses = Object.keys(CellTypes)

export class Cell {
  x: number;
  y: number;
  private _type: number;
  id: number;

  private static _nextId = 1;

  constructor(x: number, y: number, type: number = CellTypes.empty) {
    this.x = x;
    this.y = y;
    this._type = type;
    this.id = Cell._nextId++;
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
        if (String(cell.type).at(0) === FOOD_LITERAL.toString()) {
          newCell.classList.add(`food${cell.type}`);
          newCell.classList.add('food');
        } else {
          newCell.classList.add(cellClasses[cell.type]);
        }

        rowNode.append(newCell)
      });
      wrapNode!.append(rowNode)
    });
    return wrapNode;
  }
}