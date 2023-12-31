import { MutableRefObject } from "react"

export interface GameContextProps {
  refs: {
    pointsRef: MutableRefObject<HTMLSpanElement>
    overlayTextPrimaryRef: MutableRefObject<HTMLSpanElement>
    overlayTextSecondaryRef: MutableRefObject<HTMLSpanElement>
  }
  functions: {
    setPoints: (p: number) => void
    setOverlayTextPrimary: (v: string) => void
    setOverlayTextSecondary: (v: string) => void
  }
}