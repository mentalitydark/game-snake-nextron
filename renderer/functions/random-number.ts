export function randomNumber(max: number, min: number = 0): number {
  max = Math.floor(max)
  min = Math.ceil(min)
  return Math.floor(Math.random() * (max - min) + min)
}