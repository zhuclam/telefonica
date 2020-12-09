export const isToday = (date: number) => {
  const inputDate = new Date(date)
  const todaysDate = new Date()

  return inputDate.setHours(0, 0, 0, 0) === todaysDate.setHours(0, 0, 0, 0)
}
