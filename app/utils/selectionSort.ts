export default function selectionSort(nums: number[]): [number[], number[][]] {
  let swaps: number[][] = []
  for (let index = 0; index < nums.length; index++) {
    let minIndex = index
    for (let j = index; j < nums.length; j++) {
      if (nums[j] < nums[minIndex]) {
        minIndex = j
      }
    }
    swaps.push([index, minIndex])
    ;[nums[index], nums[minIndex]] = [nums[minIndex], nums[index]]
  }
  return [nums, swaps]
}
