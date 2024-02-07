/**
 * @author rgorai
 * @description describes the information required to add functionalty to the app in App.tsx
 * @param label the user-facing label/name of this feature
 * @param path the designated react router route for this feature
 * @param element the JSX element to render for this feature
 * @param ensureAuthenticated whether this feature needs is accessible by authenticated user, unauthenticated user, or anyone
 * @param displayOnNav whether or not this feature should be displayed on the navigation bar
 */
type AppContent = {
  label: string
  path: string
  element: JSX.Element
  ensureAuthenticated: boolean | null
  displayOnNav?: true
}[]