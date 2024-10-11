import { getRandomInt } from './helpers'

function partition(
  arr: number[],
  low: number,
  high: number,
  moves: number[][]
) {
  pickRandomPivot(arr, low, high, moves)
  const pivot = arr[high]
  let j = low
  for (let i = low; i < high; i++) {
    if (arr[i] <= pivot) {
      ;[arr[i], arr[j]] = [arr[j], arr[i]]
      if (i !== j) {
        moves.push([i, j])
      }
      j++
    }
  }
  // SHOW this swap
  ;[arr[j], arr[high]] = [arr[high], arr[j]]
  if (j !== high) {
    moves.push([j, high])
  }
  return j
}

function pickRandomPivot(
  arr: number[],
  low: number,
  high: number,
  moves: number[][]
) {
  // SHOW original pivot location
  const pivotIndex = getRandomInt(low, high + 1)
  ;[arr[high], arr[pivotIndex]] = [arr[pivotIndex], arr[high]]
  if (pivotIndex !== high) {
    moves.push([high, pivotIndex])
  }
}

function quicksortHelper(
  nums: number[],
  low: number,
  high: number,
  moves: number[][]
) {
  if (low < high) {
    // SHOW which pivot is chosen
    const pivotIndex = partition(nums, low, high, moves)
    // recurse into left and right side of pivot
    quicksortHelper(nums, low, pivotIndex - 1, moves)
    quicksortHelper(nums, pivotIndex + 1, high, moves)
  }
}

export default function quickSort(nums: number[]): [number[], number[][]] {
  const moves: number[][] = []
  quicksortHelper(nums, 0, nums.length - 1, moves)
  return [nums, moves]
}
