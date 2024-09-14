'use client'

import React from 'react'

let swaps: number[][] = []

export default function Home() {
  const [values, setValues] = React.useState<Array<number>>([])

  // generate random numbers
  React.useEffect(() => {
    setValues(Array.from(generateRandomArray(8, 12)))
  }, [])

  function handleSort() {
    // fill swaps
    let newValues = [...values]
    quicksort(values, 0, values.length - 1)
    for (let i = 0; i < swaps.length; i++) {
      setTimeout(
        () => {
          ;[newValues[swaps[i][0]], newValues[swaps[i][1]]] = [
            newValues[swaps[i][1]],
            newValues[swaps[i][0]],
          ]
          setValues([...newValues])
        },
        500 * (i + 1)
      )
    }
  }

  return (
    <div className="flex flex-col w-fill h-fill">
      <div className="flex gap-1 justify-center w-full">
        {values.map((v, id) => (
          <div
            className="bg-black w-[50px] h-[100px]"
            key={id}
            id={`box-${id}`}
            style={{ height: `${v * 25}px` }}
          ></div>
        ))}
      </div>
      <button
        className="border-2 w-fit mx-auto my-2 p-2 rounded hover:bg-green-50"
        onClick={(e) => {
          e.preventDefault()
          handleSort()
        }}
      >
        Sort
      </button>
    </div>
  )
}

function generateRandomArray(quantity: number, max: number) {
  const set = new Set<number>()
  while (set.size < quantity) {
    set.add(Math.floor(Math.random() * max) + 1)
  }
  return set
}

function getRandomInt(min: number, max: number) {
  const minCeiled = Math.ceil(min)
  const maxFloored = Math.floor(max)
  return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled) // The maximum is exclusive and the minimum is inclusive
}

function partition(arr: number[], low: number, high: number) {
  const pivot = arr[high]
  let j = low
  for (let i = low; i < high; i++) {
    if (arr[i] <= pivot) {
      ;[arr[i], arr[j]] = [arr[j], arr[i]]
      if (i !== j) {
        swaps.push([i, j])
      }
      j++
    }
  }
  // SHOW this swap
  ;[arr[j], arr[high]] = [arr[high], arr[j]]
  if (j !== high) {
    swaps.push([j, high])
  }
  return j
}

function partition_r(arr: number[], low: number, high: number) {
  // SHOW original pivot location
  const pivotIndex = getRandomInt(low, high + 1)
  ;[[arr[high], arr[pivotIndex]]] = [[arr[pivotIndex], arr[high]]]
  if (pivotIndex !== high) {
    swaps.push([pivotIndex, high])
  }
  return partition(arr, low, high)
}

function quicksort(nums: number[], low: number, high: number) {
  if (low < high) {
    // SHOW which pivot is chosen
    const pivotIndex = partition_r(nums, low, high)
    // recurse into left and right side of pivot
    quicksort(nums, low, pivotIndex - 1)
    quicksort(nums, pivotIndex + 1, high)
  }
}
