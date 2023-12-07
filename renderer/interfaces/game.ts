import { Fruit, Snake } from "../classes"
import { Controllers } from "../classes/controllers"
import { GameStatus } from "../enums"

export interface GameConstructor {
  context: CanvasRenderingContext2D
  document: Document
  setPointsCallback: (p: number) => void
  endScreenCallback: (tp: string, ts: string) => void
}

export interface Game {
  fruit: Fruit
  snake: Snake
  controllers: Controllers
  points: number
  gameStatus: GameStatus
  context: CanvasRenderingContext2D
  setPointsCallback: (point: number) => void
  start: () => void
}