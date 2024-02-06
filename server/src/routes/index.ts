import { Express, Router } from 'express'
import employeesRouter from './employees'

const routers: {
  route: string
  router: Router
}[] = [{ route: 'employees', router: employeesRouter }]

const configRoutes = (app: Express) => {
  for (const e of routers) app.use(`/api/${e.route}`, e.router)
}

export default configRoutes
