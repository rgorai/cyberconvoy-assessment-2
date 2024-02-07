import path from 'path'
import express from 'express'
import session from 'express-session'
import configRoutes from './routes/index'
import { EXPRESS_SESSION_SECRET } from './utils/env'

const port = 3001

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(
  session({
    secret: EXPRESS_SESSION_SECRET!,
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: 'auto',
      httpOnly: true,
      maxAge: 60 * 60 * 1000,
    },
  })
)

configRoutes(app)

app.use(express.static(path.resolve('client', 'dist')))
app.get('*', (_, res) => {
  res.sendFile(path.resolve('client', 'dist', 'index.html'))
})

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`)
})
