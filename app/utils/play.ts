function partition(
  arr: number[],
  low: number,
  high: number,
  swaps: [number, number][]
): number {
  // Randomly pick a pivot index between low and high
  const randomPivotIndex = Math.floor(Math.random() * (high - low + 1)) + low

  // Swap the pivot with the last element (or any fixed position)
  ;[arr[randomPivotIndex], arr[high]] = [arr[high], arr[randomPivotIndex]]
  swaps.push([randomPivotIndex, high]) // Record the swap of pivot selection

  let pivot = arr[high]
  let i = low - 1

  for (let j = low; j < high; j++) {
    if (arr[j] < pivot) {
      i++
      ;[arr[i], arr[j]] = [arr[j], arr[i]]
      swaps.push([i, j]) // Record the swap
    }
  }

  ;[arr[i + 1], arr[high]] = [arr[high], arr[i + 1]]
  swaps.push([i + 1, high]) // Record the swap
  return i + 1
}

function quickSortRecursive(
  arr: number[],
  low: number,
  high: number,
  swaps: [number, number][]
): void {
  if (low < high) {
    let pi = partition(arr, low, high, swaps)
    quickSortRecursive(arr, low, pi - 1, swaps)
    quickSortRecursive(arr, pi + 1, high, swaps)
  }
}

function quicksort(arr: number[]): [number[], [number, number][]] {
  let swaps: [number, number][] = []
  quickSortRecursive(arr, 0, arr.length - 1, swaps)
  return [arr, swaps]
}

// Example usage:
const arr = [3, 6, 8, 10, 2, 1]
const [sortedArr, swaps] = quicksort(arr)

console.log('Sorted Array:', sortedArr)
console.log('Swaps:', swaps)
