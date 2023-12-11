import { CanvasElement } from "./canvas-element"
import { Position } from "./position"

export interface Snake extends CanvasElement {
  body: Position[]
  position: Position
  direction: Position
  newDirection: boolean
  alive: boolean
  tail: number
}