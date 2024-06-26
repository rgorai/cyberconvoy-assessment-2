/**
 * @author rgorai
 * @description describes the different route-features of this application
 * @param label the user-facing label/name of this feature
 * @param path the designated react router route for this feature
 * @param element the JSX element to render for this feature
 * @param ensureAuthenticated whether this feature needs is accessible by authenticated user, unauthenticated user, or anyone
 * @param displayOnNav whether or not this feature should be displayed on the navigation bar
 */
type AppFeatures = {
  label: string
  path: string
  element: JSX.Element
  ensureAuthenticated: boolean | null
}[]

/**
 * @author rgorai
 * @description details of a web error
 * @param status http status code
 * @param statusText text describing the status code
 * @param data any associated error data
 */
type ServerError = {
  status: number
  statusText: string
  data?: string
}
