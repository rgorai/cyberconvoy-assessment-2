import { Request, Response, NextFunction } from 'express'
import { areValidStrings } from '../utils/errorChecks'
import { verifyToken } from '../services/googleAuthService'
import { NODE_ENV } from '../utils/env'

export const ensureAuthenticated = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // is ok for this app only since there are no user-specific resources
  if (NODE_ENV === 'development') return next()

  const { user, tokens } = req.session
  try {
    if (!(user && tokens)) throw 'No user or tokens in session'

    areValidStrings({ userId: user.userId, idToken: tokens.id_token })

    const userInfo = await verifyToken(tokens.id_token)
    if (userInfo.userId !== user.userId) throw 'Unauthorized user'

    next()
  } catch (err) {
    req.session.destroy((err) => {
      if (err) {
        console.error(err)
      } else {
        res.sendStatus(401)
      }
    })
  }
}
