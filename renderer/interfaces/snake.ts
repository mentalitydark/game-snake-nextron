import { Position } from "./position"

export interface Snake {
  position: Position
  direction: Position
  tail: number
  body: Position[]
  newDirection: boolean
  moveTo(x: number, y: number): void
  draw(context: CanvasRenderingContext2D): void
  attBodyPosition(): void
  checkIfIsDead(): boolean
}