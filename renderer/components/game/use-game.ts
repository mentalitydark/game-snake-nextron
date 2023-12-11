import { useContext, useEffect, useRef } from "react"
import { Game } from "../../classes"
import { GameContext } from "../../contexts/game"

export function useGame() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const overlayScreenRef = useRef<HTMLDivElement>(null)
  const {
    refs: { overlayTextPrimaryRef, overlayTextSecondaryRef },
    functions: { setPoints, setOverlayTextPrimary, setOverlayTextSecondary }
  } = useContext(GameContext)

  useEffect(() => {
    const showOverlayScreen = ({textPrimary, textSecondary, show}: {textPrimary?: string, textSecondary?: string, show: boolean}) => {
      overlayScreenRef.current.style.display = show ? 'flex' : 'none'
      setOverlayTextPrimary(textPrimary || '')
      setOverlayTextSecondary(textSecondary || '')
    }

    let animationFrameId = 0
    if (canvasRef.current) {
      const context = canvasRef.current.getContext('2d')
      
      const game = new Game({
        showPointsCallback: setPoints,
        showOverlayScreenCallback: showOverlayScreen
      })
      animationFrameId = requestAnimationFrame(Game.updateFrame(game.loop.bind(game, context)))
    }

    return () => {
      cancelAnimationFrame(animationFrameId)
    }
  })

  return {
    canvasRef,
    overlayScreenRef,
    overlayTextPrimaryRef,
    overlayTextSecondaryRef
  }
}