import { Model } from './components/model/model';
import { GridSize } from './constants';
import './styles/style.scss'

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div id="field"></div>
`
const field = document.querySelector('#field')
const grid = new Model(GridSize, field);

grid.init();

// initGrid(document.querySelector<HTMLDivElement>('#field')!, Grid)
// setupCounter(document.querySelector<HTMLButtonElement>('#counter')!)
