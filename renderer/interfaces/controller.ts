import { Game } from "../classes"

export interface Controller {
  controllers: { [name: string]: Function }
  newCommand: (keys: string[], callback: Function) => void
  keyPress: (this: Game, event: KeyboardEvent) => void
  execute: (command: string) => void
}