export function shuffleArray<T>(array: T[]): T[] {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[array[i], array[j]] = [array[j], array[i]]
  }

  return array
}

export function sortBySequenceField<T extends {sequence: number}>(array: T[]): T[] {
  return array.sort((a, b) => (a.sequence ?? 0) - (b.sequence ?? 0))
}

export function getUniqueItems<T>(array: T[]): T[] {
  return [...new Set(array)]
}
