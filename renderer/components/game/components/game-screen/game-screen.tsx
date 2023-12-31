import React from "react"
import { Game } from "../../../../classes"

export const GameScreen = React.memo(React.forwardRef<HTMLCanvasElement>((_, ref) => {
  return (
    <canvas
      ref={ref}
      width={Game.DIMENSION.width * Game.SQUARE_DIMENSION.width}
      height={Game.DIMENSION.height * Game.SQUARE_DIMENSION.height}
      style={{ border: '0px solid red', width: '100%', height: '100%' }}
    />
  )
}))