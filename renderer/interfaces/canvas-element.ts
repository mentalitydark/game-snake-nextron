export interface CanvasElement {
  draw: (context: CanvasRenderingContext2D) => void
  update: () => void
}