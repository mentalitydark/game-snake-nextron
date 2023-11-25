import { useContext, useEffect, useRef } from "react"
import { Game } from "../../classes"
import { GameContext } from "../../contexts/game"

export function useGame() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const { changePoints } = useContext(GameContext)

  useEffect(() => {
    let animationFrameId = 0

    if (canvasRef.current) {
      const context = canvasRef.current.getContext('2d')
      
      const game = new Game({
        context,
        document:window.document,
        changePointsCallback: changePoints
      })
      animationFrameId = requestAnimationFrame(Game.updateFrame(game.start.bind(game)))
    }

    return () => {
      cancelAnimationFrame(animationFrameId)
    }
  })

  return {
    canvasRef
  }
}