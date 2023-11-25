import { MutableRefObject } from "react"

export interface GameContextProps {
  points: () => number
  changePoints: (p: number) => void
  pointsRef: MutableRefObject<HTMLSpanElement>
}