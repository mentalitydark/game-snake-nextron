import React from "react"
import { useGame } from "./use-game"
import { GameScreen, OverlayScreen } from "./components";

export const Game = React.memo(function Game() {
  const { canvasRef, overlayScreenRef, overlayTextPrimaryRef, overlayTextSecondaryRef } = useGame()

  return (
    <div style={{position: 'relative'}}>
      <OverlayScreen
        ref={overlayScreenRef}
        textPrimaryRef={overlayTextPrimaryRef}
        textSecondaryRef={overlayTextSecondaryRef}
      />
      <GameScreen ref={canvasRef} />
    </div>
  )
})