import React from "react"
import { useGame } from "./use-game"
import { Game as CGame } from "../../classes";

export const Game = React.memo(function Game() {
  const { canvasRef } = useGame()

  return (
    <canvas
      ref={canvasRef}
      width={CGame.DIMENSION.width}
      height={CGame.DIMENSION.height}
      style={{ border: '0px solid red', width: '100%', height: '100%' }}
    />
  )
}
)