type UserInfo = {
  userId?: string
  fullName?: string
  email?: string
  picture?: string
}

/**
 * @author rgorai
 * @description stored details for an authenticated user
 * @param authenticated true value to indicate that user is authenticated
 * @param user the basic information of the user
 */
type Authenticated = {
  authenticated: true
  user: UserInfo
}

/**
 * @author rgorai
 * @description stored details for an uauthenticated user
 * @param authenticated false value to indicate that user is not authenticated
 */
type Unauthenticated = {
  authenticated: false
}

/**
 * @author rgorai
 * @description the response sent by the API regarding a user's authentication status
 */
type AuthResponse = Authenticated | Unauthenticated
