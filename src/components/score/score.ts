import { FoodPrices } from "../../constants";

export class Score {
  private _score = 0;
  scoreElement: HTMLDivElement | null = null;

  init(filed: HTMLDivElement) {
    this.scoreElement = document.createElement('div');
    this.scoreElement.classList.add('score');
    this.scoreElement.textContent = `Score: ${this._score}`;
    if (filed.parentNode) {
      filed.parentNode.insertBefore(this.scoreElement, filed);
    }
  }

  get score() {
    return this._score;
  }

  set score(score: number) {
    this._score = score;
  }

  increaseScore(foodType: string) {
    this.score = this._score + FoodPrices[foodType];
    this.render();
  }
  
  render(){
    if (this.scoreElement) {
      this.scoreElement.textContent = `Score: ${this._score}`;
    } 
  }
}