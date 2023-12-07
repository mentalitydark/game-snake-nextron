import { Controllers as IControllers } from "../interfaces"
import { Game } from "./game"

export class Controllers implements IControllers {
  controllers: {[name: string]: Function}

  public constructor() {
    this.controllers = {}
  }

  public keyPress(this: Game, { key }: KeyboardEvent): void {
    if (this.controllers.hasKeys(key.toLocaleLowerCase()))
      this.controllers.getControllers()[key.toLocaleLowerCase()]()
  }

  public hasKeys(key: string): boolean {
    return this.getKeys().includes(key)
  }

  public getControllers(): {[name: string]: Function} {
    return this.controllers
  }

  public addCommand(keys: string[], callback: Function): void {
    for (const key of keys) {
      this.controllers[key] = callback
    }
  }
  
  private getKeys(): string[] {
    return Object.keys(this.controllers)
  }

}