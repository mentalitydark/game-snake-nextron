import React, { useState } from "react"
import { GameContext } from "./game-context"

export const GameProvider = ({ children }: { children: React.ReactNode}) => {
  const [points, setPoints] = useState<number>(0)

  const addPoints = (point: number) => {
    setPoints(p => p += point)
  }

  return (
    <GameContext.Provider value={{
      points,
      addPoints
    }}>
      {children}
    </GameContext.Provider>
  )
}