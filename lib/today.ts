import dayjs from 'dayjs'
import timezone from 'dayjs/plugin/timezone.js'
import utc from 'dayjs/plugin/utc.js'

dayjs.extend(utc)
dayjs.extend(timezone)

export function getToday(dateOverride?: number | string) {
  const today = dayjs().tz('America/New_York')
  return dateOverride ? today.date(Number(dateOverride)) : today
}
