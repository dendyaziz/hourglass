export function getDiffToNextSecond(): number {
  const now = new Date()
  const milliseconds = now.getMilliseconds()
  return 1000 - milliseconds
}

export function getTime(date: Date): string {
  const hours = String(date.getHours()).padStart(2, '0')
  const minutes = String(date.getMinutes()).padStart(2, '0')
  const seconds = String(date.getSeconds()).padStart(2, '0')

  return `${hours}:${minutes}:${seconds}`
}
