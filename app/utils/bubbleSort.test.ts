import { bubbleSort } from './bubbleSort'

test('bubbleSort should sort in ascending', () => {
  let a = [10, 12, 5, 8, 14, 3, 1, 4]
  let [arr, _] = bubbleSort(a)
  expect(arr).toEqual([1, 3, 4, 5, 8, 10, 12, 14])
})

test('bubbleSort swaps should sort the original array', () => {
  let a = [10, 12, 5, 8, 14, 3, 1, 4]
  let b = [...a]
  let [_, swaps] = bubbleSort(a)
  swaps.forEach((s) => {
    const [i, j] = s
    ;[b[i], b[j]] = [b[j], b[i]]
  })
  expect(b).toEqual([1, 3, 4, 5, 8, 10, 12, 14])
})
