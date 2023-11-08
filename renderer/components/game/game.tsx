import { useEffect, useRef } from "react"

export const Game = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (canvasRef.current) {
      const ctx = canvasRef.current.getContext('2d')

      ctx.scale(1, 1)
      ctx.imageSmoothingEnabled = false

      ctx.fillStyle = 'black'
      ctx.fillRect(0, 0, canvasRef.current.width, canvasRef.current.height);

      ctx.fillStyle = 'white'
      ctx.fillRect(0, 0, 10, 10)
      ctx.fillRect(790, 590, 10, 10)
      ctx.fillRect(0, 590, 10, 10)
      ctx.fillRect(790, 0, 10, 10)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      width={800}
      height={600}
      style={{ border: '0px solid red', width: '100%', height: '100%' }}
    />
  )
}