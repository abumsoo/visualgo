interface BarProps {
  width: number
  length: number
  color?: string
}
export default function Bar(props: BarProps) {
  return (
    <div
      className="bg-blue-950 w-[50px] h-[100px] rounded"
      style={{
        height: `${props.length * 10}px`,
        width: `${props.width}px`,
        backgroundColor: props.color ?? 'rgb(8 51 68)',
      }}
    ></div>
  )
}
