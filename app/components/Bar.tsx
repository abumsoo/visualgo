interface BarProps {
  width: number
  length: number
}
export default function Bar(props: BarProps) {
  return (
    <div
      className="bg-black w-[50px] h-[100px]"
      style={{ height: `${props.length * 25}px`, width: `${props.width}px` }}
    ></div>
  )
}
