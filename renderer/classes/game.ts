import { GameStatus } from "../enums"
import { CreateController, randomNumber } from "../functions"
import { Position, Game as IGame, GameConstructor } from "../interfaces"
import { Controller } from "./controller"
import { Fruit } from "./fruit"
import { Snake } from "./snake"

export class Game implements IGame {
  public static SNAKE_STEP: number = 25
  public static FRAME_PER_SECONDS: number = 10
  public static SQUARE_DIMENSION = {
    width: 25,
    height: 25
  }
  public static DIMENSION = {
    width: 32,
    height: 24
  }

  private _snake: Snake
  private _status: GameStatus
  private _points: number
  private _fruit: Fruit
  private _controller: Controller
  private _showPointsCallback: (val: number) => void
  private _showOverlayScreenCallback: (prop: {textPrimary?: string, textSecondary?: string, show: boolean}) => void
  private _debugger: boolean

  public constructor({ showPointsCallback, showOverlayScreenCallback }: GameConstructor) {
    this._status = GameStatus.NOT_STARTED
    this._points = 0
    this._debugger = false

    this._snake = new Snake()
    this._fruit = new Fruit(this._snake)
    this._controller = CreateController(this)

    this._showPointsCallback = showPointsCallback
    this._showOverlayScreenCallback = showOverlayScreenCallback
    window.document.addEventListener('keydown', this.controller.keyPress.bind(this))
  }

  get status() { return this._status }
  get snake() { return this._snake }
  get points() { return this._points }
  get fruit() { return this._fruit }
  get controller() { return this._controller }
  set status(value: GameStatus) { this._status = value }
  set snake(value: Snake) { this._snake = value }

  public draw = (context: CanvasRenderingContext2D) => {
    this.drawBackground(context)
    this._fruit.draw(context)
    this._snake.draw(context)
  }

  public update = () => {
    if (this._status !== GameStatus.PLAYING)
      return

    this.debuggerConsole()
    this.checkIfOffTheMap()
    this.checkIfSnakeIsAlive()
    this._fruit.update()
    this.checkIfSnakePickedFruit()
    this._snake.update()
  }

  public loop = (context: CanvasRenderingContext2D) => {
    this.update()
    this.draw(context)
  }

  public pause = () => {
    this._status = GameStatus.PAUSED
    this._showOverlayScreenCallback({
      textPrimary: "Pause",
      textSecondary: "Press Enter to continue",
      show: true
    })
  }

  public start = () => {
    this._status = GameStatus.PLAYING
    this._showOverlayScreenCallback({ show: false })
  }

  public restart = () => {
    this.start()
    this._snake = new Snake()
    this._fruit = new Fruit(this._snake)
    this._points = 0
    this._showPointsCallback(this._points)
  }

  public debug = () => {
    console.log(this)
  }

  public debugger = () => {
    this._debugger = !this._debugger
  }

  private debuggerConsole = () => {
    if (!this._debugger)
      return

    console.log(this)
    console.log(this._snake)
    console.log(this._fruit)
  }
  
  private drawBackground = (context: CanvasRenderingContext2D) => {
    for (let i = 0; i < Game.DIMENSION.height; i++) {
      for (let j = 0; j < Game.DIMENSION.width; j++) {
        if (i % 2 === 0)
          if (i % 2 === 0 && j % 2 === 0)
            context.fillStyle = '#383838'
          else
            context.fillStyle = '#4A4A4A'
        else
          if(j % 2 === 0)
            context.fillStyle = '#4A4A4A'
          else
            context.fillStyle = '#383838'
        context.fillRect(
          j * Game.SQUARE_DIMENSION.width, i * Game.SQUARE_DIMENSION.height,
          Game.SQUARE_DIMENSION.width, Game.SQUARE_DIMENSION.height
        )
      }
    }
  }

  private checkIfSnakePickedFruit = () => {
    if (this._fruit.picked) {
      this._fruit = new Fruit(this._snake)
      this._points += 1
      this._snake.tail += 1
      this._showPointsCallback(this._points)
    }
  }

  private checkIfOffTheMap = () => {
    if(this._snake.position.x >= Game.DIMENSION.width * Game.SQUARE_DIMENSION.width)
      this._snake.teleport({x: 0})
    if(this._snake.position.x < 0)
      this._snake.teleport({x: Game.DIMENSION.width * Game.SQUARE_DIMENSION.width - Game.SNAKE_STEP})

    if(this._snake.position.y >= Game.DIMENSION.height * Game.SQUARE_DIMENSION.height)
      this._snake.teleport({y: 0})
    if(this._snake.position.y < 0)
      this._snake.teleport({y: Game.DIMENSION.height * Game.SQUARE_DIMENSION.height - Game.SNAKE_STEP})
  }

  private checkIfSnakeIsAlive = () => {
    if(this._snake.alive)
      return

    this._status = GameStatus.END_GAME
    this._showOverlayScreenCallback({
      textPrimary: "End Game",
      textSecondary: "Press Enter to restart",
      show: true
    })
  }

  public static createSquare = (context: CanvasRenderingContext2D, position: Position, color: string = 'white') => {
    context.fillStyle = color

    context.fillRect(position.x, position.y, Game.SQUARE_DIMENSION.width, Game.SQUARE_DIMENSION.height)

    return position
  }

  public static updateFrame = (callbackFrame: () => void): (time: number) => void => {
    const frameMinTime = (1000 / 60) * (60 / Game.FRAME_PER_SECONDS) - (1000 / 60) * 0.5
    let lastFrameTime = 0

    return function Update(time: number) {
      if (time - lastFrameTime < frameMinTime) {
        requestAnimationFrame(Update)
        return
      }
  
      lastFrameTime = time
  
      callbackFrame()
  
      requestAnimationFrame(Update)
    }
  }

  public static RandomPosition = (): Position => {
    return {
      x: randomNumber(Game.DIMENSION.width) * Game.SQUARE_DIMENSION.width,
      y: randomNumber(Game.DIMENSION.height) * Game.SQUARE_DIMENSION.height,
    }
  }
}