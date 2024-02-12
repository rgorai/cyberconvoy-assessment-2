import { useNavigate } from 'react-router-dom'

const ErrorPage = (props: ServerError) => {
  const navigate = useNavigate()
  return (
    <div className="p-10">
      <span
        className="cursor-pointer underline text-blue-300"
        onClick={() => navigate(-1)}
      >
        Go back
      </span>
      <div className="flex flex-col items-center mt-[15vh]">
        <div className="text-[8em] font-semibold text-gray-300">
          {props.status}
        </div>
        <div className="text-3xl text-gray-400">{props.statusText}</div>
      </div>
    </div>
  )
}

export default ErrorPage
