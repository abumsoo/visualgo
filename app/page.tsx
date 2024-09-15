'use client'

import React from 'react'
import Bar from './components/Bar'
import { generateRandomArray } from './utils/helpers'
import quicksort from './utils/quickSort'

export default function Home() {
  const [values, setValues] = React.useState<Array<[number, string]>>([])
  const [size, setSize] = React.useState(8)
  const [initialized, setInitialized] = React.useState(false) // For strict mode double mount
  const [sorting, setSorting] = React.useState(false)

  const barColor = 'rgb(23 37 84)'

  // generate random numbers when app starts
  React.useEffect(() => {
    if (!initialized) {
      const newArray: [number, string][] = Array.from(
        generateRandomArray(8)
      ).map((v) => [v, barColor])
      console.log('Initial array:', newArray)
      setValues(newArray)
      setInitialized(true)
    }
  }, [initialized])

  // generate new random numbers after sort button is clicked
  function handleSort() {
    if (sorting) return
    setSorting(true)
    let numsArray = values.map(([num, _]) => num)
    let [sortedArray, moves] = quicksort(numsArray)
    console.log('sorted array', sortedArray)
    moves.forEach((move, index) => {
      let newValues = [...values]
      console.log('new values', newValues)
      const [i, j] = move.swapees
      ;[newValues[i], newValues[j]] = [newValues[j], newValues[i]]
      console.log(`swap ${i} and ${j}`)
      console.log('post swap values', newValues)
      setValues(newValues)
      if (index === moves.length - 1) {
        setSorting(false)
      }
    })
    // setValues((currentValues) => {
    //   let numsArray = currentValues.map(([num, _]) => num)
    //   let [sortedArray, moves] = quicksort(numsArray)
    //   console.log('sorted array', sortedArray)
    //   console.log('Sorting moves:', moves)
    //   console.log('Starting to sort the array...')
    //   moves.forEach((move, index) => {
    //     setTimeout(
    //       () => {
    //         setValues((prevValues) => {
    //           const newValues = [...prevValues]
    //           // Perform the swap using the move instructions
    //           const [i, j] = move.swapees
    //           console.log(`Swapping indices ${i} and ${j}`)
    //           ;[newValues[i], newValues[j]] = [newValues[j], newValues[i]]
    //           console.log(
    //             'Array after swap:',
    //             newValues.map(([num]) => num)
    //           )
    //           return newValues
    //         })
    //         if (index === moves.length - 1) {
    //           setSorting(false)
    //         }
    //       },
    //       100 * (index + 1)
    //     )
    //   })
    //   return currentValues
    // })
    // fill swaps
  }

  return (
    <div className="flex flex-col items-center w-fill h-fill gap-2">
      <div className="flex gap-[2px] justify-center md:w-[50%] h-96 bg-blue-900">
        {/* make a box container around the bars */}
        {values.map((v, id) => (
          <Bar key={id} length={v[0]} width={20} color={v[1]} />
        ))}
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
          console.log('New array generated:', newArray)
          setValues(newArray)
        }}
      >
        Generate array
      </button>
      <button
        className="border-2 w-fit mx-auto p-2 rounded hover:bg-blue-900"
        onClick={(e) => {
          e.preventDefault()
          console.log(
            'Array before sorting:',
            values.map(([num]) => num)
          )
          handleSort()
        }}
      >
        Sort
      </button>
    </div>
  )
}
