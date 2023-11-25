import { Snake as ISnake, Position } from "../interfaces"
import { Game } from "./game";

export class Snake implements ISnake {
  public position: Position
  public body: Position[]
  public direction: Position
  public tail: number
  public newDirection: boolean

  public constructor() {
    this.position = {
      x: Math.floor(Math.random() * (Game.DIMENSION.width / Game.SNAKE_STEP)) * Game.SNAKE_STEP,
      y: Math.floor(Math.random() * (Game.DIMENSION.height / Game.SNAKE_STEP)) * Game.SNAKE_STEP
    }
    this.body = [this.position]
    this.tail = 5
    this.direction = { x: 1, y: 0 }
  }

  public changeDirection(x: number, y: number): void {
    if (this.newDirection)
      return

    this.direction = {x, y}
    this.newDirection = true
  }

  public moveTo(x: number = null, y: number = null) {
    if (x === null)
      this.position.y = y
    else if (y === null)
      this.position.x = x
    else
      this.position = {x, y}

    this.newDirection = false
  }
  
  public draw(context: CanvasRenderingContext2D): void {
    this.body.forEach((p, i) => {
      Game.createSquare(context, p, i === this.body.length-1 ? '#B1FF26' : '#689616')
    })
  }

  public attBodyPosition(): void {
    this.body.push(this.position)

    if (this.body.length > this.tail)
      this.body.shift()
  }

  public checkIfIsDead(): boolean {
    for (const position of this.body) {
      if(position.x === this.position.x && position.y === this.position.y)
        return true
    }

    return false
  }

}