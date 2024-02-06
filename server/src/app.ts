import path from 'path'
import express from 'express'
import configRoutes from './routes/index'

const port = 3001

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

configRoutes(app)

// if (process.env.NODE_ENV === 'production') {
app.use(express.static(path.resolve('client', 'dist')))
app.get('*', (_, res) => {
  res.sendFile(path.resolve('client', 'dist', 'index.html'))
})
// }

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`)
})
