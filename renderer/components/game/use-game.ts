import { useContext, useEffect, useRef, useState } from "react"
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
    const showOverlayScreen = (textPrimary: string = "", textSecondary: string = "") => {
      overlayScreenRef.current.style.display = 'flex'
      setOverlayTextPrimary(textPrimary)
      setOverlayTextSecondary(textSecondary)
    }

    let animationFrameId = 0

    const hiddenOverlayScreen = () => {
      overlayScreenRef.current.style.display = 'none'
    }

    if (canvasRef.current) {
      const context = canvasRef.current.getContext('2d')
      
      const game = new Game({
        context,
        document: window.document,
        setPointsCallback: setPoints,
        endScreenCallback: showOverlayScreen
      })
      animationFrameId = requestAnimationFrame(Game.updateFrame(game.start.bind(game)))
    }

    window.document.addEventListener("keydown", ({key}) => {
      if (overlayScreenRef.current) {
        if (key === "Enter")
          hiddenOverlayScreen()

        if (key === "Escape")
          showOverlayScreen("Paused", "Press enter to continue...")
      }
    })

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