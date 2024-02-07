import { Request, Response, NextFunction } from 'express'

export const ensureAuthenticated = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!(req.session.user && req.session.tokens))
    return res.status(403).send('Unauthorized')
  next()
}
