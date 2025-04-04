export const autoIncrement: () => () => number = () => {
  let id: number = 0

  return (increment = 1) => (id += increment)
}
