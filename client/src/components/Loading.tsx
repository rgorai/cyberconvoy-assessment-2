import '../styles/loading.css'

type Props = {
  size?: number
}

const Loading = ({ size }: Props) => {
  return (
    <span
      className="load-spinner"
      style={{
        ...(size
          ? {
              width: `${size / 2}rem`,
              height: `${size / 2}rem`,
              borderWidth: `${size}px`,
            }
          : {}),
      }}
    />
  )
}

export default Loading
