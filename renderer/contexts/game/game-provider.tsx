import React, { useRef } from "react"
import { GameContext } from "./game-context"

export const GameProvider = ({ children }: { children: React.ReactNode}) => {
  const pointsRef = useRef<HTMLSpanElement>(null)
  const overlayTextPrimaryRef = useRef<HTMLSpanElement>(null)
  const overlayTextSecondaryRef = useRef<HTMLSpanElement>(null)

  const setOverlayTextPrimary = (value: String) => {
    if (overlayTextPrimaryRef.current)
      overlayTextPrimaryRef.current.innerText = String(value)
  }

  const setOverlayTextSecondary = (value: String) => {
    if (overlayTextSecondaryRef.current)
      overlayTextSecondaryRef.current.innerText = String(value)
  }

  const setPoints = (point: number) => {
    if (pointsRef.current)
      pointsRef.current.innerText = String(point)
  }

  return (
    <GameContext.Provider value={{
      refs: {
        pointsRef,
        overlayTextPrimaryRef,
        overlayTextSecondaryRef,
      },
      functions: {
        setPoints,
        setOverlayTextPrimary,
        setOverlayTextSecondary,
      }
    }}>
      {children}
    </GameContext.Provider>
  )
}