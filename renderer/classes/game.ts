import { GameStatus } from "../enums"
import { Position, Game as IGame, GameConstructor } from "../interfaces"
import { Controllers } from "./controllers"
import { Fruit } from "./fruit"
import { Snake } from "./snake"

export class Game implements IGame {
  public static SNAKE_STEP: number = 25
  public static FRAME_PER_SECONDS: number = 10
  public static DIMENSION = {width: 800, height: 600}
  public static SQUARE_DIMENSION = {width: 25, height: 25}

  public points: number
  public fruit: Fruit
  public snake: Snake
  public controllers: Controllers
  public context: CanvasRenderingContext2D
  public gameStatus: GameStatus
  public setPointsCallback: (p: number) => void
  public endScreenCallback: (tp: string, ts: string) => void

  public constructor({context, document, setPointsCallback, endScreenCallback}: GameConstructor) {
    this.gameStatus = GameStatus.PAUSED
    this.points = 0

    this.snake = new Snake()
    this.fruit = new Fruit(this.snake)
    
    this.context = context
    this.setPointsCallback = setPointsCallback

    this.attributeControllers()
    this.endScreenCallback = endScreenCallback
    document.addEventListener('keydown', this.controllers.keyPress.bind(this))
  }

  public start() {
    this.moveSnake()
    this.draw()
    this.pickedFruit()
  }

  private restart() {
    this.snake = new Snake()
    this.fruit = new Fruit(this.snake)
    this.points = 0
    this.setPointsCallback(this.points)
    this.gameStatus = GameStatus.PLAYING
  }

  private draw() {
    this.drawBackground()
    this.fruit.draw(this.context)
    this.snake.draw(this.context)
  }
  
  private drawBackground() {
    for (let i = 0; i < Game.DIMENSION.height / Game.SQUARE_DIMENSION.height; i++) {
      for (let j = 0; j < Game.DIMENSION.width / Game.SQUARE_DIMENSION.width; j++) {
        this.context.fillStyle = i % 2 === 0 ? (i % 2 === 0 && j % 2 === 0 ? '#383838' : '#4A4A4A') : (j % 2 === 0 ? '#4A4A4A' : '#383838')
        this.context.fillRect(
          j * Game.SQUARE_DIMENSION.width, i * Game.SQUARE_DIMENSION.height,
          Game.SQUARE_DIMENSION.width, Game.SQUARE_DIMENSION.height
        )    
      }
    }
  }

  private pickedFruit() {
    if (this.snake.position.x === this.fruit.position.x && this.snake.position.y === this.fruit.position.y) {
      this.fruit = new Fruit(this.snake)
      this.points++
      this.snake.tail++
      this.setPointsCallback(this.points)
    }
  }

  private moveSnake() {
    if (this.gameStatus !== GameStatus.PLAYING)
      return

    this.snake.attBodyPosition()

    this.snake.moveTo(
      this.snake.position.x + this.snake.direction.x * Game.SNAKE_STEP,
      this.snake.position.y + this.snake.direction.y * Game.SNAKE_STEP
    )

    if (this.snake.position.x >= Game.DIMENSION.width)
      this.snake.moveTo(0)
    if (this.snake.position.x < 0)
      this.snake.moveTo(Game.DIMENSION.width - Game.SNAKE_STEP)

    if (this.snake.position.y >= Game.DIMENSION.height)
      this.snake.moveTo(null, 0)
    if (this.snake.position.y < 0)
      this.snake.moveTo(null, Game.DIMENSION.height - Game.SNAKE_STEP)
      
    if(this.snake.checkIfIsDead()) {
      this.gameStatus = GameStatus.END_GAME
      this.endScreenCallback("End Game", "Press enter to restart")
    }
  }

  private attributeControllers(): void {
    this.controllers = new Controllers()

    this.controllers.addCommand(['enter'], () => {
      if(this.gameStatus === GameStatus.PAUSED)
        this.gameStatus = GameStatus.PLAYING

      if (this.gameStatus === GameStatus.END_GAME)
        this.restart()
    })

    this.controllers.addCommand(['arrowup', 'w'], () => {
      if (this.snake.direction.y === 1)
        return
      
      this.snake.changeDirection(0, -1)
    })
    
    this.controllers.addCommand(['arrowright', 'd'], () => {
      if (this.snake.direction.x === -1)
        return

      this.snake.changeDirection(1, 0)
    })
    
    this.controllers.addCommand(['arrowdown', 's'], () => {
      if (this.snake.direction.y === -1)
        return

      this.snake.changeDirection(0, 1)
    })

    this.controllers.addCommand(['arrowleft', 'a'], () => {
      if (this.snake.direction.x === 1)
        return
        
      this.snake.changeDirection(-1, 0)
    })

    this.controllers.addCommand(['escape'], () => {
      this.gameStatus = GameStatus.PAUSED
    })
  }

  public static createSquare(context: CanvasRenderingContext2D, position: Position, color: string = 'white') {
    context.fillStyle = color

    context.fillRect(position.x, position.y, Game.SQUARE_DIMENSION.width, Game.SQUARE_DIMENSION.height)

    return position
  }

  public static updateFrame(callbackFrame: () => void): (time: number) => void {
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
}