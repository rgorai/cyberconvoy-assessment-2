import { Router } from 'express'
import {
  assignTokens,
  authorizationUrl,
  verifyToken,
} from '../services/googleAuthService'
import { areValidStrings } from '../utils/errorChecks'
import { ensureAuthenticated } from '../middleware/oAuth'
import { NODE_ENV } from '../utils/env'

const REDIRECT_URL = NODE_ENV === 'production' ? '/' : 'http://localhost:5173'

const oAuthRouter = Router()

oAuthRouter.get('/login', async (req, res) => {
  return res.send(authorizationUrl)
})

oAuthRouter.get('/callback', async (req, res) => {
  const { code } = req.query

  // ensure code is present
  try {
    areValidStrings({ code })
  } catch (err) {
    return res.status(400).send(String(err))
  }

  // create express session
  try {
    const tokens = await assignTokens(code as string)

    // perhaps rather insecure, but should be fine for this app
    req.session.tokens = tokens

    const userInfo = await verifyToken(tokens.id_token ?? '')
    req.session.user = userInfo

    return res.redirect(REDIRECT_URL)
  } catch (err) {
    return res.status(500).send(String(err))
  }
})

oAuthRouter.get('/isAuthenticated', ensureAuthenticated, async (req, res) => {
  return res.status(200).json(req.session.user)
})

oAuthRouter.get('/logout', async (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error(err)
    } else {
      res.sendStatus(200)
    }
  })
})

export default oAuthRouter
