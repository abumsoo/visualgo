import quickSort from './quickSort'
import selectionSort from './selectionSort'
import bubbleSort from './bubbleSort'

const sortMap: { [sort: string]: (nums: number[]) => [number[], number[][]] } =
  {
    bubbleSort: bubbleSort,
    quickSort: quickSort,
    selectionSort: selectionSort,
  }

describe.each(Object.keys(sortMap))('.sort(%s)', (sort) => {
  test(`${sort} should return array in ascending order`, () => {
    let nums = [10, 12, 5, 8, 14, 3, 1, 4]
    let [arr, _] = sortMap[sort](nums)
    expect(arr).toEqual([1, 3, 4, 5, 8, 10, 12, 14])
  })
  test(`${sort} swaps should sort the original array`, () => {
    let a = [10, 12, 5, 8, 14, 3, 1, 4]
    let b = [...a]
    let [_, swaps] = sortMap[sort](a)
    swaps.forEach((s) => {
      const [i, j] = s
      ;[b[i], b[j]] = [b[j], b[i]]
    })
    expect(b).toEqual([1, 3, 4, 5, 8, 10, 12, 14])
  })
})
