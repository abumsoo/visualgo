'use client'

import React from 'react'
import Bar from './components/Bar'
import { generateRandomArray } from './utils/helpers'
import quickSort from './utils/quickSort'
import bubbleSort from './utils/bubbleSort'
import selectionSort from './utils/selectionSort'

export default function Home() {
  const [values, setValues] = React.useState<Array<[number, string]>>([])
  const [size, setSize] = React.useState(8)
  const [initialized, setInitialized] = React.useState(false) // For strict mode double mount
  const [sorting, setSorting] = React.useState(false)
  const [algorithm, setAlgorithm] = React.useState('bubblesort')

  const barColor = 'rgb(165 180 252)'

  // generate random numbers when app starts
  React.useEffect(() => {
    if (!initialized) {
      const newArray: [number, string][] = Array.from(
        generateRandomArray(8)
      ).map((v) => [v, barColor])
      setValues(newArray)
      setInitialized(true)
    }
  }, [initialized])

  // generate new random numbers after sort button is clicked
  function handleSort() {
    if (sorting) return
    setSorting(true)

    let numsOnly = values.map(([num, _]) => num)

    let swaps: number[][] = []
    switch (algorithm) {
      case 'bubblesort':
        swaps = bubbleSort(numsOnly)[1]
        break
      case 'quicksort':
        swaps = quicksort(numsOnly)[1]
        break
      default:
        console.log("couldn't find algorithm")
    }

    let newValues = [...values]

    swaps.forEach((move, index) => {
      setTimeout(() => {
        const [i, j] = move
        ;[newValues[i], newValues[j]] = [newValues[j], newValues[i]]
        setValues(() => [...newValues])
        if (index === swaps.length - 1) {
          setSorting(false)
        }
      }, 100 * index)
    })
  }
  return (
    <div className="flex flex-col items-center w-fill h-fill gap-2">
      <div className="flex flex-col md:w-[50%] h-screen w-full">
        <div className="flex gap-[2px] justify-center h-96 bg-blue-800">
          {/* make a box container around the bars */}
          {values.map((v, id) => (
            <Bar
              key={id}
              length={v[0]}
              width={20}
              color={v[1]}
              size={values.length}
            />
          ))}
        </div>
        <div className="flex flex-col bg-blue-900 grow p-4 items-center gap-2">
          <div>
            <label>Sorting algorithm: </label>
            <select
              className="border-2 bg-indigo-500 px-1"
              value={algorithm}
              onChange={(e) => setAlgorithm(e.target.value)}
            >
              <option value="bubblesort">Bubble Sort</option>
              <option value="quicksort">Quicksort</option>
            </select>
          </div>
          <div className="flex">
            <label className="pr-4">Size:</label>
            <input
              className="border-2 w-16 text-center bg-blue-950 focus:bg-blue-900"
              id="size"
              onChange={(e) => {
                e.preventDefault()
                setSize(Number(e.target.value))
              }}
            />
          </div>
          <button
            className="border-2 w-fit mx-auto p-2 rounded hover:bg-blue-900"
            onClick={(e) => {
              e.preventDefault()
              const newArray: [number, string][] = Array.from(
                generateRandomArray(size)
              ).map((v) => [v, barColor])
              setValues(newArray)
            }}
          >
            Generate array
          </button>
          <button
            className="border-2 w-fit mx-auto p-2 rounded hover:bg-blue-900"
            onClick={(e) => {
              e.preventDefault()
              handleSort()
            }}
          >
            Sort
          </button>
        </div>
      </div>
    </div>
  )
}
