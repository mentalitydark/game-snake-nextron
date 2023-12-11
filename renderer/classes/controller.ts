import { Controller as IController } from "../interfaces"
import { Game } from "./game"

export class Controller implements IController {
  _controllers: {[name: string]: Function}

  public constructor() {
    this._controllers = {}
  }

  get controllers() { return this._controllers }
  
  public newCommand(keys: string[], callback: Function): void {
    keys.forEach(key => this._controllers[key.toLocaleLowerCase()] = callback)
  }

  public keyPress(this: Game, { key }: KeyboardEvent): void {
    this.controller.execute(key.toLocaleLowerCase())
  }

  public execute = (command: string) => {
    if (this.hasKeys(command))
      this._controllers[command]()
  }

  private hasKeys(key: string): boolean {
    return this.getKeys().includes(key)
  }

  private getKeys(): string[] {
    return Object.keys(this._controllers)
  }

}