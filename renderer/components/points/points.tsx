import { useContext } from "react"
import { GameContext } from "../../contexts/game"

export const Points = () => {
  const {points, pointsRef} = useContext(GameContext)

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-around',
      alignItems: 'center',
      backgroundColor: '#66AA66',
      color: '#FFFFFF',
      height: 50
    }}
    >
      <span>Pontos: <span ref={pointsRef}>{points()}</span></span>
    </div>
  )
}