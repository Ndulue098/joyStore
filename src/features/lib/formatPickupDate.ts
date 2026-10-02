import { format, isToday, isTomorrow, addDays, isSameDay } from "date-fns"

export function formatPickupDate(date: Date | undefined|string): string {
  if (!date) return "Select preferred pickup date"

  const formattedDate = format(date, "PPP") // e.g. "Oct 24, 2026"
  const dayAfterTomorrow = addDays(new Date(), 2)

  if (isToday(date)) {
    return `Today (${formattedDate})`
  }
  if (isTomorrow(date)) {
    return `Tomorrow (${formattedDate})`
  }
  if (isSameDay(date, dayAfterTomorrow)) {
    return `Next Tomorrow (${formattedDate})`
  }

  return formattedDate
}