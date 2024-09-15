import { getRandomInt } from './helpers'

type Move = {
  type: 'swap' | 'pivot'
  swapees: number[]
}

function partition(arr: number[], low: number, high: number, moves: Move[]) {
  pickRandomPivot(arr, low, high, moves)
  const pivot = arr[high]
  let j = low
  for (let i = low; i < high; i++) {
    if (arr[i] <= pivot) {
      ;[arr[i], arr[j]] = [arr[j], arr[i]]
      if (i !== j) {
        moves.push({ type: 'swap', swapees: [i, j] })
      }
      j++
    }
  }
  // SHOW this swap
  ;[arr[j], arr[high]] = [arr[high], arr[j]]
  if (j !== high) {
    moves.push({ type: 'swap', swapees: [j, high] })
  }
  return j
}

function pickRandomPivot(
  arr: number[],
  low: number,
  high: number,
  moves: Move[]
) {
  // SHOW original pivot location
  const pivotIndex = getRandomInt(low, high + 1)
  ;[arr[high], arr[pivotIndex]] = [arr[pivotIndex], arr[high]]
  if (pivotIndex !== high) {
    moves.push({ type: 'pivot', swapees: [high, pivotIndex] })
  }
}

function quicksortHelper(
  nums: number[],
  low: number,
  high: number,
  moves: Move[]
) {
  if (low < high) {
    // SHOW which pivot is chosen
    const pivotIndex = partition(nums, low, high, moves)
    // recurse into left and right side of pivot
    quicksortHelper(nums, low, pivotIndex - 1, moves)
    quicksortHelper(nums, pivotIndex + 1, high, moves)
  }
}

export default function quicksort(nums: number[]): [number[], Move[]] {
  const moves: Move[] = []
  quicksortHelper(nums, 0, nums.length - 1, moves)
  return [nums, moves]
}
