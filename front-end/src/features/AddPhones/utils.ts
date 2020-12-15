const getRandomNumber = (): number =>
  parseInt(Math.random().toFixed(1).slice(-1))

export const generateRandomNumber = (): string => {
  const numbers = Array(8)
    .fill(1)
    .map((_) => getRandomNumber().toString())
  numbers.splice(4, 0, '-')
  return numbers.join('')
}

export const generateRandomInfo = (): string => {
  const names = [
    'Alicia Gertrudis',
    'Popeye Elmarino',
    'Gervasio Garcia',
    'Francisco Lopez',
  ]
  const addresses = ['Av. San Martín', 'Pozos', 'San Fernando', 'El Jaguar']

  const randomName = names[Math.floor(Math.random() * names.length)]
  const randomAddress = addresses[Math.floor(Math.random() * names.length)]

  const randomNumber = Array(3)
    .fill(1)
    .map((_) => getRandomNumber().toString())
    .join('')

  return `${randomName}, ${randomAddress} ${randomNumber}`
}
