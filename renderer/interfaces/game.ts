import { Fruit, Snake } from "../classes"
import { Controller } from "../classes"
import { GameStatus } from "../enums"
import { CanvasElement } from "./canvas-element"

export interface GameConstructor {
  showPointsCallback: (val: number) => void
  showOverlayScreenCallback: (prop: {textPrimary?: string, textSecondary?: string, show: boolean}) => void
}

export interface Game extends CanvasElement {
  snake: Snake
  status: GameStatus
  points: number
  fruit: Fruit
  controller: Controller
}