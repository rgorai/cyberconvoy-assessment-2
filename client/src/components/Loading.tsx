import '../styles/loading.css'
import cx from 'classnames'

type Props = {
  className?: string
  size?: number
}

const Loading = ({ className, size }: Props) => {
  return (
    <span
      className={cx('load-spinner', className)}
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
