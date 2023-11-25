import { Fruit as IFruit, Position } from "../interfaces"
import { Game } from "./game";
import { Snake } from "./snake";

export class Fruit implements IFruit {
  public position: Position;

  public constructor(snake: Snake) {
    this.position = {
      x: Math.floor(Math.random() * (Game.DIMENSION.width / Game.SNAKE_STEP)) * Game.SNAKE_STEP,
      y: Math.floor(Math.random() * (Game.DIMENSION.height / Game.SNAKE_STEP)) * Game.SNAKE_STEP
    }

    this.checkIfValidPosition(snake)
  }

  public draw(context: CanvasRenderingContext2D): void {
    Game.createSquare(context, this.position, '#FF0000')
  }

  private checkIfValidPosition(snake: Snake) {
    for (const position of snake.body) {
      if (position.x === this.position.x && position.y === this.position.y) {
        this.position = {
          x: Math.floor(Math.random() * (Game.DIMENSION.width / Game.SNAKE_STEP)) * Game.SNAKE_STEP,
          y: Math.floor(Math.random() * (Game.DIMENSION.height / Game.SNAKE_STEP)) * Game.SNAKE_STEP
        }

        this.checkIfValidPosition(snake)
      }
    }
  }
}