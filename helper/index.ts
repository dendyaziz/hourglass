export function getDiffToNextSecond(): number {
  const now = new Date()
  const milliseconds = now.getMilliseconds()
  return 1000 - milliseconds
}

export function getTimeString(date: Date): string {
  // Format with leading zeros
  const formatWithLeadingZeros = (num: number) => String(num).padStart(2, '0')

  return `${formatWithLeadingZeros(date.getHours())}:${formatWithLeadingZeros(date.getMinutes())}:${formatWithLeadingZeros(date.getSeconds())}`
}

export function getTimeDiffString(startDate: Date, endDate: Date): string {
  // Get the time difference in milliseconds
  const diffMs = endDate.getTime() - startDate.getTime()

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
