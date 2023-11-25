export interface Controllers {
  controllers: {
    [name: string]: Function
  }

  addCommand: (keys: string[], callback: Function) => void
}