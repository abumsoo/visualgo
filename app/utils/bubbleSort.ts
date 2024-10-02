export function bubbleSort(nums: number[]) {
  let moves: number[][] = []
  let swapped = true
  while (swapped) {
    swapped = false
    for (let i = 0; i < nums.length - 1; i++) {
      if (nums[i] > nums[i + 1]) {
        ;[nums[i], nums[i + 1]] = [nums[i + 1], nums[i]]
        moves.push([i, i + 1])
        swapped = true
      }
    }
  }
  return [nums, moves] as const
}
