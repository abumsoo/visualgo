interface BarProps {
  width: number
  length: number
  size: number
  color?: string
}
export default function Bar(props: BarProps) {
  let unit = 384 / props.size
  return (
    <div
      className="max-h-96 max-w-3 rounded"
      style={{
        height: `${Math.floor(props.length * unit)}px`,
        width: `${props.width}px`,
        backgroundColor: props.color ?? 'rgb(99 102 241)',
      }}
    ></div>
  )
}
