export function getNow(): Date {
  const now = new Date()
  // now.setHours(now.getHours() + 18)
  // now.setMinutes(now.getMinutes() + 1)
  // now.setSeconds(now.getSeconds() + 25)
  return now
}

export function getDiffToNextSecond(): number {
  const now = getNow()
  const milliseconds = now.getMilliseconds()
  return 1000 - milliseconds
}

export function getTimeString(date: Date): string {
  // Format with leading zeros
  const formatWithLeadingZeros = (num: number) => String(num).padStart(2, '0')

  return `${formatWithLeadingZeros(date.getHours())}:${formatWithLeadingZeros(date.getMinutes())}:${formatWithLeadingZeros(date.getSeconds())}`
}

export function getTimeDiffString(date: Date): string {
  const now = getNow()

  // Get the time difference in milliseconds
  const diffMs = date.getTime() - now.getTime()

  // Convert milliseconds to seconds
  const diffSeconds = Math.floor(diffMs / 1000)

  // Calculate hours, minutes, and seconds
  const hours = Math.floor(diffSeconds / 3600)
  const minutes = Math.floor((diffSeconds % 3600) / 60)
  const seconds = diffSeconds % 60

  // Format with leading zeros
  const formatWithLeadingZeros = (num: number) => String(num).padStart(2, '0')

  return `${formatWithLeadingZeros(hours)}:${formatWithLeadingZeros(minutes)}:${formatWithLeadingZeros(seconds)}`
}
