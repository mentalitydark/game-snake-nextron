import { MutableRefObject } from "react"

export interface OverlayScreenProps {
  textPrimaryRef: MutableRefObject<HTMLSpanElement>
  textSecondaryRef: MutableRefObject<HTMLSpanElement>
}