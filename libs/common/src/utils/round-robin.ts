class RoundRobin<T> {
  private items: T[] = []
  private nextIndex = 0

  constructor(items: T[]) {
    this.items = items
  }

  next(): T {
    const isEnd = this.nextIndex > this.items.length - 1

    if (isEnd) {
      // start over
      this.nextIndex = 0

      return this.nextItem()
    } else {
      return this.nextItem()
    }
  }

  getAll(): T[] {
    return this.items
  }

  private nextItem(): T {
    const nextElement = this.items[this.nextIndex]

    this.nextIndex++

    return nextElement
  }
}

export {RoundRobin}
