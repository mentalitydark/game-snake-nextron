import { Controller, Game } from "../classes";
import { GameStatus } from "../enums";
import { Direction } from "../enums/direction";

export function CreateController(gameInstance: Game): Controller {
  const controller = new Controller()
  controller.newCommand(["Enter"], () => {
    if(gameInstance.status === GameStatus.NOT_STARTED)
      gameInstance.start()
    else if(gameInstance.status === GameStatus.PAUSED)
      gameInstance.start()
    else if(gameInstance.status === GameStatus.END_GAME)
      gameInstance.restart()
  })

  controller.newCommand(["Escape"], () => {
    if(gameInstance.status === GameStatus.PLAYING)
      gameInstance.pause()
  })

  controller.newCommand(["ArrowUp", "W"], () => {
    gameInstance.snake.move(Direction.Up)
  })
  controller.newCommand(["ArrowRight", "D"], () => {
    gameInstance.snake.move(Direction.Right)
  })
  controller.newCommand(["ArrowDown", "S"], () => {
    gameInstance.snake.move(Direction.Down)
  })
  controller.newCommand(["ArrowLeft", "A"], () => {
    gameInstance.snake.move(Direction.Left)
  })
  controller.newCommand(["F"], () => {
    gameInstance.debug()
  })
  controller.newCommand(["G"], () => {
    gameInstance.debugger()
  })

  return controller
}