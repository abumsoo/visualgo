export function generateRandomArray(quantity: number) {
  const set = new Set<number>()
  while (set.size < quantity) {
    set.add(Math.floor(Math.random() * quantity) + 1)
  }
  return set
}

export function getRandomInt(min: number, max: number) {
  const minCeiled = Math.ceil(min)
  const maxFloored = Math.floor(max)
  return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled) // The maximum is exclusive and the minimum is inclusive
}
