import { Direction } from "../enums";
import { Snake as ISnake, Position } from "../interfaces"
import { Game } from "./game";

export class Snake implements ISnake {
  private _direction: Position
  private _newDirection: boolean
  private _position: Position
  private _body: Position[]
  private _alive: boolean
  private _tail: number
  private colorHead: string = '#B1FF26'
  private colorBody: string = '#689616'

  public constructor() {
    this._position = Game.RandomPosition()

    this._body = [this._position]
    this._tail = 5
    this._direction = { x: 1, y: 0 }
    this._alive = true
  }

  get direction() { return this._direction }
  get newDirection() { return this._newDirection }
  get alive() { return this._alive }
  get tail() { return this._tail }
  get body() { return this._body }
  get position() { return this._position }
  set tail(val: number) { this._tail = val }
    
  public draw(context: CanvasRenderingContext2D): void {
    this._body.forEach((position, index) => {
      Game.createSquare(context, position, index === this._body.length-1 ? this.colorHead : this.colorBody)
    })
  }

  public update = () => {
    this.updateBody()
    this.updatePosition()
    this.updateAliveStatus()
  }

  public teleport = ({x, y}: {x?: number, y?: number}) => {
    if (x !== undefined && y !== undefined)
      this._position = {x, y}
    else if (x !== undefined)
      this._position.x = x
    else if (y !== undefined)
      this._position.y = y
  }

  public move = (direction: Direction) => {
    if (this._newDirection)
      return

    switch(direction) {
      case Direction.Up:
        this.moveUp();
        break;
      case Direction.Right:
        this.moveRight();
        break;
      case Direction.Down:
        this.moveDown();
        break;
      case Direction.Left:
        this.moveLeft();
        break;
    }

    this._newDirection = true
  }

  private moveUp = () => {
    if(this._direction.y === 1)
      return
    this._direction = { x: 0, y: -1 }
  }
  private moveRight = () => {
    if(this._direction.x === -1)
      return
    this._direction = { x: 1, y: 0 }
  }
  private moveDown = () => {
    if(this._direction.y === -1)
      return
    this._direction = { x: 0, y: 1 }
  }
  private moveLeft = () => {
    if(this._direction.x === 1)
      return
    this._direction = { x: -1, y: 0 }
  }

  private updatePosition = () => {
    this._position = {
      x: this._position.x + this._direction.x * Game.SNAKE_STEP,
      y: this._position.y + this._direction.y * Game.SNAKE_STEP
    }

    this._newDirection = false
  }

  private updateBody = () => {
    this._body.push(this._position)
    if (this._body.length > this._tail)
      this._body.shift()
  }

  private updateAliveStatus = () => {
    for (const position of this._body.slice(0, this._body.length-1)) {
      if (position.x === this._position.x && position.y === this._position.y) {
        this._alive = false
        break;
      }
    }
  }
}