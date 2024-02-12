import ErrorPage from '../../pages/ErrorPage'
import Loading from '../Loading'

type Props<T> = {
  loading: boolean
  error: ServerError | null
  pageData: T
  children: (pageData: NonNullable<T>) => JSX.Element
}

/**
 * @author rgorai
 * @description JSX wrapper to handle render of pages that require loading of data
 * @param loading state variable to signal when the API call is loading
 * @param error state variable to signal if there is an error with the API call
 * @param pageData state variable that holds the data for the API call
 * @param children child function to render once the API call is successful and the page data is loaded
 * @returns the appropriate component based on the current API call state
 */
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
  ) : null

export default PageLoader
