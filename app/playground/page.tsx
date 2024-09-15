import quicksort from '../utils/quickSort'

export default function Playground() {
  let initialArray = [10, 2, 3, 5, 8, 7, 1]
  let postSwapsArray = [...initialArray]
  let [sortedArray, moves] = quicksort([...initialArray])
  console.log(postSwapsArray)
  moves.forEach((move) => {
    const [i, j] = move.swapees
    ;[postSwapsArray[i], postSwapsArray[j]] = [
      postSwapsArray[j],
      postSwapsArray[i],
    ]
  })
  return (
    <div className="ml-4">
      <h1>Playground</h1>
      <p>Sorted array</p>
      <p>{formatArray(sortedArray)}</p>
      <p>disarray</p>
      <p>{formatArray(initialArray)}</p>
      <p>ultArray</p>
      <p>{formatArray(postSwapsArray)}</p>
      <p>
        I want postSwaysArray {formatArray(postSwapsArray)} to equal sortedArray
        {formatArray(sortedArray)}
      </p>
    </div>
  )
}

function formatArray(a: number[]) {
  return a.map((v) => v + ' ')
}
