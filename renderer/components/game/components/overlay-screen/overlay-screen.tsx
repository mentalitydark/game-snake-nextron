import { forwardRef } from "react"
import { OverlayScreenProps } from "./overlay-screen-types"

export const OverlayScreen = forwardRef<HTMLDivElement, OverlayScreenProps>(({ textPrimaryRef, textSecondaryRef }, ref) => {
  return (
    <div
      ref={ref}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        color: 'white',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
      }}
    >
      <span ref={textPrimaryRef} style={{ fontSize: 40, margin: 20}}>Snake Game</span>
      <span ref={textSecondaryRef} style={{ fontSize: 18}}>Press enter to start</span>
    </div>
  )
})