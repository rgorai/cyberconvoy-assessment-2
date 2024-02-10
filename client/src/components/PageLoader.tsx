import ErrorPage from '../pages/ErrorPage'
import Loading from './Loading'

type Props<T> = {
  loading: boolean
  error: ServerError | null
  pageData: T
  children: (pageData: NonNullable<T>) => JSX.Element
}

// eslint-disable-next-line comma-spacing
const PageLoader = <T,>({ loading, error, pageData, children }: Props<T>) =>
  loading ? (
    <div className="flex flex-row justify-center mt-[30vh]">
      <Loading />
    </div>
  ) : error ? (
    <ErrorPage {...error} />
  ) : pageData ? (
    children(pageData)
  ) : (
    <>Page Loader Error</>
  )

export default PageLoader
