import React, { useRef } from "react"
import { GameContext } from "./game-context"

export const GameProvider = ({ children }: { children: React.ReactNode}) => {
  const pointsRef = useRef<HTMLSpanElement>(null)

  const points = (): number => {
    if (pointsRef.current)
      return parseInt(pointsRef.current.innerText)

    return 0
  }

  const changePoints = (point: number) => {
    if (pointsRef.current)
      pointsRef.current.innerText = String(point)
  }

  return (
    <GameContext.Provider value={{
      points,
      changePoints,
      pointsRef
    }}>
      {children}
    </GameContext.Provider>
  )
}