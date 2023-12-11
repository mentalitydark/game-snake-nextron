import { Fruit as IFruit, Position } from "../interfaces"
import { Game } from "./game";
import { Snake } from "./snake";

export class Fruit implements IFruit {
  private _position: Position;
  private _snake: Snake
  private _picked: boolean

  public constructor(snake: Snake) {
    this._position = Game.RandomPosition()
    this._snake = snake

    this.checkIfValidPosition()
  }

  get position() { return this._position }
  get picked() { return this._picked }

  public draw = (context: CanvasRenderingContext2D): void => {
    Game.createSquare(context, this.position, '#FF0000')
  }

  public update = () => {
    this.checkIfPicked()
  }

  private checkIfPicked = () => {
    if (this._snake.position.x === this._position.x && this._snake.position.y === this._position.y)
      this._picked = true
  }

  private checkIfValidPosition = () => {
    for (const position of this._snake.body) {
      if (position.x === this.position.x && position.y === this.position.y) {
        this._position = Game.RandomPosition()
        this.checkIfValidPosition()
      }
    }
  }
}