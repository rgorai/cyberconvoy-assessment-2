import { Request, Response, NextFunction } from 'express'
import { areValidStrings } from '../utils/errorChecks'
import { verifyToken } from '../services/googleAuthService'

export const ensureAuthenticated = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
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
