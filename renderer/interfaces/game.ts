import { Fruit, Snake } from "../classes"
import { Controllers } from "../classes/controllers"
import { GameStatus } from "../enums"

export interface GameConstructor {
  context: CanvasRenderingContext2D
  document: Document
  changePointsCallback: (p: number) => void
}

export interface Game {
  fruit: Fruit
  snake: Snake
  controllers: Controllers
  points: number
  gameStatus: GameStatus
  context: CanvasRenderingContext2D
  changePointsCallback: (point: number) => void
  start: () => void
}