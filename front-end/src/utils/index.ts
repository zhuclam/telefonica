export const isToday = (date: number) => {
  const inputDate = new Date(date)
  const todaysDate = new Date()

  return inputDate.setHours(0, 0, 0, 0) === todaysDate.setHours(0, 0, 0, 0)
}

export const inferTerritory = (path: string) =>
  (path.startsWith('/') ? path.slice(1) : path).split('/')[0]

export const stripTerritory = (path: string): string =>
  (path.startsWith('/') ? path.slice(1) : path).split('/').slice(1).join('/')
